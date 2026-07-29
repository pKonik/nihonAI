import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ReadingExample = {
  alt: string;
  japaneseSentence: string;
  meaning: string;
  reading: string;
  src: string;
  word: string;
};

type ReadingPreviewProps = {
  example: ReadingExample;
  text: Dictionary["landing"]["hero"];
};

export function ReadingPreview({
  example,
  text,
}: ReadingPreviewProps) {
  const [sentenceStart, sentenceEnd = ""] =
    example.japaneseSentence.split(example.word, 2);

  return (
    <figure
      aria-label={text.previewLabel}
      className="relative mx-auto w-full max-w-[34rem]"
    >
      <div
        aria-hidden="true"
        className="absolute -left-7 top-14 size-28 rounded-full border-[18px] border-shu-100/80"
      />
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 size-24 rounded-full bg-shu-300/20 blur-2xl"
      />

      <div className="hero-reader-frame relative overflow-hidden rounded-[2rem] border border-shu-200 bg-shu-100/85 p-3 sm:p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-white">
          <Image
            alt={example.alt}
            className="object-cover object-center"
            fill
            priority
            sizes="(min-width: 1024px) 34rem, (min-width: 640px) 80vw, calc(100vw - 2rem)"
            src={example.src}
          />
          <p className="absolute right-[4%] top-[7%] flex h-[29%] w-[37%] items-center justify-center whitespace-nowrap px-2 text-center font-[var(--font-noto-sans-jp)] text-xs font-bold leading-relaxed text-sumi-950 sm:px-4 sm:text-lg">
            {sentenceStart}
            <mark className="rounded bg-shu-200 px-0.5 text-sumi-950">
              {example.word}
            </mark>
            {sentenceEnd}
          </p>
        </div>
      </div>

      <div className="hero-vocabulary-card relative ml-auto mt-3 w-[92%] rounded-2xl border border-washi-200 bg-white/95 p-4 shadow-[0_22px_55px_-30px_rgba(11,32,41,0.5)] backdrop-blur sm:w-[84%] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-shu-600">
            {text.selectionLabel}
          </p>
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" />
        </div>
        <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="font-[var(--font-noto-sans-jp)] text-5xl font-black text-sumi-950">
            {example.word}
          </span>
          <div>
            <p className="font-[var(--font-noto-sans-jp)] text-sm font-semibold text-sumi-700">
              {example.reading}
            </p>
            <p className="mt-1 text-lg font-bold text-sumi-950">
              {example.meaning}
            </p>
          </div>
        </div>
        <p className="mt-4 border-t border-washi-200 pt-3 text-xs font-semibold text-emerald-700">
          {text.saveStatus}
        </p>
      </div>

      <figcaption className="sr-only">
        {example.japaneseSentence}. {example.word}, {example.meaning}.
      </figcaption>
    </figure>
  );
}
