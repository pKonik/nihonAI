"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { createMangaCrop } from "@/lib/manga/crop";
import {
  createSelectionRect,
  getRelativePoint,
  type Point,
  type SelectionRect,
} from "@/lib/manga/selection";

export type MangaPage = {
  id: string;
  name: string;
  url: string;
};

type MangaReaderProps = {
  pages: readonly MangaPage[];
  text: Dictionary["read"];
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 25;
const DEFAULT_ZOOM = 75;

type ReadingMode = "book" | "scroll";

type PageSelection = {
  pageId: string;
  rect: SelectionRect;
};

type SelectionStart = {
  pageId: string;
  point: Point;
};

type PreparedCrop = {
  height: number;
  pageName: string;
  url: string;
  width: number;
};

function formatPosition(
  template: string,
  current: number,
  total: number,
): string {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}

export function MangaReader({ pages, text }: MangaReaderProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [readingMode, setReadingMode] = useState<ReadingMode>("book");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<PageSelection | null>(null);
  const [preparedCrop, setPreparedCrop] = useState<PreparedCrop | null>(
    null,
  );
  const [cropFeedback, setCropFeedback] = useState("");
  const [cropStatus, setCropStatus] = useState<
    "idle" | "preparing" | "ready" | "error"
  >("idle");
  const viewportRef = useRef<HTMLDivElement>(null);
  const selectionStartRef = useRef<SelectionStart | null>(null);
  const cropGenerationRef = useRef(0);
  const currentPage = pages[currentPageIndex];
  const isBookMode = readingMode === "book";

  const resetCrop = useCallback(() => {
    cropGenerationRef.current += 1;
    setPreparedCrop(null);
    setCropFeedback("");
    setCropStatus("idle");
  }, []);

  function changePage(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= pages.length) {
      return;
    }

    setIsSelecting(false);
    setSelection(null);
    resetCrop();
    setCurrentPageIndex(nextIndex);
  }

  function changeZoom(nextZoom: number) {
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom)));
  }

  function changeReadingMode() {
    setIsSelecting(false);
    setSelection(null);
    resetCrop();
    setReadingMode((mode) => (mode === "book" ? "scroll" : "book"));
  }

  function clearSelection() {
    selectionStartRef.current = null;
    setSelection(null);
    resetCrop();
  }

  function getPointerPoint(event: ReactPointerEvent<HTMLDivElement>) {
    return getRelativePoint(
      { x: event.clientX, y: event.clientY },
      event.currentTarget.getBoundingClientRect(),
    );
  }

  function handleSelectionStart(
    event: ReactPointerEvent<HTMLDivElement>,
    pageId: string,
  ) {
    if (!isSelecting || event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const point = getPointerPoint(event);
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resetCrop();
    selectionStartRef.current = { pageId, point };
    setSelection({
      pageId,
      rect: createSelectionRect(point, point),
    });
  }

  function handleSelectionMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = selectionStartRef.current;
    if (!start || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const point = getPointerPoint(event);
    setSelection({
      pageId: start.pageId,
      rect: createSelectionRect(start.point, point),
    });
  }

  function handleSelectionEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const start = selectionStartRef.current;
    if (!start) {
      return;
    }

    const point = getPointerPoint(event);
    const nextSelection = createSelectionRect(start.point, point);
    selectionStartRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (nextSelection.width >= 0.5 && nextSelection.height >= 0.5) {
      setSelection({ pageId: start.pageId, rect: nextSelection });
      void prepareCrop(start.pageId, nextSelection);
    } else {
      setSelection(null);
      resetCrop();
    }
  }

  function handleSelectionCancel(event: ReactPointerEvent<HTMLDivElement>) {
    selectionStartRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setSelection(null);
    resetCrop();
  }

  async function prepareCrop(pageId: string, rect: SelectionRect) {
    const pageNumber = pages.findIndex((page) => page.id === pageId) + 1;
    const page = pages[pageNumber - 1];
    if (!page) return;

    const generation = cropGenerationRef.current + 1;
    cropGenerationRef.current = generation;
    setPreparedCrop(null);
    setCropFeedback("");
    setCropStatus("preparing");

    try {
      const crop = await createMangaCrop(page.url, rect);
      if (cropGenerationRef.current !== generation) return;

      setPreparedCrop({
        height: crop.height,
        pageName: page.name,
        url: URL.createObjectURL(crop.blob),
        width: crop.width,
      });
      setCropStatus("ready");
    } catch {
      if (cropGenerationRef.current === generation) {
        setCropFeedback(text.crop.errors.prepareFailed);
        setCropStatus("error");
      }
    }
  }

  useEffect(() => {
    viewportRef.current?.scrollTo({ left: 0, top: 0 });
  }, [currentPageIndex, readingMode]);

  useEffect(
    () => () => {
      if (preparedCrop) URL.revokeObjectURL(preparedCrop.url);
    },
    [preparedCrop],
  );

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.matches("input, select, textarea"))
      ) {
        return;
      }

      if (
        isBookMode &&
        (event.key === "ArrowLeft" || event.key === "PageUp")
      ) {
        event.preventDefault();
        setIsSelecting(false);
        setSelection(null);
        resetCrop();
        setCurrentPageIndex((index) => Math.max(0, index - 1));
      } else if (
        isBookMode &&
        (event.key === "ArrowRight" || event.key === "PageDown")
      ) {
        event.preventDefault();
        setIsSelecting(false);
        setSelection(null);
        resetCrop();
        setCurrentPageIndex((index) =>
          Math.min(pages.length - 1, index + 1),
        );
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoom((currentZoom) =>
          Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP),
        );
      } else if (event.key === "-") {
        event.preventDefault();
        setZoom((currentZoom) =>
          Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP),
        );
      } else if (event.key === "0") {
        event.preventDefault();
        setZoom(DEFAULT_ZOOM);
      } else if (event.key === "Escape" && (isSelecting || selection)) {
        event.preventDefault();
        selectionStartRef.current = null;
        setIsSelecting(false);
        setSelection(null);
        resetCrop();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isBookMode, isSelecting, pages.length, resetCrop, selection]);

  function handleViewportKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Home") {
      event.preventDefault();
      viewportRef.current?.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    }
  }

  return (
    <section aria-label={text.readerLabel} className="mt-10">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            {text.readerEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-sumi-950">
            {text.readerTitle}
          </h2>
        </div>
        <div className="flex max-w-xl flex-col items-start gap-3 lg:items-end">
          <button
            aria-label={
              isBookMode ? text.switchToScroll : text.switchToBook
            }
            aria-pressed={!isBookMode}
            className="rounded-xl bg-sumi-950 px-4 py-2.5 text-sm font-semibold text-washi-50 transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            onClick={changeReadingMode}
            title={isBookMode ? text.switchToScroll : text.switchToBook}
            type="button"
          >
            <span aria-hidden="true">{isBookMode ? "▣" : "☷"}</span>{" "}
            {isBookMode ? text.bookMode : text.scrollMode}
          </button>
          <p className="text-sm text-sumi-600">
            {isBookMode ? text.bookKeyboardHelp : text.scrollKeyboardHelp}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/55 shadow-[0_24px_70px_-45px_rgba(11,32,41,0.38)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 border-b border-washi-200/80 bg-white/65 p-3 sm:flex-row sm:items-center sm:justify-between">
          {isBookMode ? (
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <button
                aria-label={text.previousPage}
                className="rounded-xl border border-washi-300 bg-washi-50 px-4 py-2 text-sm font-semibold text-sumi-800 transition hover:border-shu-300 hover:text-shu-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPageIndex === 0}
                onClick={() => changePage(currentPageIndex - 1)}
                type="button"
              >
                ← <span className="hidden sm:inline">{text.previous}</span>
              </button>
              <p
                aria-live="polite"
                className="min-w-24 text-center text-sm font-semibold text-sumi-700"
              >
                {formatPosition(
                  text.pagePosition,
                  currentPageIndex + 1,
                  pages.length,
                )}
              </p>
              <button
                aria-label={text.nextPage}
                className="rounded-xl border border-washi-300 bg-washi-50 px-4 py-2 text-sm font-semibold text-sumi-800 transition hover:border-shu-300 hover:text-shu-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPageIndex === pages.length - 1}
                onClick={() => changePage(currentPageIndex + 1)}
                type="button"
              >
                <span className="hidden sm:inline">{text.next}</span> →
              </button>
            </div>
          ) : (
            <p
              aria-live="polite"
              className="text-sm font-semibold text-sumi-700"
            >
              {text.scrollMode} · {pages.length} {text.pages}
            </p>
          )}

          <div
            aria-label={text.zoomControls}
            className="flex items-center gap-2"
            role="group"
          >
            <button
              aria-label={text.zoomOut}
              className="grid size-10 place-items-center rounded-xl border border-washi-300 bg-washi-50 text-lg font-bold text-sumi-800 transition hover:border-shu-300 hover:text-shu-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={zoom === MIN_ZOOM}
              onClick={() => changeZoom(zoom - ZOOM_STEP)}
              type="button"
            >
              −
            </button>
            <button
              aria-label={`${text.resetZoom}: ${zoom}%`}
              className="min-w-20 rounded-xl px-3 py-2 text-sm font-semibold text-sumi-700 transition hover:bg-washi-100 hover:text-shu-700"
              onClick={() => changeZoom(DEFAULT_ZOOM)}
              title={text.resetZoom}
              type="button"
            >
              {zoom}%
            </button>
            <button
              aria-label={text.zoomIn}
              className="grid size-10 place-items-center rounded-xl border border-washi-300 bg-washi-50 text-lg font-bold text-sumi-800 transition hover:border-shu-300 hover:text-shu-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={zoom === MAX_ZOOM}
              onClick={() => changeZoom(zoom + ZOOM_STEP)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b border-washi-200/80 bg-shu-50/50 px-4 py-3 text-sm text-sumi-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {isSelecting ? text.selectionHelp : text.selectionIdleHelp}
          </p>
          <p aria-live="polite" className="font-semibold text-shu-700">
            {selection ? text.selectionReady : ""}
          </p>
        </div>

        {cropStatus !== "idle" ? (
          <div className="border-b border-washi-200/80 bg-white/80 p-4 sm:p-5">
            {cropStatus === "preparing" ? (
              <p
                aria-live="polite"
                className="text-sm font-semibold text-sumi-700"
              >
                {text.crop.preparing}
              </p>
            ) : preparedCrop ? (
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shu-600">
                    {text.crop.previewEyebrow}
                  </p>
                  <div className="mt-3 grid min-h-36 place-items-center overflow-hidden rounded-xl border border-washi-200 bg-washi-100 p-3">
                    {/* The preview is a local blob URL generated from the selected page. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={text.crop.previewAlt}
                      className="max-h-60 max-w-full rounded-lg object-contain"
                      src={preparedCrop.url}
                    />
                  </div>
                  <p className="mt-2 text-xs text-sumi-500">
                    {preparedCrop.width} × {preparedCrop.height} px ·{" "}
                    {preparedCrop.pageName}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-sumi-950">
                    {text.crop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-sumi-600">
                    {text.crop.description}
                  </p>
                  <p className="mt-4 rounded-xl border border-shu-100 bg-shu-50 px-4 py-3 text-sm leading-6 text-sumi-700">
                    {text.crop.temporary}
                  </p>
                </div>
              </div>
            ) : cropFeedback ? (
              <p
                aria-live="polite"
                className="text-sm font-semibold text-red-700"
                role="alert"
              >
                {cropFeedback}
              </p>
            ) : null}
          </div>
        ) : null}

        {isBookMode ? (
          <>
            <div className="flex items-center justify-between gap-4 border-b border-washi-200/80 bg-white/45 px-4 py-3 text-sm text-sumi-600">
              <span>
                {text.pageLabel} {currentPageIndex + 1}
              </span>
              <span className="truncate" title={currentPage.name}>
                {currentPage.name}
              </span>
            </div>

            <div
              aria-label={text.viewportLabel}
              className="max-h-[75vh] min-h-80 overflow-auto overscroll-contain bg-[linear-gradient(135deg,rgba(255,255,255,0.38),rgba(247,248,251,0.62))] focus:outline-2 focus:outline-offset-[-2px] focus:outline-shu-600"
              onKeyDown={handleViewportKeyDown}
              ref={viewportRef}
              tabIndex={0}
            >
              <div className="flex min-h-full min-w-full items-start justify-center p-2 sm:p-3">
                <div
                  className={`relative shrink-0 select-none overflow-hidden shadow-sm ${
                    isSelecting ? "cursor-crosshair" : ""
                  }`}
                  onPointerCancel={handleSelectionCancel}
                  onPointerDown={(event) =>
                    handleSelectionStart(event, currentPage.id)
                  }
                  onPointerMove={handleSelectionMove}
                  onPointerUp={handleSelectionEnd}
                  style={{ width: `${zoom}%` }}
                >
                  {/* Local blob URLs have no build-time dimensions and never leave the browser. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`${text.pageLabel} ${currentPageIndex + 1}: ${currentPage.name}`}
                    className="block h-auto w-full max-w-none"
                    draggable={false}
                    src={currentPage.url}
                  />
                  {selection?.pageId === currentPage.id ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute border-2 border-shu-600 bg-shu-500/15 shadow-[0_0_0_9999px_rgba(11,32,41,0.28)]"
                      style={{
                        height: `${selection.rect.height}%`,
                        left: `${selection.rect.left}%`,
                        top: `${selection.rect.top}%`,
                        width: `${selection.rect.width}%`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : (
          <ol className="space-y-6 bg-[linear-gradient(135deg,rgba(255,255,255,0.38),rgba(247,248,251,0.62))] p-2 sm:p-3">
            {pages.map((page, index) => (
              <li
                className="overflow-hidden rounded-xl border border-washi-200/80 bg-white/55"
                key={page.id}
              >
                <div className="flex items-center justify-between gap-4 border-b border-washi-200/80 bg-white/65 px-4 py-3 text-sm text-sumi-600">
                  <span>
                    {text.pageLabel} {index + 1}
                  </span>
                  <span className="truncate" title={page.name}>
                    {page.name}
                  </span>
                </div>
                <div className="overflow-auto overscroll-contain p-2 sm:p-3">
                  <div className="flex min-w-full justify-center">
                    <div
                      className={`relative shrink-0 select-none overflow-hidden shadow-sm ${
                        isSelecting ? "cursor-crosshair" : ""
                      }`}
                      onPointerCancel={handleSelectionCancel}
                      onPointerDown={(event) =>
                        handleSelectionStart(event, page.id)
                      }
                      onPointerMove={handleSelectionMove}
                      onPointerUp={handleSelectionEnd}
                      style={{ width: `${zoom}%` }}
                    >
                      {/* Local blob URLs have no build-time dimensions and never leave the browser. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`${text.pageLabel} ${index + 1}: ${page.name}`}
                        className="block h-auto w-full max-w-none"
                        draggable={false}
                        loading="lazy"
                        src={page.url}
                      />
                      {selection?.pageId === page.id ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute border-2 border-shu-600 bg-shu-500/15 shadow-[0_0_0_9999px_rgba(11,32,41,0.28)]"
                          style={{
                            height: `${selection.rect.height}%`,
                            left: `${selection.rect.left}%`,
                            top: `${selection.rect.top}%`,
                            width: `${selection.rect.width}%`,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div
        aria-label={text.selectionControls}
        className="fixed bottom-[4.75rem] right-4 z-30 flex items-center gap-2 sm:bottom-[5.25rem] sm:right-6"
        role="group"
      >
        {selection ? (
          <button
            aria-label={text.clearSelection}
            className="grid size-10 place-items-center rounded-full border border-washi-300 bg-white text-lg font-bold text-sumi-700 shadow-[0_12px_32px_-14px_rgba(11,32,41,0.45)] transition hover:-translate-y-0.5 hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            onClick={clearSelection}
            title={text.clearSelection}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
        <button
          aria-pressed={isSelecting}
          className={`rounded-full border px-4 py-2.5 text-sm font-bold shadow-[0_12px_32px_-14px_rgba(11,32,41,0.45)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 ${
            isSelecting
              ? "border-shu-600 bg-shu-600 text-white"
              : "border-washi-300 bg-white text-sumi-800 hover:border-shu-300 hover:text-shu-700"
          }`}
          onClick={() => {
            selectionStartRef.current = null;
            setIsSelecting((current) => !current);
          }}
          type="button"
        >
          <span aria-hidden="true">⌗</span>{" "}
          {isSelecting ? text.selectingRegion : text.selectRegion}
        </button>
      </div>
    </section>
  );
}
