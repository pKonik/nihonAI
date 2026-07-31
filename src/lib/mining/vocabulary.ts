import type { DictionaryEntry } from "./dictionary.ts";
import type {
  MeaningLanguage,
  VocabularyDraft,
  WordType,
} from "../../types/vocabulary.ts";

export function toVocabularyWordType(
  parts: readonly string[],
): WordType {
  if (parts.some((part) => part === "n" || part.startsWith("n-"))) {
    return "Sustantivo";
  }
  if (parts.some((part) => part.startsWith("v"))) return "Verbo";
  if (parts.some((part) => part.startsWith("adj"))) return "Adjetivo";
  if (parts.some((part) => part.startsWith("adv"))) return "Adverbio";
  if (parts.includes("exp")) return "Expresión";
  return "Otro";
}

export function createMinedVocabularyDraft({
  entry,
  meaning,
  meaningLanguage,
  sentence,
}: {
  entry: DictionaryEntry;
  meaning: string;
  meaningLanguage: MeaningLanguage;
  sentence: string;
}): VocabularyDraft {
  return {
    word: entry.w,
    reading: entry.r,
    meaning,
    meaningLanguage,
    partOfSpeech: toVocabularyWordType(entry.p),
    jlptLevel: "Sin clasificar",
    example: sentence.trim(),
    source: "Manga",
  };
}
