import type { Locale } from "@/lib/i18n/config";

export const JMDICT_SHARD_COUNT = 2048;

export type DictionaryEntry = {
  c: boolean;
  e: readonly string[];
  i: string;
  p: readonly string[];
  r: string;
  s: readonly string[];
  w: string;
};

export type DictionaryResult = {
  entry: DictionaryEntry;
  fallbackToEnglish: boolean;
  meanings: readonly string[];
};

export function getJmdictShard(term: string): string {
  let hash = 0x811c9dc5;

  for (let index = 0; index < term.length; index += 1) {
    hash ^= term.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return ((hash >>> 0) & (JMDICT_SHARD_COUNT - 1))
    .toString(16)
    .padStart(3, "0");
}

export function localizeDictionaryEntry(
  entry: DictionaryEntry,
  locale: Locale,
): DictionaryResult {
  const hasSpanish = entry.s.length > 0;
  const useSpanish = locale === "es" && hasSpanish;

  return {
    entry,
    fallbackToEnglish: locale === "es" && !hasSpanish,
    meanings: useSpanish ? entry.s : entry.e,
  };
}
