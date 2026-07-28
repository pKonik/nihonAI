import type { Locale } from "@/lib/i18n/config";

export type KanaScript = "hiragana" | "katakana";

export type KanaSoundRow =
  | "vowels"
  | "k"
  | "s"
  | "t"
  | "n"
  | "h"
  | "m"
  | "y"
  | "r"
  | "w"
  | "g"
  | "z"
  | "d"
  | "b"
  | "p";

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
  soundRow: KanaSoundRow;
};

export type KanaMutationResult = {
  error?: string;
  learned?: boolean;
  ok: boolean;
};

export type KanaQuizStats = {
  activeDays: number;
  correctAnswers: number;
  currentStreak: number;
  totalAnswers: number;
};

export type KanaQuizPerformance = {
  characterKey: string;
  correctAnswers: number;
  totalAnswers: number;
};

export type KanaQuizScope =
  | "learned"
  | "category"
  | "row"
  | "all"
  | "mistakes";

export type KanaQuizAnswerResult = {
  correct?: boolean;
  error?: string;
  expectedAnswer?: string;
  ok: boolean;
  stats?: KanaQuizStats;
};
