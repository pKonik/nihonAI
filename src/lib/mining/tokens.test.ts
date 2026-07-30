import assert from "node:assert/strict";
import test from "node:test";

import {
  groupMiningTokens,
  type MorphologicalToken,
} from "./tokens.ts";

function token(
  surface: string,
  dictionaryForm: string,
  partOfSpeech: string,
  partOfSpeechDetail: string,
): MorphologicalToken {
  return {
    dictionaryForm,
    partOfSpeech,
    partOfSpeechDetail,
    reading: surface,
    searchable: partOfSpeech !== "記号",
    surface,
  };
}

test("agrupa una forma verbal con sus auxiliares sin absorber la partícula final", () => {
  const grouped = groupMiningTokens([
    token("聞い", "聞く", "動詞", "自立"),
    token("て", "てる", "動詞", "非自立"),
    token("なかっ", "ない", "助動詞", "*"),
    token("た", "た", "助動詞", "*"),
    token("わ", "わ", "助詞", "終助詞"),
  ]);

  assert.deepEqual(
    grouped.map(({ surface, dictionaryForm }) => ({
      surface,
      dictionaryForm,
    })),
    [
      { surface: "聞いてなかった", dictionaryForm: "聞く" },
      { surface: "わ", dictionaryForm: "わ" },
    ],
  );
});

test("conserva juntas las flexiones negativas y pasadas de adjetivos", () => {
  const [grouped] = groupMiningTokens([
    token("高く", "高い", "形容詞", "自立"),
    token("なかっ", "ない", "助動詞", "*"),
    token("た", "た", "助動詞", "*"),
  ]);

  assert.equal(grouped.surface, "高くなかった");
  assert.equal(grouped.dictionaryForm, "高い");
});

test("une un sustantivo verbal con suru y su cadena auxiliar", () => {
  const [grouped] = groupMiningTokens([
    token("勉強", "勉強", "名詞", "サ変接続"),
    token("し", "する", "動詞", "自立"),
    token("て", "て", "助詞", "接続助詞"),
    token("いる", "いる", "動詞", "非自立"),
  ]);

  assert.equal(grouped.surface, "勉強している");
  assert.equal(grouped.dictionaryForm, "勉強する");
});
