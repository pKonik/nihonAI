import type {
  JlptLevel,
  MeaningLanguage,
  VocabularyDraft,
  VocabularyEntry,
  WordType,
} from "../../types/vocabulary.ts";

export type VocabularyRow = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  meaning_language: MeaningLanguage;
  part_of_speech: WordType;
  jlpt_level: JlptLevel;
  example: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type VocabularyWrite = {
  word: string;
  reading: string;
  meaning: string;
  meaning_language: MeaningLanguage;
  part_of_speech: WordType;
  jlpt_level: JlptLevel;
  example: string | null;
  source: string | null;
};

export function toVocabularyEntry(
  row: VocabularyRow,
): VocabularyEntry {
  return {
    id: row.id,
    word: row.word,
    reading: row.reading,
    meaning: row.meaning,
    meaningLanguage: row.meaning_language,
    partOfSpeech: row.part_of_speech,
    jlptLevel: row.jlpt_level,
    example: row.example ?? "",
    source: row.source ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toVocabularyWrite(
  draft: VocabularyDraft,
): VocabularyWrite {
  return {
    word: draft.word,
    reading: draft.reading,
    meaning: draft.meaning,
    meaning_language: draft.meaningLanguage,
    part_of_speech: draft.partOfSpeech,
    jlpt_level: draft.jlptLevel,
    example: draft.example || null,
    source: draft.source || null,
  };
}
