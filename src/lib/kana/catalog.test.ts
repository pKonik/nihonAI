import assert from "node:assert/strict";
import test from "node:test";

import {
  getKanaCharacters,
  isKanaKey,
  KANA_COMBINATIONS,
  KANA_ROWS,
} from "./catalog.ts";

test("the catalog contains the 46 basic and 25 modified kana sounds", () => {
  assert.equal(KANA_ROWS.length, 71);
  assert.equal(new Set(KANA_ROWS.map((row) => row.id)).size, 71);
});

test("each script exposes one unique progress key per sound", () => {
  const characters = [
    ...getKanaCharacters("hiragana", "es"),
    ...getKanaCharacters("katakana", "en"),
  ];

  assert.equal(characters.length, 142);
  assert.equal(
    new Set(characters.map((character) => character.key)).size,
    142,
  );
  assert.ok(characters.every((character) => isKanaKey(character.key)));
});

test("invalid progress keys are rejected", () => {
  assert.equal(isKanaKey("hiragana:a"), true);
  assert.equal(isKanaKey("katakana:n"), true);
  assert.equal(isKanaKey("hiragana:unknown"), false);
  assert.equal(isKanaKey({ key: "hiragana:a" }), false);
});

test("the combinations include readings and localized examples", () => {
  assert.equal(KANA_COMBINATIONS.length, 33);
  assert.ok(
    KANA_COMBINATIONS.every(
      (item) =>
        item.hiragana &&
        item.katakana &&
        item.romaji &&
        item.example.meaning.es &&
        item.example.meaning.en,
    ),
  );
});
