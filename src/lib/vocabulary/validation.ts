import {
  JLPT_LEVELS,
  MEANING_LANGUAGES,
  WORD_TYPES,
  type JlptLevel,
  type MeaningLanguage,
  type VocabularyDraft,
  type WordType,
} from "../../types/vocabulary.ts";

export const VOCABULARY_FIELD_LIMITS = {
  word: 120,
  reading: 120,
  meaning: 500,
  example: 2_000,
  source: 200,
} as const;

type ValidationResult =
  | { success: true; data: VocabularyDraft }
  | { success: false; error: VocabularyValidationErrorCode };

export type VocabularyValidationErrorCode =
  | "invalidData"
  | "requiredFields"
  | "invalidEnums"
  | "fieldTooLong";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isWordType(value: string): value is WordType {
  return WORD_TYPES.some((wordType) => wordType === value);
}

function isJlptLevel(value: string): value is JlptLevel {
  return JLPT_LEVELS.some((level) => level === value);
}

function isMeaningLanguage(value: string): value is MeaningLanguage {
  return MEANING_LANGUAGES.some((language) => language === value);
}

export function parseVocabularyDraft(value: unknown): ValidationResult {
  if (!isRecord(value)) {
    return {
      success: false,
      error: "invalidData",
    };
  }

  const word = readText(value.word);
  const reading = readText(value.reading);
  const meaning = readText(value.meaning);
  const meaningLanguage = readText(value.meaningLanguage);
  const partOfSpeech = readText(value.partOfSpeech);
  const jlptLevel = readText(value.jlptLevel);
  const example = readText(value.example);
  const source = readText(value.source);

  if (!word || !reading || !meaning) {
    return {
      success: false,
      error: "requiredFields",
    };
  }

  if (
    !isMeaningLanguage(meaningLanguage) ||
    !isWordType(partOfSpeech) ||
    !isJlptLevel(jlptLevel)
  ) {
    return {
      success: false,
      error: "invalidEnums",
    };
  }

  if (
    word.length > VOCABULARY_FIELD_LIMITS.word ||
    reading.length > VOCABULARY_FIELD_LIMITS.reading ||
    meaning.length > VOCABULARY_FIELD_LIMITS.meaning ||
    example.length > VOCABULARY_FIELD_LIMITS.example ||
    source.length > VOCABULARY_FIELD_LIMITS.source
  ) {
    return {
      success: false,
      error: "fieldTooLong",
    };
  }

  return {
    success: true,
    data: {
      word,
      reading,
      meaning,
      meaningLanguage,
      partOfSpeech,
      jlptLevel,
      example,
      source,
    },
  };
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parseVocabularyId(value: unknown): string | null {
  return typeof value === "string" && UUID_PATTERN.test(value)
    ? value
    : null;
}
