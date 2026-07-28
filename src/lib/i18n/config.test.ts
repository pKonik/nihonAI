import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_LOCALE,
  LOCALES,
  parseLocale,
} from "./config.ts";

test("acepta únicamente los idiomas compatibles", () => {
  assert.deepEqual(LOCALES, ["es", "en"]);
  assert.equal(parseLocale("es"), "es");
  assert.equal(parseLocale("en"), "en");
});

test("rechaza preferencias de idioma manipuladas", () => {
  assert.equal(parseLocale("fr"), null);
  assert.equal(parseLocale("toString"), null);
  assert.equal(parseLocale(null), null);
  assert.equal(DEFAULT_LOCALE, "es");
});
