import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateCombinedModelDownloadProgress,
  copyDecoderState,
  decodeMangaTokens,
  findHighestLogit,
  getDecoderPosition,
} from "./mangaOcr.js";

test("parallel model progress combines bytes from every asset", () => {
  const sizes = [10, 20, 30, 40];
  assert.equal(
    calculateCombinedModelDownloadProgress([1, 0, 0, 0], sizes),
    0.1,
  );
  assert.equal(
    calculateCombinedModelDownloadProgress([1, 0.5, 0, 0], sizes),
    0.2,
  );
  assert.equal(
    calculateCombinedModelDownloadProgress([1, 1, 1, 1], sizes),
    1,
  );
});

test("findHighestLogit returns the index of the largest value", () => {
  assert.equal(findHighestLogit(new Float32Array([-2, 0.5, 8, 3])), 2);
  assert.equal(findHighestLogit(new Float32Array()), -1);
});

test("the incremental decoder starts after CLS and the initial prediction", () => {
  assert.equal(getDecoderPosition(1), 2);
  assert.equal(getDecoderPosition(7), 8);
  assert.throws(() => getDecoderPosition(0));
});

test("copyDecoderState places each attention head at the requested position", () => {
  const headSize = 64;
  const heads = 4;
  const layers = 4;
  const sequenceLength = 256;
  const source = Float32Array.from(
    { length: layers * heads * headSize },
    (_, index) => index,
  );
  const target = new Float32Array(
    layers * heads * sequenceLength * headSize,
  );

  copyDecoderState(source, target, 7);

  assert.deepEqual(
    Array.from(target.slice(7 * headSize, 8 * headSize)),
    Array.from(source.slice(0, headSize)),
  );
  const lastHeadOffset =
    ((layers * heads - 1) * sequenceLength + 7) * headSize;
  assert.deepEqual(
    Array.from(target.slice(lastHeadOffset, lastHeadOffset + headSize)),
    Array.from(source.slice(source.length - headSize)),
  );
});

test("decodeMangaTokens joins Japanese tokens and omits special tokens", () => {
  const vocabulary = [
    "[PAD]",
    "[UNK]",
    "[CLS]",
    "[SEP]",
    "下",
    "の",
    "<unused0>",
    "名",
    " ",
    "前",
  ];

  assert.equal(
    decodeMangaTokens([2, 4, 5, 6, 7, 8, 9, 3], vocabulary),
    "下の名前",
  );
});
