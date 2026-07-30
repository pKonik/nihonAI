import {
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  brotliCompressSync,
  constants as zlibConstants,
} from "node:zlib";

const SHARD_COUNT = 2048;
const SHARD_EXTENSION = ".json.br";
const MAX_ENTRIES_PER_TERM = 8;
const MAX_GLOSSES_PER_LANGUAGE = 8;

function shardForTerm(term) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < term.length; index += 1) {
    hash ^= term.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0) & (SHARD_COUNT - 1);
}

function unique(values) {
  return [...new Set(values)];
}

function appliesToTerm(sense, term, kind) {
  const restrictions =
    kind === "kanji" ? sense.appliesToKanji : sense.appliesToKana;

  return restrictions.includes("*") || restrictions.includes(term);
}

function preferredReading(word, term, kind) {
  if (kind === "kana") {
    return term;
  }

  return (
    word.kana.find(
      (reading) =>
        reading.common &&
        (reading.appliesToKanji.includes("*") ||
          reading.appliesToKanji.includes(term)),
    ) ??
    word.kana.find(
      (reading) =>
        reading.appliesToKanji.includes("*") ||
        reading.appliesToKanji.includes(term),
    ) ??
    word.kana[0]
  )?.text;
}

function compactEntry(word, term, kind) {
  const applicableSenses = word.sense.filter((sense) =>
    appliesToTerm(sense, term, kind),
  );
  const english = [];
  const spanish = [];

  for (const sense of applicableSenses) {
    for (const gloss of sense.gloss) {
      if (gloss.lang === "eng") english.push(gloss.text);
      if (gloss.lang === "spa") spanish.push(gloss.text);
    }
  }

  if (english.length === 0) {
    return null;
  }

  const primaryKanji =
    word.kanji.find((form) => form.common)?.text ?? word.kanji[0]?.text;
  const primaryKana =
    word.kana.find((form) => form.common)?.text ?? word.kana[0]?.text;
  const termIsCommon =
    (kind === "kanji" ? word.kanji : word.kana).find(
      (form) => form.text === term,
    )?.common ?? false;

  return {
    c: termIsCommon,
    e: unique(english).slice(0, MAX_GLOSSES_PER_LANGUAGE),
    i: word.id,
    p: unique(applicableSenses.flatMap((sense) => sense.partOfSpeech)),
    r: preferredReading(word, term, kind) ?? primaryKana ?? term,
    s: unique(spanish).slice(0, MAX_GLOSSES_PER_LANGUAGE),
    w: primaryKanji ?? primaryKana ?? term,
  };
}

function compareEntries(left, right) {
  if (left.c !== right.c) {
    return left.c ? -1 : 1;
  }

  return Number(left.i) - Number(right.i);
}

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error(
    "Uso: node scripts/build-jmdict.mjs <ruta-al-jmdict-all.json>",
  );
}

const source = JSON.parse(await readFile(inputPath, "utf8"));
if (
  typeof source.dictDate !== "string" ||
  !/^\d{4}-\d{2}-\d{2}$/.test(source.dictDate) ||
  typeof source.version !== "string" ||
  !Array.isArray(source.words)
) {
  throw new Error("El archivo no tiene el formato esperado de jmdict-simplified.");
}

const shards = Array.from({ length: SHARD_COUNT }, () => new Map());

for (const word of source.words) {
  const terms = [
    ...word.kanji.map((form) => ({ kind: "kanji", term: form.text })),
    ...word.kana.map((form) => ({ kind: "kana", term: form.text })),
  ];

  for (const { kind, term } of terms) {
    const entry = compactEntry(word, term, kind);
    if (!entry) continue;

    const shard = shards[shardForTerm(term)];
    const entries = shard.get(term) ?? [];
    entries.push(entry);
    shard.set(term, entries);
  }
}

const dictionaryRoot = path.resolve("public", "dictionaries", "jmdict");
const outputRoot = path.join(dictionaryRoot, source.dictDate);
const stagingRoot = path.join(
  dictionaryRoot,
  `${source.dictDate}-${SHARD_COUNT}-staging`,
);
await rm(stagingRoot, { recursive: true, force: true });
await mkdir(stagingRoot, { recursive: true });

let entryCount = 0;
let termCount = 0;

for (const [index, shard] of shards.entries()) {
  const serialized = {};

  for (const term of [...shard.keys()].sort()) {
    const entries = shard
      .get(term)
      .sort(compareEntries)
      .slice(0, MAX_ENTRIES_PER_TERM);
    serialized[term] = entries;
    entryCount += entries.length;
    termCount += 1;
  }

  const name = index.toString(16).padStart(3, "0");
  const compressed = brotliCompressSync(
    Buffer.from(JSON.stringify(serialized)),
    {
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
  );
  await writeFile(path.join(stagingRoot, `${name}${SHARD_EXTENSION}`), compressed);
}

await rm(outputRoot, { recursive: true, force: true });
await rename(stagingRoot, outputRoot);

await writeFile(
  path.resolve("public", "dictionaries", "jmdict", "manifest.json"),
  JSON.stringify(
    {
      attribution:
        "JMdict/EDICT Project, Electronic Dictionary Research and Development Group",
      compression: "br",
      date: source.dictDate,
      entries: entryCount,
      extension: SHARD_EXTENSION,
      license: "CC BY-SA 4.0",
      licenseUrl: "https://www.edrdg.org/edrdg/licence.html",
      shards: SHARD_COUNT,
      sourceVersion: source.version,
      terms: termCount,
    },
    null,
    2,
  ),
);

console.log(
  `JMdict ${source.dictDate}: ${termCount} términos y ${entryCount} referencias en ${SHARD_COUNT} fragmentos.`,
);
