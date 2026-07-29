import assert from "node:assert/strict";
import test from "node:test";

import {
  createSelectionRect,
  getRelativePoint,
} from "./selection.ts";

test("converts a pointer position to percentages within the image", () => {
  assert.deepEqual(
    getRelativePoint(
      { x: 150, y: 100 },
      { left: 50, top: 20, width: 200, height: 160 },
    ),
    { x: 50, y: 50 },
  );
});

test("clamps pointer positions to the image bounds", () => {
  assert.deepEqual(
    getRelativePoint(
      { x: 500, y: -20 },
      { left: 100, top: 100, width: 200, height: 300 },
    ),
    { x: 100, y: 0 },
  );
});

test("creates the same rectangle regardless of drag direction", () => {
  assert.deepEqual(
    createSelectionRect({ x: 80, y: 70 }, { x: 20, y: 10 }),
    { left: 20, top: 10, width: 60, height: 60 },
  );
});
