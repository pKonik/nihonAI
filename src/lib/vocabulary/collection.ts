import type { VocabularyEntry } from "../../types/vocabulary.ts";

export function insertVocabularyEntry(
  entries: VocabularyEntry[],
  entry: VocabularyEntry,
): VocabularyEntry[] {
  return [entry, ...entries];
}

export function replaceVocabularyEntry(
  entries: VocabularyEntry[],
  updatedEntry: VocabularyEntry,
): VocabularyEntry[] {
  return entries.map((entry) =>
    entry.id === updatedEntry.id ? updatedEntry : entry,
  );
}

export function removeVocabularyEntry(
  entries: VocabularyEntry[],
  id: string,
): VocabularyEntry[] {
  return entries.filter((entry) => entry.id !== id);
}
