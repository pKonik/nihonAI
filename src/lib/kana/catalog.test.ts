import assert from "node:assert/strict";
import test from "node:test";

import {
  getKanaCharacters,
  isKanaKey,
  KANA_COMBINATIONS,
  KANA_ROWS,
  KANA_SOUND_ROW_ORDER,
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

test("the teaching chart separates every standard consonant row", () => {
  const characters = getKanaCharacters("hiragana", "es");
  const rowSizes = new Map(
    KANA_SOUND_ROW_ORDER.map((soundRow) => [
      soundRow,
      characters.filter((character) => character.soundRow === soundRow)
        .length,
    ]),
  );

  assert.deepEqual(Object.fromEntries(rowSizes), {
    vowels: 5,
    k: 5,
    s: 5,
    t: 5,
    n: 5,
    h: 5,
    m: 5,
    y: 3,
    r: 5,
    w: 3,
    g: 5,
    z: 5,
    d: 5,
    b: 5,
    p: 5,
  });
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
