import assert from "node:assert/strict";
import test from "node:test";

import {
  AVATAR_MAX_BYTES,
  parseAvatar,
  parseDisplayName,
} from "./validation.ts";

test("normaliza el nombre visible", () => {
  assert.deepEqual(parseDisplayName("  Hana   Mori  "), {
    success: true,
    data: "Hana Mori",
  });
});

test("rechaza nombres vacíos o demasiado largos", () => {
  assert.deepEqual(parseDisplayName("   "), {
    success: false,
    error: "required",
  });
  assert.deepEqual(parseDisplayName("a".repeat(51)), {
    success: false,
    error: "tooLong",
  });
});

test("acepta imágenes compatibles dentro del límite", () => {
  const file = new File(["avatar"], "avatar.png", {
    type: "image/png",
  });

  assert.deepEqual(parseAvatar(file), { success: true, data: file });
});

test("rechaza archivos incompatibles o demasiado grandes", () => {
  assert.deepEqual(
    parseAvatar(new File(["texto"], "avatar.txt", { type: "text/plain" })),
    { success: false, error: "invalidType" },
  );

  const oversized = new File(
    [new Uint8Array(AVATAR_MAX_BYTES + 1)],
    "avatar.webp",
    { type: "image/webp" },
  );
  assert.deepEqual(parseAvatar(oversized), {
    success: false,
    error: "tooLarge",
  });
});
