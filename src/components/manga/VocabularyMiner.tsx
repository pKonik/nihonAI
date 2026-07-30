"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  localizeDictionaryEntry,
  type DictionaryEntry,
} from "@/lib/mining/dictionary";
import type { MiningToken } from "@/lib/mining/runtime";

type VocabularyMinerProps = {
  locale: Locale;
  sentence: string;
  text: Dictionary["read"]["mining"];
};

type AnalysisStatus = "idle" | "loading" | "ready" | "error";
type LookupStatus = "idle" | "loading" | "ready" | "error";

const HOVER_DELAY_MS = 300;
const CARD_GAP = 10;
const CARD_MARGIN = 12;
const CARD_MAX_WIDTH = 440;
const CARD_ESTIMATED_HEIGHT = 360;

type CardPosition = {
  bottom?: number;
  left: number;
  top?: number;
  width: number;
};

function partOfSpeechKey(code: string) {
  if (code === "n" || code.startsWith("n-")) return "noun";
  if (code.startsWith("v")) return "verb";
  if (code.startsWith("adj")) return "adjective";
  if (code.startsWith("adv")) return "adverb";
  if (code === "prt") return "particle";
  if (code === "exp") return "expression";
  if (code.startsWith("aux")) return "auxiliary";
  if (code === "conj") return "conjunction";
  if (code === "int") return "interjection";
  if (code === "pn") return "pronoun";
  if (code === "pref") return "prefix";
  if (code === "suf") return "suffix";
  if (code === "ctr") return "counter";
  return "other";
}

