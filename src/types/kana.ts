import type { Locale } from "@/lib/i18n/config";

export type KanaScript = "hiragana" | "katakana";

export type KanaExample = {
  meaning: Record<Locale, string>;
  reading: string;
  word: string;
};

export type KanaRow = {
  group: string;
  hiragana: string;
  hiraganaExample: KanaExample;
  id: string;
  katakana: string;
  katakanaExample: KanaExample;
  romaji: string;
};

export type KanaCombination = {
  example: KanaExample;
  hiragana: string;
  katakana: string;
  romaji: string;
};

export type KanaCharacter = {
  character: string;
  exampleMeaning: string;
  exampleReading: string;
  exampleWord: string;
  group: string;
  key: string;
  romaji: string;
  script: KanaScript;
};

export type KanaMutationResult = {
  error?: string;
  learned?: boolean;
  ok: boolean;
};
