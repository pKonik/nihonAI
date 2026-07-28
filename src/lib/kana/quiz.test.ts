import assert from "node:assert/strict";
import test from "node:test";

import { getKanaCharacters } from "./catalog.ts";
import {
  createAdaptiveKanaQuiz,
  getKanaQuizCandidates,
} from "./quiz.ts";

const characters = getKanaCharacters("hiragana", "es");

test("quiz scopes select learned, category, row, and mistaken kana", () => {
  const common = {
    category: "dakuten" as const,
    characters,
    learnedKeys: new Set(["hiragana:a", "hiragana:ka"]),
    performance: [
      {
        characterKey: "hiragana:shi",
        correctAnswers: 1,
        totalAnswers: 3,
      },
      {
        characterKey: "hiragana:su",
        correctAnswers: 2,
        totalAnswers: 2,
      },
      {
        characterKey: "hiragana:ta",
        correctAnswers: 4,
        totalAnswers: 5,
      },
    ],
    row: "k" as const,
  };

  assert.deepEqual(
    getKanaQuizCandidates({ ...common, scope: "learned" }).map(
      (item) => item.key,
    ),
    ["hiragana:a", "hiragana:ka"],
  );
  assert.equal(
    getKanaQuizCandidates({ ...common, scope: "category" }).length,
    20,
  );
  assert.equal(
    getKanaQuizCandidates({ ...common, scope: "row" }).length,
    5,
  );
  assert.deepEqual(
    getKanaQuizCandidates({ ...common, scope: "mistakes" }).map(
      (item) => item.key,
    ),
    ["hiragana:shi"],
  );
});

test("adaptive quiz creates a unique session limited to available kana", () => {
  const quiz = createAdaptiveKanaQuiz({
    category: "basic",
    characters: characters.slice(0, 4),
    learnedKeys: new Set(),
    performance: [],
    random: () => 0,
    row: "vowels",
    scope: "all",
    size: 10,
  });

  assert.equal(quiz.length, 4);
  assert.equal(new Set(quiz.map((item) => item.key)).size, 4);
});
