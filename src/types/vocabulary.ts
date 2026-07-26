export const WORD_TYPES = [
  "Sustantivo",
  "Verbo",
  "Adjetivo",
  "Adverbio",
  "Expresión",
  "Otro",
] as const;

export const JLPT_LEVELS = [
  "N5",
  "N4",
  "N3",
  "N2",
  "N1",
  "Sin clasificar",
] as const;

export type WordType = (typeof WORD_TYPES)[number];
export type JlptLevel = (typeof JLPT_LEVELS)[number];

export type VocabularyDraft = {
  word: string;
  reading: string;
  meaning: string;
  partOfSpeech: WordType;
  jlptLevel: JlptLevel;
  example: string;
  source: string;
};

export type VocabularyEntry = VocabularyDraft & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type VocabularyResult<Data> =
  | { ok: true; data: Data }
  | { ok: false; error: string };
