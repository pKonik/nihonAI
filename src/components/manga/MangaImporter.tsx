"use client";

import JSZip from "jszip";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  isSupportedMangaImage,
  MANGA_IMPORT_LIMITS,
  sortMangaPageNames,
} from "@/lib/manga/files";
import {
  MangaReader,
  type MangaPage,
} from "@/components/manga/MangaReader";

type MangaImporterProps = {
  text: Dictionary["read"];
};

const MIME_BY_EXTENSION: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

class MangaImportError extends Error {}

function getImageMimeType(name: string): string {
  const extension = name.split(".").pop()?.toLocaleLowerCase() ?? "";
  return MIME_BY_EXTENSION[extension] ?? "application/octet-stream";
}

function formatTemplate(template: string, value: number): string {
  return template.replace("{count}", String(value));
}

export function MangaImporter({ text }: MangaImporterProps) {
  const [pages, setPages] = useState<MangaPage[]>([]);
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const currentImport = useRef(0);
  const pagesRef = useRef<MangaPage[]>([]);

  function replacePages(nextPages: MangaPage[]) {
    for (const page of pagesRef.current) {
      URL.revokeObjectURL(page.url);
    }

    pagesRef.current = nextPages;
    setPages(nextPages);
  }

  useEffect(
    () => () => {
      for (const page of pagesRef.current) {
        URL.revokeObjectURL(page.url);
      }
    },
    [],
  );

  function validateImageFiles(files: readonly File[]): File[] {
    const images = files.filter((file) => isSupportedMangaImage(file.name));

    if (images.length === 0) {
      throw new MangaImportError(text.errors.noImages);
    }

    if (images.length > MANGA_IMPORT_LIMITS.pages) {
      throw new MangaImportError(
        formatTemplate(text.errors.tooManyPages, MANGA_IMPORT_LIMITS.pages),
      );
    }

    let totalBytes = 0;
    for (const image of images) {
      if (image.size > MANGA_IMPORT_LIMITS.imageBytes) {
        throw new MangaImportError(text.errors.imageTooLarge);
      }
      totalBytes += image.size;
    }

    if (totalBytes > MANGA_IMPORT_LIMITS.totalImageBytes) {
      throw new MangaImportError(text.errors.importTooLarge);
    }

    return images;
  }

  async function importImages(files: readonly File[], importId: number) {
    const images = validateImageFiles(files);
    const byPath = new Map(
      images.map((file) => [file.webkitRelativePath || file.name, file]),
    );
    const names = sortMangaPageNames([...byPath.keys()]);
    const nextPages = names.map((name, index) => {
      const file = byPath.get(name);
      if (!file) {
        throw new MangaImportError(text.errors.readFailed);
      }

      return {
        id: `${index}-${name}`,
        name,
        url: URL.createObjectURL(file),
      };
    });

    if (currentImport.current !== importId) {
      for (const page of nextPages) {
        URL.revokeObjectURL(page.url);
      }
      return;
    }

    replacePages(nextPages);
  }

  async function importZip(file: File, importId: number) {
    if (file.size > MANGA_IMPORT_LIMITS.archiveBytes) {
      throw new MangaImportError(text.errors.archiveTooLarge);
    }

    const zip = await JSZip.loadAsync(file);
    const entries = Object.values(zip.files).filter(
      (entry) =>
        !entry.dir &&
        !entry.name.startsWith("__MACOSX/") &&
        isSupportedMangaImage(entry.name),
    );

    if (entries.length === 0) {
      throw new MangaImportError(text.errors.noImages);
    }

    if (entries.length > MANGA_IMPORT_LIMITS.pages) {
      throw new MangaImportError(
        formatTemplate(text.errors.tooManyPages, MANGA_IMPORT_LIMITS.pages),
      );
    }

    const names = sortMangaPageNames(entries.map((entry) => entry.name));
    const byName = new Map(entries.map((entry) => [entry.name, entry]));
    const nextPages: MangaPage[] = [];
    let totalBytes = 0;

    try {
      for (const [index, name] of names.entries()) {
        const entry = byName.get(name);
        if (!entry) {
          throw new MangaImportError(text.errors.readFailed);
        }

        const extractedBlob = await entry.async("blob");
        totalBytes += extractedBlob.size;
        if (
          extractedBlob.size > MANGA_IMPORT_LIMITS.imageBytes ||
          totalBytes > MANGA_IMPORT_LIMITS.totalImageBytes
        ) {
          throw new MangaImportError(text.errors.importTooLarge);
        }

        const blob = new Blob([extractedBlob], {
          type: getImageMimeType(name),
        });
        nextPages.push({
          id: `${index}-${name}`,
          name,
          url: URL.createObjectURL(blob),
        });
      }
    } catch (caughtError) {
      for (const page of nextPages) {
        URL.revokeObjectURL(page.url);
      }
      throw caughtError;
    }

    if (currentImport.current !== importId) {
      for (const page of nextPages) {
        URL.revokeObjectURL(page.url);
      }
      return;
    }

    replacePages(nextPages);
  }

  async function startImport(files: readonly File[]) {
    if (files.length === 0) {
      return;
    }

    const importId = currentImport.current + 1;
    currentImport.current = importId;
    setError("");
    setIsImporting(true);

    try {
      const zipFiles = files.filter((file) =>
        file.name.toLocaleLowerCase().endsWith(".zip"),
      );
      if (zipFiles.length > 0) {
        if (files.length !== 1 || zipFiles.length !== 1) {
          throw new MangaImportError(text.errors.oneZip);
        }
        await importZip(zipFiles[0], importId);
      } else {
        await importImages(files, importId);
      }
    } catch (caughtError) {
      if (currentImport.current === importId) {
        setError(
          caughtError instanceof MangaImportError
            ? caughtError.message
            : text.errors.readFailed,
        );
      }
    } finally {
      if (currentImport.current === importId) {
        setIsImporting(false);
      }
    }
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    void startImport(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void startImport(Array.from(event.dataTransfer.files));
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-sumi-950 sm:text-5xl">
          {text.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-sumi-600">
          {text.description}
        </p>
      </header>

      <section
        className="mt-8 rounded-[2rem] border border-dashed border-sumi-500/50 bg-washi-50 p-6 shadow-[0_24px_70px_-45px_rgba(11,32,41,0.45)] sm:p-10"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="mx-auto max-w-2xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid size-14 place-items-center rounded-2xl bg-shu-50 text-2xl text-shu-700"
          >
            漫
          </span>
          <h2 className="mt-5 text-2xl font-bold text-sumi-950">
            {text.importTitle}
          </h2>
          <p className="mt-2 leading-7 text-sumi-600">{text.importHelp}</p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <label className="cursor-pointer rounded-xl bg-sumi-950 px-5 py-3 font-semibold text-washi-50 transition hover:bg-shu-700 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-shu-600">
              {text.chooseFolder}
              <input
                {...({
                  webkitdirectory: "",
                } as InputHTMLAttributes<HTMLInputElement>)}
                className="sr-only"
                disabled={isImporting}
                multiple
                onChange={handleFiles}
                type="file"
              />
            </label>
            <label className="cursor-pointer rounded-xl border border-washi-300 bg-washi-50 px-5 py-3 font-semibold text-sumi-800 transition hover:border-shu-300 hover:text-shu-700 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-shu-600">
              {text.chooseZip}
              <input
                accept=".zip,application/zip"
                className="sr-only"
                disabled={isImporting}
                onChange={handleFiles}
                type="file"
              />
            </label>
          </div>

          <p className="mt-4 text-xs leading-5 text-sumi-500">
            {text.privacyNote}
          </p>
          <div aria-live="polite" className="mt-3 min-h-6 text-sm">
            {isImporting ? (
              <p className="font-semibold text-sumi-700">{text.importing}</p>
            ) : error ? (
              <p className="font-semibold text-red-700" role="alert">
                {error}
              </p>
            ) : pages.length > 0 ? (
              <p className="font-semibold text-sumi-700">
                {formatTemplate(text.pageCount, pages.length)}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {pages.length > 0 ? (
        <MangaReader key={pages[0].url} pages={pages} text={text} />
      ) : null}
    </div>
  );
}
