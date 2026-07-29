import assert from "node:assert/strict";
import test from "node:test";

import {
  getJapaneseOcrOrientation,
  getJapaneseOcrScale,
  selectBestJapaneseOcrResult,
} from "./ocr.ts";

test("selects vertical OCR for a clearly tall crop", () => {
  assert.equal(getJapaneseOcrOrientation(500, 800), "vertical");
});

test("selects horizontal OCR for wide and nearly square crops", () => {
  assert.equal(getJapaneseOcrOrientation(800, 500), "horizontal");
  assert.equal(getJapaneseOcrOrientation(500, 600), "horizontal");
});

test("upscales small crops without enlarging beyond the configured cap", () => {
  assert.equal(getJapaneseOcrScale(300, 600), 3);
  assert.equal(getJapaneseOcrScale(900, 600), 2);
  assert.equal(getJapaneseOcrScale(2048, 800), 1);
});

test("selects the non-empty OCR result with the highest confidence", () => {
  assert.equal(
    selectBestJapaneseOcrResult([
      { confidence: 72, text: "下の名前めっちゃ似てますね\n" },
      { confidence: 81, text: "下の名前めっちゃ似てますね" },
    ]),
    "下の名前めっちゃ似てますね",
  );
  assert.equal(
    selectBestJapaneseOcrResult([
      { confidence: 99, text: "  \n" },
      { confidence: 55, text: "日本語" },
    ]),
    "日本語",
  );
  assert.equal(
    selectBestJapaneseOcrResult([{ confidence: 0, text: "" }]),
    "",
  );
});
