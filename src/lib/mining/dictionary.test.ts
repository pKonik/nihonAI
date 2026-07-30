import assert from "node:assert/strict";
import test from "node:test";

import {
  getJmdictShard,
  localizeDictionaryEntry,
  type DictionaryEntry,
} from "./dictionary.ts";

const entry: DictionaryEntry = {
  c: true,
  e: ["to eat"],
  i: "1358280",
  p: ["v1", "vt"],
  r: "たべる",
  s: ["comer"],
  w: "食べる",
};

test("calcula un fragmento estable dentro del índice JMdict", () => {
  assert.equal(getJmdictShard("食べる"), "79a");
  assert.match(getJmdictShard("読む"), /^[0-7][0-9a-f]{2}$/);
});

test("prioriza español y marca explícitamente el fallback inglés", () => {
  assert.deepEqual(localizeDictionaryEntry(entry, "es"), {
    entry,
    fallbackToEnglish: false,
    meanings: ["comer"],
  });

  const englishOnly = { ...entry, s: [] };
  assert.deepEqual(localizeDictionaryEntry(englishOnly, "es"), {
    entry: englishOnly,
    fallbackToEnglish: true,
    meanings: ["to eat"],
  });
});
