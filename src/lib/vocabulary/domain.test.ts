import assert from "node:assert/strict";
import test from "node:test";

import {
  parseVocabularyDraft,
  parseVocabularyId,
} from "./validation.ts";
import {
  toVocabularyEntry,
  toVocabularyWrite,
  type VocabularyRow,
} from "./mapper.ts";
import {
  safeVocabularyMutationError,
  VocabularyAuthenticationError,
  VocabularyNotFoundError,
} from "./errors.ts";
import {
  insertVocabularyEntry,
  removeVocabularyEntry,
  replaceVocabularyEntry,
} from "./collection.ts";

const validDraft = {
  word: " 勉強 ",
  reading: " べんきょう ",
  meaning: " estudio ",
  meaningLanguage: "es",
  partOfSpeech: "Sustantivo",
  jlptLevel: "N5",
  example: " 毎日、日本語を勉強します。 ",
  source: " clase ",
};

test("normaliza una entrada válida", () => {
  const result = parseVocabularyDraft(validDraft);

  assert.deepEqual(result, {
    success: true,
    data: {
      word: "勉強",
      reading: "べんきょう",
      meaning: "estudio",
      meaningLanguage: "es",
      partOfSpeech: "Sustantivo",
      jlptLevel: "N5",
      example: "毎日、日本語を勉強します。",
      source: "clase",
    },
  });
});

test("rechaza campos obligatorios vacíos", () => {
  const result = parseVocabularyDraft({ ...validDraft, word: " " });

  assert.deepEqual(result, {
    success: false,
    error: "requiredFields",
  });
});

test("rechaza enumeraciones manipuladas", () => {
  assert.deepEqual(
    parseVocabularyDraft({
      ...validDraft,
      partOfSpeech: "Administrador",
    }),
    {
      success: false,
      error: "invalidEnums",
    },
  );
  assert.deepEqual(
    parseVocabularyDraft({
      ...validDraft,
      meaningLanguage: "jp",
    }),
    {
      success: false,
      error: "invalidEnums",
    },
  );
});

test("rechaza datos no estructurados", () => {
  assert.deepEqual(parseVocabularyDraft(null), {
    success: false,
    error: "invalidData",
  });
});

test("rechaza textos que superan los límites", () => {
  const result = parseVocabularyDraft({
    ...validDraft,
    source: "x".repeat(201),
  });

  assert.deepEqual(result, {
    success: false,
    error: "fieldTooLong",
  });
});

test("acepta solo identificadores UUID", () => {
  assert.equal(
    parseVocabularyId("550e8400-e29b-41d4-a716-446655440000"),
    "550e8400-e29b-41d4-a716-446655440000",
  );
  assert.equal(parseVocabularyId("vocabulary-1"), null);
});

test("mapea una fila sin exponer user_id", () => {
  const row: VocabularyRow = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    word: "勉強",
    reading: "べんきょう",
    meaning: "estudio",
    meaning_language: "es",
    part_of_speech: "Sustantivo",
    jlpt_level: "N5",
    example: null,
    source: null,
    created_at: "2026-07-26T12:00:00.000Z",
    updated_at: "2026-07-26T12:00:00.000Z",
  };

  assert.deepEqual(toVocabularyEntry(row), {
    id: row.id,
    word: "勉強",
    reading: "べんきょう",
    meaning: "estudio",
    meaningLanguage: "es",
    partOfSpeech: "Sustantivo",
    jlptLevel: "N5",
    example: "",
    source: "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
});

test("convierte campos opcionales vacíos a null", () => {
  const parsed = parseVocabularyDraft({
    ...validDraft,
    example: " ",
    source: " ",
  });
  assert.equal(parsed.success, true);
  if (!parsed.success) return;

  assert.deepEqual(toVocabularyWrite(parsed.data), {
    word: "勉強",
    reading: "べんきょう",
    meaning: "estudio",
    meaning_language: "es",
    part_of_speech: "Sustantivo",
    jlpt_level: "N5",
    example: null,
    source: null,
  });
});

test("convierte errores del servidor en mensajes seguros", () => {
  assert.equal(
    safeVocabularyMutationError(new VocabularyAuthenticationError()),
    "authExpired",
  );
  assert.equal(
    safeVocabularyMutationError(new VocabularyNotFoundError()),
    "notFound",
  );
  assert.equal(
    safeVocabularyMutationError(new Error("database connection string")),
    "operationFailed",
  );
});

test("actualiza la colección solo con entradas confirmadas", () => {
  const first = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    word: "猫",
    reading: "ねこ",
    meaning: "gato",
    meaningLanguage: "es" as const,
    partOfSpeech: "Sustantivo" as const,
    jlptLevel: "N5" as const,
    example: "",
    source: "",
    createdAt: "2026-07-26T12:00:00.000Z",
    updatedAt: "2026-07-26T12:00:00.000Z",
  };
  const second = {
    ...first,
    id: "b604d0b5-b08c-4b3e-a430-ffbf3eb54e75",
    word: "犬",
    reading: "いぬ",
    meaning: "perro",
  };
  const editedFirst = {
    ...first,
    meaning: "felino doméstico",
    updatedAt: "2026-07-26T13:00:00.000Z",
  };

  assert.deepEqual(insertVocabularyEntry([first], second), [
    second,
    first,
  ]);
  assert.deepEqual(replaceVocabularyEntry([first, second], editedFirst), [
    editedFirst,
    second,
  ]);
  assert.deepEqual(removeVocabularyEntry([first, second], first.id), [
    second,
  ]);
});
