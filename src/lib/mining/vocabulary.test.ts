import assert from "node:assert/strict";
import test from "node:test";

import {
  createMinedVocabularyDraft,
  toVocabularyWordType,
} from "./vocabulary.ts";

test("convierte las categorías de JMdict al dominio de vocabulario", () => {
  assert.equal(toVocabularyWordType(["n"]), "Sustantivo");
  assert.equal(toVocabularyWordType(["v5r"]), "Verbo");
  assert.equal(toVocabularyWordType(["adj-i"]), "Adjetivo");
  assert.equal(toVocabularyWordType(["adv"]), "Adverbio");
  assert.equal(toVocabularyWordType(["exp"]), "Expresión");
  assert.equal(toVocabularyWordType(["prt"]), "Otro");
});

test("prepara únicamente los datos textuales confirmados para guardar", () => {
  const draft = createMinedVocabularyDraft({
    entry: {
      c: false,
      e: ["to read"],
      i: "entry-1",
      p: ["v5m"],
      r: "よむ",
      s: ["leer"],
      w: "読む",
    },
    meaning: "leer",
    meaningLanguage: "es",
    sentence: " 本を読む。 ",
  });

  assert.deepEqual(draft, {
    word: "読む",
    reading: "よむ",
    meaning: "leer",
    meaningLanguage: "es",
    partOfSpeech: "Verbo",
    jlptLevel: "Sin clasificar",
    example: "本を読む。",
    source: "Manga",
  });
  assert.equal("image" in draft, false);
});