export function VocabularyMiner({
  locale,
  sentence,
  text,
}: VocabularyMinerProps) {
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus>("idle");
  const [tokens, setTokens] = useState<readonly MiningToken[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const [lookupStatus, setLookupStatus] =
    useState<LookupStatus>("idle");
  const [entries, setEntries] = useState<readonly DictionaryEntry[]>([]);
  const [entryIndex, setEntryIndex] = useState(0);
  const [meaningLocale, setMeaningLocale] = useState<Locale>(locale);
  const [cardPosition, setCardPosition] =
    useState<CardPosition | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookupGeneration = useRef(0);
  const activeAnchor = useRef<HTMLButtonElement | null>(null);
  const pinnedIndexRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    function repositionCard() {
      const anchor = activeAnchor.current;
      if (anchor?.isConnected) {
        setCardPosition(getCardPosition(anchor));
      }
    }

    window.addEventListener("resize", repositionCard);
    window.addEventListener("scroll", repositionCard, true);

    return () => {
      window.removeEventListener("resize", repositionCard);
      window.removeEventListener("scroll", repositionCard, true);
    };
  }, [activeIndex]);

  function getCardPosition(anchor: HTMLButtonElement): CardPosition {
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(
      CARD_MAX_WIDTH,
      Math.max(280, window.innerWidth - CARD_MARGIN * 2),
    );
    const left = Math.min(
      Math.max(CARD_MARGIN, rect.left),
      window.innerWidth - width - CARD_MARGIN,
    );
    const placeBelow =
      rect.bottom + CARD_GAP + CARD_ESTIMATED_HEIGHT <=
        window.innerHeight || rect.top < window.innerHeight / 2;

    return placeBelow
      ? { left, top: rect.bottom + CARD_GAP, width }
      : {
          bottom: window.innerHeight - rect.top + CARD_GAP,
          left,
          width,
        };
  }

  async function analyze() {
    pinnedIndexRef.current = null;
    activeAnchor.current = null;
    setAnalysisStatus("loading");
    setActiveIndex(null);
    setPinnedIndex(null);
    setLookupStatus("idle");
    setCardPosition(null);

    try {
      const { analyzeJapaneseText } = await import(
        "@/lib/mining/runtime"
      );
      const nextTokens = await analyzeJapaneseText(sentence);
      setTokens(nextTokens);
      setAnalysisStatus("ready");
    } catch {
      setAnalysisStatus("error");
    }
  }

  async function showToken(
    index: number,
    pin: boolean,
    anchor: HTMLButtonElement,
  ) {
    const token = tokens[index];
    if (!token?.searchable) return;

    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    activeAnchor.current = anchor;
    setCardPosition(getCardPosition(anchor));
    if (pin) {
      pinnedIndexRef.current = index;
      setPinnedIndex(index);
    }
    setActiveIndex(index);
    setLookupStatus("loading");
    setEntries([]);
    setEntryIndex(0);
    setMeaningLocale(locale);
    const generation = lookupGeneration.current + 1;
    lookupGeneration.current = generation;

    try {
      const { lookupMiningToken } = await import(
        "@/lib/mining/runtime"
      );
      const nextEntries = await lookupMiningToken(token);
      if (lookupGeneration.current !== generation) return;

      setEntries(nextEntries);
      setLookupStatus("ready");
    } catch {
      if (lookupGeneration.current === generation) {
        setLookupStatus("error");
      }
    }
  }

  function scheduleToken(
    index: number,
    anchor: HTMLButtonElement,
  ) {
    if (pinnedIndexRef.current !== null) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    hoverTimer.current = setTimeout(() => {
      if (anchor.isConnected) {
        void showToken(index, false, anchor);
      }
    }, HOVER_DELAY_MS);
  }

  function leaveToken(index: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (pinnedIndexRef.current === null && activeIndex === index) {
      lookupGeneration.current += 1;
      activeAnchor.current = null;
      setCardPosition(null);
      setActiveIndex(null);
      setLookupStatus("idle");
    }
  }

  function handlePointerEnter(
    event: ReactPointerEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.pointerType === "mouse") {
      scheduleToken(index, event.currentTarget);
    }
  }

  function closeCard() {
    pinnedIndexRef.current = null;
    activeAnchor.current = null;
    lookupGeneration.current += 1;
    setPinnedIndex(null);
    setActiveIndex(null);
    setLookupStatus("idle");
    setCardPosition(null);
  }

  function handleTokenClick(
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (pinnedIndexRef.current === index) {
      closeCard();
      return;
    }

    void showToken(index, true, event.currentTarget);
  }

  function handleTokenFocus(
    event: FocusEvent<HTMLButtonElement>,
    index: number,
  ) {
    void showToken(index, false, event.currentTarget);
  }

  const activeToken =
    activeIndex === null ? null : tokens[activeIndex] ?? null;
  const selectedEntry = entries[entryIndex];
  const localizedEntry = selectedEntry
    ? localizeDictionaryEntry(selectedEntry, meaningLocale)
    : null;
  const partLabels = selectedEntry
    ? [
        ...new Set(
          selectedEntry.p.map((code) => text.parts[partOfSpeechKey(code)]),
        ),
      ].slice(0, 3)
    : [];
  const cardStyle: CSSProperties | undefined = cardPosition
    ? {
        bottom: cardPosition.bottom,
        left: cardPosition.left,
        top: cardPosition.top,
        width: cardPosition.width,
      }
    : undefined;

  return (
    <section className="mt-6 rounded-2xl border border-shu-100 bg-shu-50/60 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-bold text-sumi-950">{text.title}</h4>
          <p className="mt-1 text-sm leading-6 text-sumi-600">
            {text.description}
          </p>
        </div>
        <button
          className="shrink-0 rounded-xl bg-shu-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 disabled:cursor-wait disabled:opacity-60"
          disabled={analysisStatus === "loading"}
          onClick={() => void analyze()}
          type="button"
        >
          {analysisStatus === "loading"
            ? text.analyzing
            : text.analyzeAction}
        </button>
      </div>
      <p className="mt-2 text-xs leading-5 text-sumi-500">
        {text.analyzeHelp}
      </p>

      {analysisStatus === "error" ? (
        <p className="mt-4 text-sm font-semibold text-red-700" role="alert">
          {text.errors.analysisFailed}
        </p>
      ) : analysisStatus === "ready" ? (
        <div className="mt-5">
          <p className="text-sm leading-6 text-sumi-600">
            {text.tokenHelp}
          </p>
          <div
            aria-label={text.tokensLabel}
            className="mt-3 whitespace-pre-wrap rounded-xl border border-washi-200 bg-white px-4 py-3 text-lg leading-9 text-sumi-950"
            lang="ja"
          >
            {tokens.map((token, index) =>
              token.searchable ? (
                <button
                  aria-pressed={pinnedIndex === index}
                  className={`rounded-md px-0.5 font-medium decoration-shu-400 decoration-2 underline-offset-4 transition hover:bg-shu-100 hover:text-shu-800 hover:underline focus-visible:bg-shu-100 focus-visible:text-shu-800 focus-visible:outline-2 focus-visible:outline-shu-500 ${
                    activeIndex === index ? "bg-shu-100 text-shu-800" : ""
                  }`}
                  key={`${index}-${token.surface}`}
                  onBlur={() => leaveToken(index)}
                  onClick={(event) => handleTokenClick(event, index)}
                  onFocus={(event) => handleTokenFocus(event, index)}
                  onPointerEnter={(event) =>
                    handlePointerEnter(event, index)
                  }
                  onPointerLeave={() => leaveToken(index)}
                  type="button"
                >
                  {token.surface}
                </button>
              ) : (
                <span key={`${index}-${token.surface}`}>
                  {token.surface}
                </span>
              ),
            )}
          </div>

          {activeToken &&
          cardPosition &&
          typeof document !== "undefined"
            ? createPortal(
                <article
                  aria-label={text.cardLabel}
                  aria-live="polite"
                  className="fixed z-[70] max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-2xl border border-washi-200 bg-white/98 p-4 text-sumi-950 shadow-[0_22px_55px_-24px_rgba(11,32,41,0.5)] backdrop-blur-xl sm:p-5"
                  style={cardStyle}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-shu-600">
                      {text.cardLabel}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                      />
                      {pinnedIndex !== null ? (
                        <button
                          aria-label={text.closeCard}
                          className="grid size-7 place-items-center rounded-full border border-washi-200 text-base font-bold text-sumi-500 transition hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                          onClick={closeCard}
                          type="button"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {lookupStatus === "loading" ? (
                    <p className="mt-5 text-sm font-semibold text-sumi-600">
                      {text.loadingEntry}
                    </p>
                  ) : lookupStatus === "error" ? (
                    <p className="mt-5 text-sm font-semibold text-red-700">
                      {text.errors.dictionaryFailed}
                    </p>
                  ) : lookupStatus === "ready" && !selectedEntry ? (
                    <p className="mt-5 text-sm text-sumi-600">
                      {text.noEntry}
                    </p>
                  ) : selectedEntry && localizedEntry ? (
                    <>
                      <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
                        <p
                          className="font-[var(--font-noto-sans-jp)] text-4xl font-black text-sumi-950"
                          lang="ja"
                        >
                          {selectedEntry.w}
                        </p>
                        <div className="min-w-0">
                          <p
                            className="font-[var(--font-noto-sans-jp)] text-sm font-semibold text-sumi-600"
                            lang="ja"
                          >
                            {selectedEntry.r}
                          </p>
                          <p className="mt-1 text-lg font-bold leading-snug text-sumi-950">
                            {localizedEntry.meanings[0]}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-washi-200 pt-3">
                        <span className="rounded-full bg-shu-50 px-3 py-1 text-xs font-semibold text-shu-700">
                          {partLabels.join(" · ") || text.parts.other}
                        </span>
                        <div
                          aria-label={text.meaningLanguage}
                          className="flex rounded-lg border border-washi-200 bg-washi-50 p-0.5"
                        >
                          {(["es", "en"] as const).map((language) => (
                            <button
                              aria-pressed={meaningLocale === language}
                              className={`rounded-md px-2 py-1 text-xs font-bold transition ${
                                meaningLocale === language
                                  ? "bg-sumi-950 text-white"
                                  : "text-sumi-500 hover:text-sumi-900"
                              }`}
                              key={language}
                              onClick={() => setMeaningLocale(language)}
                              type="button"
                            >
                              {language.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {localizedEntry.meanings.length > 1 ? (
                        <ul className="mt-3 space-y-1 text-sm leading-6 text-sumi-700">
                          {localizedEntry.meanings
                            .slice(1, 4)
                            .map((meaning) => (
                              <li key={meaning}>· {meaning}</li>
                            ))}
                        </ul>
                      ) : null}

                      {localizedEntry.fallbackToEnglish ? (
                        <p className="mt-3 text-xs text-amber-700">
                          {text.englishFallback}
                        </p>
                      ) : null}

                      {entries.length > 1 && pinnedIndex !== null ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {entries.map((entry, index) => (
                            <button
                              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                                entryIndex === index
                                  ? "border-shu-400 bg-shu-50 text-shu-800"
                                  : "border-washi-200 text-sumi-500 hover:border-shu-200 hover:text-sumi-800"
                              }`}
                              key={entry.i}
                              onClick={() => setEntryIndex(index)}
                              type="button"
                            >
                              {entry.w} · {entry.r}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  <div className="mt-4 flex flex-col gap-1 border-t border-washi-200 pt-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sumi-500">
                      {pinnedIndex === null
                        ? text.hoverHelp
                        : text.pinnedHelp}
                    </p>
                    <a
                      className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-700"
                      href="https://www.edrdg.org/edrdg/licence.html"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {text.attribution}
                    </a>
                  </div>
                </article>,
                document.body,
              )
            : null}
        </div>
      ) : null}
    </section>
  );
}
