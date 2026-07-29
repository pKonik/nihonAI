import assert from "node:assert/strict";
import test from "node:test";

import {
  calculatePixelCrop,
  MANGA_CROP_MAX_SIDE,
} from "./crop.ts";

test("converts a percentage selection to source pixels", () => {
  assert.deepEqual(
    calculatePixelCrop(1200, 1800, {
      left: 25,
      top: 10,
      width: 50,
      height: 20,
    }),
    {
      sourceX: 300,
      sourceY: 180,
      sourceWidth: 600,
      sourceHeight: 360,
      outputWidth: 600,
      outputHeight: 360,
    },
  );
});

test("keeps the crop inside the source image after rounding", () => {
  const crop = calculatePixelCrop(101, 101, {
    left: 99,
    top: 99,
    width: 1,
    height: 1,
  });

  assert.equal(crop.sourceX + crop.sourceWidth <= 101, true);
  assert.equal(crop.sourceY + crop.sourceHeight <= 101, true);
});

test("scales large crops without changing their aspect ratio", () => {
  const crop = calculatePixelCrop(6000, 4000, {
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });

  assert.equal(crop.outputWidth, MANGA_CROP_MAX_SIDE);
  assert.equal(crop.outputHeight, 1365);
});
