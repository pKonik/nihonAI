"use client";

import type { IpadicFeatures, Tokenizer } from "kuromoji";

import {
  getJmdictShard,
  JMDICT_SHARD_COUNT,
  type DictionaryEntry,
} from "@/lib/mining/dictionary";
import {
  groupMiningTokens,
  type MiningToken,
  type MorphologicalToken,
} from "@/lib/mining/tokens";

const KUROMOJI_DICTIONARY_PATH = "/vendor/kuromoji/0.1.2/";
const JMDICT_ROOT = "/dictionaries/jmdict";
const MAX_SENTENCE_LENGTH = 500;
const TOKENIZER_IDLE_MS = 2 * 60 * 1000;

export type { MiningToken } from "@/lib/mining/tokens";

type JmdictManifest = {
  compression: "br";
  date: string;
  extension: ".json.br";
  shards: number;
};

type JmdictShard = Record<string, readonly DictionaryEntry[]>;

let tokenizerPromise: Promise<Tokenizer<IpadicFeatures>> | null = null;
let tokenizerIdleTimer: ReturnType<typeof setTimeout> | null = null;
let manifestPromise: Promise<JmdictManifest> | null = null;
const shardCache = new Map<string, Promise<JmdictShard>>();

function katakanaToHiragana(value: string): string {
  return value.replace(/[\u30a1-\u30f6]/g, (character) =>
    String.fromCharCode(character.charCodeAt(0) - 0x60),
  );
}

function isJapanese(value: string): boolean {
  return /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(
    value,
  );
}

async function getTokenizer(): Promise<Tokenizer<IpadicFeatures>> {
  if (tokenizerIdleTimer) {
    clearTimeout(tokenizerIdleTimer);
    tokenizerIdleTimer = null;
  }

  if (!tokenizerPromise) {
    tokenizerPromise = import("kuromoji")
      .then(
        (kuromoji) =>
          new Promise<Tokenizer<IpadicFeatures>>((resolve, reject) => {
            kuromoji
              .builder({ dicPath: KUROMOJI_DICTIONARY_PATH })
              .build((error, tokenizer) => {
                if (error) {
                  reject(error);
                  return;
                }

                resolve(tokenizer);
              });
          }),
      )
      .catch((error: unknown) => {
        tokenizerPromise = null;
        throw error;
      });
  }

  return tokenizerPromise;
}

function scheduleTokenizerRelease(): void {
  if (tokenizerIdleTimer) clearTimeout(tokenizerIdleTimer);

  tokenizerIdleTimer = setTimeout(() => {
    tokenizerPromise = null;
    tokenizerIdleTimer = null;
  }, TOKENIZER_IDLE_MS);
}

async function getManifest(): Promise<JmdictManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(`${JMDICT_ROOT}/manifest.json`).then(
      async (response) => {
        if (!response.ok) {
          throw new Error("JMdict manifest unavailable.");
        }

        const manifest = (await response.json()) as Partial<JmdictManifest>;
        if (
          typeof manifest.date !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(manifest.date) ||
          manifest.compression !== "br" ||
          manifest.extension !== ".json.br" ||
          manifest.shards !== JMDICT_SHARD_COUNT
        ) {
          throw new Error("Invalid JMdict manifest.");
        }

        return {
          compression: manifest.compression,
          date: manifest.date,
          extension: manifest.extension,
          shards: manifest.shards,
        };
      },
    );
  }

  return manifestPromise;
}

async function loadShard(term: string): Promise<JmdictShard> {
  const manifest = await getManifest();
  const shardName = getJmdictShard(term);
  const cacheKey = `${manifest.date}/${shardName}`;
  let shard = shardCache.get(cacheKey);

  if (!shard) {
    shard = fetch(
      `${JMDICT_ROOT}/${manifest.date}/${shardName}${manifest.extension}`,
      { cache: "force-cache" },
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error("JMdict shard unavailable.");
      }

      return (await response.json()) as JmdictShard;
    });
    shardCache.set(cacheKey, shard);
  }

  return shard;
}

export async function analyzeJapaneseText(
  sentence: string,
): Promise<readonly MiningToken[]> {
  const normalized = sentence.normalize("NFC");
  if (
    normalized.trim().length === 0 ||
    normalized.length > MAX_SENTENCE_LENGTH
  ) {
    throw new Error("Invalid sentence.");
  }

  const tokenizer = await getTokenizer();
  let analyzed: IpadicFeatures[];
  try {
    analyzed = tokenizer.tokenize(normalized);
  } finally {
    scheduleTokenizerRelease();
  }
  const tokens: MorphologicalToken[] = [];
  let cursor = 0;

  for (const token of analyzed) {
    const start = Math.max(cursor, token.word_position - 1);
    if (start > cursor) {
      const gap = normalized.slice(cursor, start);
      tokens.push({
        dictionaryForm: gap,
        partOfSpeech: "",
        partOfSpeechDetail: "",
        reading: "",
        searchable: false,
        surface: gap,
      });
    }

    const dictionaryForm =
      token.basic_form && token.basic_form !== "*"
        ? token.basic_form
        : token.surface_form;
    tokens.push({
      dictionaryForm,
      partOfSpeech: token.pos,
      partOfSpeechDetail: token.pos_detail_1,
      reading: token.reading
        ? katakanaToHiragana(token.reading)
        : "",
      searchable: isJapanese(token.surface_form),
      surface: token.surface_form,
    });
    cursor = start + token.surface_form.length;
  }

  if (cursor < normalized.length) {
    const gap = normalized.slice(cursor);
    tokens.push({
      dictionaryForm: gap,
      partOfSpeech: "",
      partOfSpeechDetail: "",
      reading: "",
      searchable: false,
      surface: gap,
    });
  }

  return groupMiningTokens(tokens);
}

export async function lookupMiningToken(
  token: MiningToken,
): Promise<readonly DictionaryEntry[]> {
  const terms = [
    token.dictionaryForm,
    token.surface,
    token.reading,
  ].filter(
    (term, index, all) =>
      term.length > 0 && all.indexOf(term) === index,
  );

  for (const term of terms) {
    const shard = await loadShard(term);
    const matches = shard[term];
    if (matches?.length) {
      return matches;
    }
  }

  return [];
}
