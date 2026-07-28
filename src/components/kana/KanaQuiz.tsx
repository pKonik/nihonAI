"use client";

import {
  type FormEvent,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { answerKanaQuizAction } from "@/app/kana/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { KANA_SOUND_ROW_ORDER } from "@/lib/kana/catalog";
import {
  createAdaptiveKanaQuiz,
  getKanaQuizCandidates,
  type KanaQuizCategory,
} from "@/lib/kana/quiz";
import type {
  KanaCharacter,
  KanaQuizPerformance,
  KanaQuizScope,
  KanaQuizStats,
  KanaScript,
  KanaSoundRow,
} from "@/types/kana";

const QUIZ_SIZE = 10;

type QuizFeedback = {
  correct: boolean;
  expectedAnswer: string;
};

type KanaQuizProps = {
  hiragana: KanaCharacter[];
  initialPerformance: KanaQuizPerformance[];
  initialStats: KanaQuizStats;
  katakana: KanaCharacter[];
  learnedKeys: string[];
  text: Dictionary["kana"];
};

export function KanaQuiz({
  hiragana,
  initialPerformance,
  initialStats,
  katakana,
  learnedKeys,
  text,
}: KanaQuizProps) {
  const [script, setScript] = useState<KanaScript>("hiragana");
  const [scope, setScope] = useState<KanaQuizScope>("category");
  const [category, setCategory] =
    useState<KanaQuizCategory>("basic");
  const [row, setRow] = useState<KanaSoundRow>("vowels");
  const [queue, setQueue] = useState<KanaCharacter[]>([]);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [sessionSize, setSessionSize] = useState(QUIZ_SIZE);
  const [stats, setStats] = useState(initialStats);
  const [performance, setPerformance] = useState(initialPerformance);
  const [isPending, startTransition] = useTransition();
  const answerInput = useRef<HTMLInputElement>(null);
  const characters = script === "hiragana" ? hiragana : katakana;
  const learnedKeySet = useMemo(
    () => new Set(learnedKeys),
    [learnedKeys],
  );
  const availableCharacters = getKanaQuizCandidates({
    category,
    characters,
    learnedKeys: learnedKeySet,
    performance,
    row,
    scope,
  });
  const current = queue[0];
  const sessionComplete = started && queue.length === 0;
  const sessionLocked = started && !sessionComplete;
  const accuracy = stats.totalAnswers
    ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
    : 0;

  function startQuiz() {
    const nextQueue = createAdaptiveKanaQuiz({
      category,
      characters,
      learnedKeys: learnedKeySet,
      performance,
      row,
      scope,
      size: QUIZ_SIZE,
    });

    if (!nextQueue.length) return;

    setQueue(nextQueue);
    setSessionSize(nextQueue.length);
    setAnswer("");
    setFeedback(null);
    setError("");
    setStarted(true);
    setCompleted(0);
    setMistakes(0);
    window.requestAnimationFrame(() => answerInput.current?.focus());
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!current || feedback || isPending) return;

    setError("");
    startTransition(async () => {
      const result = await answerKanaQuizAction(current.key, answer);

      if (
        !result.ok ||
        typeof result.correct !== "boolean" ||
        !result.expectedAnswer
      ) {
        setError(result.error ?? text.quiz.saveFailed);
        return;
      }

      if (result.stats) setStats(result.stats);
      setPerformance((currentPerformance) => {
        const existing = currentPerformance.find(
          (item) => item.characterKey === current.key,
        );

        if (!existing) {
          return [
            ...currentPerformance,
            {
              characterKey: current.key,
              correctAnswers: result.correct ? 1 : 0,
              totalAnswers: 1,
            },
          ];
        }

        return currentPerformance.map((item) =>
          item.characterKey === current.key
            ? {
                ...item,
                correctAnswers:
                  item.correctAnswers + (result.correct ? 1 : 0),
                totalAnswers: item.totalAnswers + 1,
              }
            : item,
        );
      });
      setFeedback({
        correct: result.correct,
        expectedAnswer: result.expectedAnswer,
      });

      if (result.correct) setCompleted((value) => value + 1);
      else setMistakes((value) => value + 1);
    });
  }

  function continueQuiz() {
    if (!feedback) return;

    setQueue((currentQueue) =>
      feedback.correct
        ? currentQueue.slice(1)
        : [...currentQueue.slice(1), currentQueue[0]],
    );
    setAnswer("");
    setFeedback(null);
    setError("");
    window.requestAnimationFrame(() => answerInput.current?.focus());
  }

  return (
    <section
      aria-labelledby="kana-quiz-title"
      className="mt-10 rounded-[2rem] border border-washi-200 bg-sumi-950 p-6 text-white shadow-[0_24px_70px_-45px_rgba(11,32,41,0.8)] sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-300">
            {text.quiz.eyebrow}
          </p>
          <h2
            className="mt-2 text-3xl font-bold"
            id="kana-quiz-title"
          >
            {text.quiz.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-washi-200">
            {text.quiz.description}
          </p>

          <div
            aria-label={text.chart.scriptLabel}
            className="mt-6 inline-flex rounded-xl border border-white/15 bg-white/5 p-1"
            role="group"
          >
            {(["hiragana", "katakana"] as const).map((option) => (
              <button
                aria-pressed={script === option}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  script === option
                    ? "bg-white text-sumi-950"
                    : "text-washi-200 hover:bg-white/10"
                } disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={sessionLocked}
                key={option}
                onClick={() => setScript(option)}
                type="button"
              >
                {text.chart[option]}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-washi-100">
              {text.quiz.scopeLabel}
              <select
                className="mt-2 block w-full rounded-xl border border-white/15 bg-sumi-900 px-4 py-3 text-white outline-none focus:border-shu-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={sessionLocked}
                onChange={(event) =>
                  setScope(event.target.value as KanaQuizScope)
                }
                value={scope}
              >
                {(
                  [
                    "learned",
                    "category",
                    "row",
                    "all",
                    "mistakes",
                  ] as const
                ).map((option) => (
                  <option key={option} value={option}>
                    {text.quiz.scopes[option]}
                  </option>
                ))}
              </select>
            </label>

            {scope === "category" ? (
              <label className="text-sm font-semibold text-washi-100">
                {text.quiz.categoryLabel}
                <select
                  className="mt-2 block w-full rounded-xl border border-white/15 bg-sumi-900 px-4 py-3 text-white outline-none focus:border-shu-300 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={sessionLocked}
                  onChange={(event) =>
                    setCategory(
                      event.target.value as KanaQuizCategory,
                    )
                  }
                  value={category}
                >
                  {(
                    ["basic", "dakuten", "handakuten"] as const
                  ).map((option) => (
                    <option key={option} value={option}>
                      {text.chart.categories[option].title}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {scope === "row" ? (
              <label className="text-sm font-semibold text-washi-100">
                {text.quiz.rowLabel}
                <select
                  className="mt-2 block w-full rounded-xl border border-white/15 bg-sumi-900 px-4 py-3 text-white outline-none focus:border-shu-300 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={sessionLocked}
                  onChange={(event) =>
                    setRow(event.target.value as KanaSoundRow)
                  }
                  value={row}
                >
                  {KANA_SOUND_ROW_ORDER.map((option) => (
                    <option key={option} value={option}>
                      {option === "vowels"
                        ? text.quiz.vowels
                        : text.quiz.rowOption.replace(
                            "{row}",
                            option.toUpperCase(),
                          )}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          {!started ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-6 text-washi-200">
                {text.quiz.scopeDescriptions[scope]}
              </p>
              <p className="mt-3 text-sm font-semibold text-shu-200">
                {availableCharacters.length
                  ? text.quiz.available.replace(
                      "{count}",
                      String(availableCharacters.length),
                    )
                  : text.quiz.emptyScope}
              </p>
              <p className="mt-3 text-sm leading-6 text-washi-300">
                {text.quiz.retryHint}
              </p>
              <button
                className="mt-5 rounded-xl bg-shu-500 px-5 py-3 font-bold text-white transition hover:bg-shu-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!availableCharacters.length}
                onClick={startQuiz}
                type="button"
              >
                {text.quiz.start}
              </button>
            </div>
          ) : sessionComplete ? (
            <div
              className="mt-8 rounded-2xl border border-shu-400/40 bg-shu-500/10 p-6"
              role="status"
            >
              <p className="text-2xl font-bold">
                {text.quiz.sessionCompleteTitle}
              </p>
              <p className="mt-2 text-washi-200">
                {text.quiz.sessionCompleteDescription
                  .replace("{count}", String(sessionSize))
                  .replace("{mistakes}", String(mistakes))}
              </p>
              <button
                className="mt-5 rounded-xl bg-white px-5 py-3 font-bold text-sumi-950 transition hover:bg-washi-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={startQuiz}
                type="button"
              >
                {text.quiz.restart}
              </button>
            </div>
          ) : current ? (
            <div className="mt-8 rounded-2xl bg-white p-6 text-sumi-950 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-sumi-500">
                  {text.quiz.remaining
                    .replace("{completed}", String(completed))
                    .replace("{total}", String(sessionSize))}
                </p>
                <span className="rounded-full bg-washi-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sumi-600">
                  {text.chart[script]}
                </span>
              </div>

              <p className="mt-8 text-center font-[var(--font-noto-sans-jp)] text-8xl font-bold leading-none">
                {current.character}
              </p>

              <form className="mt-8" onSubmit={submitAnswer}>
                <label
                  className="text-sm font-bold text-sumi-700"
                  htmlFor="kana-quiz-answer"
                >
                  {text.quiz.answerLabel}
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-xl border border-washi-300 px-4 py-3 text-lg font-semibold outline-none transition focus:border-shu-500 focus:ring-2 focus:ring-shu-100 disabled:bg-washi-100"
                    disabled={Boolean(feedback) || isPending}
                    id="kana-quiz-answer"
                    maxLength={12}
                    onChange={(event) => setAnswer(event.target.value)}
                    placeholder={text.quiz.answerPlaceholder}
                    ref={answerInput}
                    spellCheck={false}
                    value={answer}
                  />
                  {!feedback ? (
                    <button
                      className="rounded-xl bg-shu-600 px-5 py-3 font-bold text-white transition hover:bg-shu-700 disabled:cursor-wait disabled:opacity-60"
                      disabled={!answer.trim() || isPending}
                      type="submit"
                    >
                      {isPending ? text.quiz.checking : text.quiz.check}
                    </button>
                  ) : (
                    <button
                      className="rounded-xl bg-sumi-950 px-5 py-3 font-bold text-white transition hover:bg-sumi-800"
                      onClick={continueQuiz}
                      type="button"
                    >
                      {text.quiz.continue}
                    </button>
                  )}
                </div>
              </form>

              {feedback ? (
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 ${
                    feedback.correct
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                  role="status"
                >
                  <p className="font-bold">
                    {feedback.correct
                      ? text.quiz.correctTitle
                      : text.quiz.incorrectTitle}
                  </p>
                  <p className="mt-1 text-sm">
                    {(feedback.correct
                      ? text.quiz.correctDescription
                      : text.quiz.incorrectDescription
                    ).replace("{answer}", feedback.expectedAnswer)}
                  </p>
                </div>
              ) : null}

              {error ? (
                <p
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside
          aria-labelledby="kana-quiz-stats-title"
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <h3 className="text-lg font-bold" id="kana-quiz-stats-title">
            {text.quiz.statsTitle}
          </h3>
          <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
            {[
              [text.quiz.totalAnswers, stats.totalAnswers],
              [text.quiz.accuracy, `${accuracy}%`],
              [text.quiz.activeDays, stats.activeDays],
              [text.quiz.currentStreak, stats.currentStreak],
            ].map(([label, value]) => (
              <div
                className="rounded-xl border border-white/10 bg-white/5 p-4"
                key={label}
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-washi-300">
                  {label}
                </dt>
                <dd className="mt-1 text-2xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
