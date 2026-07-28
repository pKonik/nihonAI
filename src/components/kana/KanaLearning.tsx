"use client";

import { useMemo, useState, useTransition } from "react";

import {
  setKanaGroupProgressAction,
  setKanaProgressAction,
} from "@/app/kana/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { KANA_SOUND_ROW_ORDER } from "@/lib/kana/catalog";
import type {
  KanaCharacter,
  KanaScript,
} from "@/types/kana";

type KanaFilter = "all" | "learned" | "pending";
type KanaCategory = "basic" | "dakuten" | "handakuten";

function getKanaCategory(character: KanaCharacter): KanaCategory {
  if (character.group === "dakuten") return "dakuten";
  if (character.group === "handakuten") return "handakuten";
  return "basic";
}

type LocalizedCombination = {
  example: {
    meaning: string;
    reading: string;
    word: string;
  };
  hiragana: string;
  katakana: string;
  romaji: string;
};

type KanaLearningProps = {
  combinations: LocalizedCombination[];
  hiragana: KanaCharacter[];
  initialLearnedKeys: string[];
  katakana: KanaCharacter[];
  text: Dictionary["kana"];
};

export function KanaLearning({
  combinations,
  hiragana,
  initialLearnedKeys,
  katakana,
  text,
}: KanaLearningProps) {
  const [script, setScript] = useState<KanaScript>("hiragana");
  const [filter, setFilter] = useState<KanaFilter>("all");
  const [learnedKeys, setLearnedKeys] = useState(
    () => new Set(initialLearnedKeys),
  );
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();
  const characters = script === "hiragana" ? hiragana : katakana;
  const learnedInScript = characters.filter((character) =>
    learnedKeys.has(character.key),
  ).length;
  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) => {
        if (filter === "learned") return learnedKeys.has(character.key);
        if (filter === "pending") return !learnedKeys.has(character.key);
        return true;
      }),
    [characters, filter, learnedKeys],
  );
  const categories = (
    ["basic", "dakuten", "handakuten"] as const
  ).map((category) => {
    const categoryCharacters = characters.filter(
      (character) => getKanaCategory(character) === category,
    );

    return {
      characterCount: categoryCharacters.length,
      description: text.chart.categories[category].description,
      id: `${script}-${category}`,
      rows: KANA_SOUND_ROW_ORDER.map((soundRow) => ({
        allCharacters: categoryCharacters.filter(
          (character) => character.soundRow === soundRow,
        ),
        characters: filteredCharacters.filter(
          (character) =>
            getKanaCategory(character) === category &&
            character.soundRow === soundRow,
        ),
        id: `${script}-${category}-${soundRow}`,
        soundRow,
      })).filter((row) => row.characters.length),
      title: text.chart.categories[category].title,
    };
  });
  const visibleCategories = categories.filter(
    (category) => category.rows.length,
  );

  function toggleLearned(character: KanaCharacter) {
    const wasLearned = learnedKeys.has(character.key);
    const nextLearned = !wasLearned;
    setFeedback("");
    setLearnedKeys((current) => {
      const next = new Set(current);
      if (nextLearned) next.add(character.key);
      else next.delete(character.key);
      return next;
    });

    startTransition(async () => {
      const result = await setKanaProgressAction(
        character.key,
        nextLearned,
      );

      if (!result.ok) {
        setLearnedKeys((current) => {
          const next = new Set(current);
          if (wasLearned) next.add(character.key);
          else next.delete(character.key);
          return next;
        });
        setFeedback(result.error ?? text.feedback.saveFailed);
      }
    });
  }

  function toggleRowLearned(rowCharacters: KanaCharacter[]) {
    const rowKeys = rowCharacters.map((character) => character.key);
    const previouslyLearned = new Set(
      rowKeys.filter((key) => learnedKeys.has(key)),
    );
    const nextLearned = previouslyLearned.size !== rowKeys.length;

    setFeedback("");
    setLearnedKeys((current) => {
      const next = new Set(current);
      rowKeys.forEach((key) => {
        if (nextLearned) next.add(key);
        else next.delete(key);
      });
      return next;
    });

    startTransition(async () => {
      const result = await setKanaGroupProgressAction(
        rowKeys,
        nextLearned,
      );

      if (!result.ok) {
        setLearnedKeys((current) => {
          const next = new Set(current);
          rowKeys.forEach((key) => {
            if (previouslyLearned.has(key)) next.add(key);
            else next.delete(key);
          });
          return next;
        });
        setFeedback(result.error ?? text.feedback.saveFailed);
      }
    });
  }

  const progressPercent = Math.round(
    (learnedInScript / characters.length) * 100,
  );

  return (
    <>
      <section
        aria-labelledby="kana-progress-title"
        className="mt-8 rounded-2xl border border-washi-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-shu-700">
              {text.progress.eyebrow}
            </p>
            <h2
              className="mt-1 text-2xl font-bold text-sumi-950"
              id="kana-progress-title"
            >
              {text.progress.title
                .replace("{learned}", String(learnedInScript))
                .replace("{total}", String(characters.length))}
            </h2>
          </div>
          <span className="text-sm font-semibold text-sumi-600">
            {progressPercent}%
          </span>
        </div>
        <div
          aria-label={text.progress.label
            .replace("{learned}", String(learnedInScript))
            .replace("{total}", String(characters.length))}
          aria-valuemax={characters.length}
          aria-valuemin={0}
          aria-valuenow={learnedInScript}
          className="mt-4 h-2 overflow-hidden rounded-full bg-washi-200"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-shu-500 transition-[width]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="kana-chart-title">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
              {text.chart.eyebrow}
            </p>
            <h2
              className="mt-2 text-3xl font-bold text-sumi-950"
              id="kana-chart-title"
            >
              {text.chart.title}
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div
              aria-label={text.chart.scriptLabel}
              className="inline-flex rounded-xl border border-washi-200 bg-white p-1"
              role="group"
            >
              {(["hiragana", "katakana"] as const).map((option) => (
                <button
                  aria-pressed={script === option}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    script === option
                      ? "bg-sumi-950 text-white"
                      : "text-sumi-600 hover:bg-washi-100"
                  }`}
                  key={option}
                  onClick={() => setScript(option)}
                  type="button"
                >
                  {text.chart[option]}
                </button>
              ))}
            </div>
            <div
              aria-label={text.chart.filterLabel}
              className="inline-flex rounded-xl border border-washi-200 bg-white p-1"
              role="group"
            >
              {(["all", "pending", "learned"] as const).map((option) => (
                <button
                  aria-pressed={filter === option}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    filter === option
                      ? "bg-shu-50 text-shu-700"
                      : "text-sumi-600 hover:bg-washi-100"
                  }`}
                  key={option}
                  onClick={() => setFilter(option)}
                  type="button"
                >
                  {text.chart.filters[option]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {feedback ? (
          <p
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            {feedback}
          </p>
        ) : null}

        {filteredCharacters.length ? (
          <div className="mt-8 space-y-12">
            {visibleCategories.map((category, categoryIndex) => (
                <section
                  aria-labelledby={category.id}
                  className={
                    categoryIndex
                      ? "border-t border-washi-200 pt-10"
                      : undefined
                  }
                  key={category.id}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3
                        className="text-2xl font-bold text-sumi-950"
                        id={category.id}
                      >
                        {category.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-sumi-600">
                        {category.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-sumi-500">
                      {text.chart.characterCount.replace(
                        "{count}",
                        String(category.characterCount),
                      )}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6">
                    {category.rows.map((row) => {
                      const rowLearned = row.allCharacters.every(
                        (character) => learnedKeys.has(character.key),
                      );

                      return (
                        <section
                          aria-labelledby={row.id}
                          className="rounded-2xl border border-washi-200 bg-washi-50/70 p-4 sm:p-5"
                          key={row.id}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h4
                                className="font-[var(--font-noto-sans-jp)] text-xl font-bold text-sumi-950"
                                id={row.id}
                              >
                                {row.allCharacters
                                  .map((character) => character.character)
                                  .join("・")}
                              </h4>
                            </div>
                            <button
                              aria-pressed={rowLearned}
                              className={`self-start rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 sm:self-auto ${
                                rowLearned
                                  ? "border border-shu-200 bg-white text-shu-700 hover:bg-shu-50"
                                  : "bg-shu-600 text-white hover:bg-shu-700"
                              } disabled:cursor-wait disabled:opacity-60`}
                              disabled={isPending}
                              onClick={() =>
                                toggleRowLearned(row.allCharacters)
                              }
                              type="button"
                            >
                              {rowLearned
                                ? text.chart.unmarkRow
                                : text.chart.markRowLearned}
                            </button>
                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {row.characters.map((character) => {
                              const learned = learnedKeys.has(character.key);
                              return (
                                <article
                                  className={`rounded-2xl border p-5 transition ${
                                    learned
                                      ? "border-shu-200 bg-shu-50/60"
                                      : "border-washi-200 bg-white"
                                  }`}
                                  key={character.key}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                      <span className="font-[var(--font-noto-sans-jp)] text-5xl font-bold leading-none text-sumi-950">
                                        {character.character}
                                      </span>
                                      <span className="rounded-full bg-washi-100 px-3 py-1 text-sm font-bold text-sumi-700">
                                        {character.romaji}
                                      </span>
                                    </div>
                                    <button
                                      aria-pressed={learned}
                                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 ${
                                        learned
                                          ? "bg-shu-600 text-white hover:bg-shu-700"
                                          : "border border-washi-300 text-sumi-700 hover:border-shu-300 hover:bg-shu-50"
                                      } disabled:cursor-wait disabled:opacity-60`}
                                      disabled={isPending}
                                      onClick={() => toggleLearned(character)}
                                      type="button"
                                    >
                                      {learned
                                        ? text.chart.learned
                                        : text.chart.markLearned}
                                    </button>
                                  </div>
                                  <div className="mt-5 border-t border-washi-200 pt-4">
                                    <p className="font-[var(--font-noto-sans-jp)] text-lg font-semibold text-sumi-950">
                                      {character.exampleWord}
                                    </p>
                                    <p className="mt-1 text-sm text-sumi-500">
                                      {character.exampleReading}
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-sumi-700">
                                      {character.exampleMeaning}
                                    </p>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </section>
              ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed border-washi-300 bg-white p-8 text-center text-sumi-600">
            {text.chart.empty}
          </p>
        )}
      </section>

      <section
        aria-labelledby="kana-combinations-title"
        className="mt-12 rounded-[2rem] border border-washi-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.combinations.eyebrow}
        </p>
        <h2
          className="mt-2 text-3xl font-bold text-sumi-950"
          id="kana-combinations-title"
        >
          {text.combinations.title}
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-sumi-600">
          {text.combinations.description}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {combinations.map((combination) => (
            <article
              className="rounded-xl border border-washi-200 bg-washi-50 p-4"
              key={combination.romaji}
            >
              <div className="flex items-center gap-3">
                <span className="font-[var(--font-noto-sans-jp)] text-2xl font-bold text-sumi-950">
                  {combination.hiragana}
                </span>
                <span className="font-[var(--font-noto-sans-jp)] text-2xl font-bold text-sumi-950">
                  {combination.katakana}
                </span>
                <span className="ml-auto text-sm font-bold text-shu-700">
                  {combination.romaji}
                </span>
              </div>
              <p className="mt-3 font-[var(--font-noto-sans-jp)] font-semibold text-sumi-900">
                {combination.example.word}
                <span className="ml-2 text-sm font-normal text-sumi-500">
                  {combination.example.reading}
                </span>
              </p>
              <p className="mt-1 text-sm text-sumi-600">
                {combination.example.meaning}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="kana-rules-title"
        className="mt-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.specialRules.eyebrow}
        </p>
        <h2
          className="mt-2 text-3xl font-bold text-sumi-950"
          id="kana-rules-title"
        >
          {text.specialRules.title}
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              characters: "っ・ッ",
              example: "きって · キット",
              title: text.specialRules.sokuonTitle,
              description: text.specialRules.sokuonDescription,
            },
            {
              characters: "ー",
              example: "ケーキ · コーヒー",
              title: text.specialRules.longVowelTitle,
              description: text.specialRules.longVowelDescription,
            },
            {
              characters: "は・へ・を",
              example: "わ · え · お",
              title: text.specialRules.particlesTitle,
              description: text.specialRules.particlesDescription,
            },
          ].map((rule) => (
            <article
              className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm"
              key={rule.title}
            >
              <span className="font-[var(--font-noto-sans-jp)] text-4xl font-bold text-sumi-950">
                {rule.characters}
              </span>
              <h3 className="mt-4 text-lg font-bold text-sumi-950">
                {rule.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-shu-700">
                {rule.example}
              </p>
              <p className="mt-3 text-sm leading-6 text-sumi-600">
                {rule.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
