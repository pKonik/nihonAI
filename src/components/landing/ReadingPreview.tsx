"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

export type ReadingSlide = {
  alt: string;
  id: string;
  japaneseSentence: string;
  meaning: string;
  pageLabel: string;
  reading: string;
  src: string;
  word: string;
};

type ReadingPreviewProps = {
  slides: readonly ReadingSlide[];
  text: Dictionary["landing"]["hero"];
};

const SLIDE_INTERVAL_MS = 6_000;

export function ReadingPreview({
  slides,
  text,
}: ReadingPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateMotionPreference() {
      setAutoPlayEnabled(!motionPreference.matches);
    }

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      motionPreference.removeEventListener(
        "change",
        updateMotionPreference,
      );
    };
  }, []);

  useEffect(() => {
    if (
      !hasMultipleSlides ||
      !autoPlayEnabled ||
      interactionPaused
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % slides.length,
      );
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    autoPlayEnabled,
    hasMultipleSlides,
    interactionPaused,
    slides.length,
  ]);

  if (!activeSlide) {
    return null;
  }

  function showPreviousSlide() {
    setActiveIndex((currentIndex) =>
      (currentIndex - 1 + slides.length) % slides.length,
    );
  }

  function showNextSlide() {
    setActiveIndex((currentIndex) =>
      (currentIndex + 1) % slides.length,
    );
  }

  return (
    <figure
      aria-label={text.carouselLabel}
      className="relative mx-auto w-full max-w-[34rem]"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteractionPaused(false);
        }
      }}
      onFocusCapture={() => setInteractionPaused(true)}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute -left-7 top-14 size-28 rounded-full border-[18px] border-shu-100/80"
      />
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 size-24 rounded-full bg-shu-300/20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-sumi-950 p-3 shadow-[0_35px_90px_-40px_rgba(11,32,41,0.85)] sm:p-4">
        <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3">
          <span className="text-xs font-semibold text-washi-300">
            {text.contextLabel}
          </span>
          <span className="rounded-full bg-white/8 px-3 py-1 text-[0.7rem] font-semibold text-washi-300">
            {activeSlide.pageLabel}
          </span>
        </div>

        <div className="relative mt-3 min-h-[21rem] overflow-hidden rounded-[1.4rem] bg-sumi-900 p-5 sm:min-h-[24rem] sm:p-7">
          {slides.map((slide, index) => (
            <Image
              alt={slide.alt}
              aria-hidden={index !== activeIndex}
              className={`object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
                index === activeIndex ? "opacity-72" : "opacity-0"
              }`}
              fetchPriority={index === 0 ? "high" : undefined}
              fill
              key={slide.id}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 80vw, calc(100vw - 2rem)"
              src={slide.src}
            />
          ))}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,251,0.08)_0%,rgba(11,32,41,0.12)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 size-72 rounded-full border-[38px] border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="absolute right-8 top-6 h-44 w-px bg-white/15"
          />
          <div
            aria-hidden="true"
            className="absolute right-16 top-12 h-52 w-px bg-white/10"
          />

          <div className="relative flex h-full min-h-[17rem] items-center justify-center sm:min-h-[20rem]">
            <div className="relative rounded-2xl border-2 border-shu-500 bg-white/90 px-6 py-7 shadow-[0_18px_45px_-25px_rgba(218,87,82,0.75)] backdrop-blur-[2px]">
              <span className="absolute -left-2 -top-2 size-4 rounded-sm border-2 border-white bg-shu-500" />
              <span className="absolute -right-2 -top-2 size-4 rounded-sm border-2 border-white bg-shu-500" />
              <span className="absolute -bottom-2 -left-2 size-4 rounded-sm border-2 border-white bg-shu-500" />
              <span className="absolute -bottom-2 -right-2 size-4 rounded-sm border-2 border-white bg-shu-500" />
              <p className="font-[var(--font-noto-sans-jp)] text-2xl font-bold tracking-[0.08em] text-sumi-950 sm:text-3xl">
                {activeSlide.japaneseSentence}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-16 ml-auto w-[88%] rounded-2xl border border-washi-200 bg-white/95 p-4 shadow-[0_22px_55px_-30px_rgba(11,32,41,0.5)] backdrop-blur sm:w-[78%] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-shu-600">
            {text.selectionLabel}
          </p>
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" />
        </div>
        <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="font-[var(--font-noto-sans-jp)] text-5xl font-black text-sumi-950">
            {activeSlide.word}
          </span>
          <div>
            <p className="font-[var(--font-noto-sans-jp)] text-sm font-semibold text-sumi-700">
              {activeSlide.reading}
            </p>
            <p className="mt-1 text-lg font-bold text-sumi-950">
              {activeSlide.meaning}
            </p>
          </div>
        </div>
        <p className="mt-4 border-t border-washi-200 pt-3 text-xs font-semibold text-emerald-700">
          {text.saveStatus}
        </p>
      </div>

      {hasMultipleSlides ? (
        <div
          aria-label={text.carouselControls}
          className="mt-4 flex items-center justify-center gap-2"
          role="group"
        >
          <button
            aria-label={text.previousSlide}
            className="flex size-9 items-center justify-center rounded-full border border-washi-300 bg-white text-sumi-700 transition hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            onClick={showPreviousSlide}
            type="button"
          >
            ←
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {slides.map((slide, index) => (
              <button
                aria-label={text.goToSlide
                  .replace("{current}", String(index + 1))
                  .replace("{total}", String(slides.length))}
                aria-pressed={index === activeIndex}
                className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-6 bg-shu-600"
                    : "w-2 bg-washi-300 hover:bg-sumi-500"
                }`}
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label={text.nextSlide}
            className="flex size-9 items-center justify-center rounded-full border border-washi-300 bg-white text-sumi-700 transition hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            onClick={showNextSlide}
            type="button"
          >
            →
          </button>
          <button
            aria-label={
              autoPlayEnabled ? text.pauseSlides : text.playSlides
            }
            className="ml-1 flex size-9 items-center justify-center rounded-full border border-washi-300 bg-white text-xs font-black text-sumi-700 transition hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            onClick={() =>
              setAutoPlayEnabled((isEnabled) => !isEnabled)
            }
            type="button"
          >
            {autoPlayEnabled ? "Ⅱ" : "▶"}
          </button>
        </div>
      ) : null}

      <figcaption className="sr-only">
        {text.contextLabel}: {activeSlide.japaneseSentence}.{" "}
        {activeSlide.word}, {activeSlide.meaning}.
      </figcaption>
    </figure>
  );
}
