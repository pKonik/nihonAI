import assert from "node:assert/strict";
import test from "node:test";

import { calculateKanaQuizStats } from "./stats.ts";

test("quiz stats count unique active days and a streak through today", () => {
  assert.deepEqual(
    calculateKanaQuizStats(
      8,
      6,
      ["2026-07-26", "2026-07-27", "2026-07-27", "2026-07-28"],
      "2026-07-28",
    ),
    {
      activeDays: 3,
      correctAnswers: 6,
      currentStreak: 3,
      totalAnswers: 8,
    },
  );
});

test("a streak remains active when the latest study day was yesterday", () => {
  const stats = calculateKanaQuizStats(
    2,
    1,
    ["2026-07-26", "2026-07-27"],
    "2026-07-28",
  );

  assert.equal(stats.currentStreak, 2);
});

test("an interrupted streak returns zero", () => {
  const stats = calculateKanaQuizStats(
    1,
    1,
    ["2026-07-25"],
    "2026-07-28",
  );

  assert.equal(stats.currentStreak, 0);
});
