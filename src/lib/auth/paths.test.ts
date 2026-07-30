import assert from "node:assert/strict";
import test from "node:test";

import { isPublicPath } from "./paths.ts";

test("mantiene públicos el acceso y los recursos lingüísticos estáticos", () => {
  assert.equal(isPublicPath("/"), true);
  assert.equal(isPublicPath("/login"), true);
  assert.equal(isPublicPath("/auth"), true);
  assert.equal(isPublicPath("/auth/confirm"), true);
  assert.equal(isPublicPath("/models/manga-ocr-mobile"), true);
  assert.equal(
    isPublicPath(
      "/models/manga-ocr-mobile/revision/encoder.onnx",
    ),
    true,
  );
  assert.equal(
    isPublicPath("/dictionaries/jmdict/2026-07-27/566.json.br"),
    true,
  );
  assert.equal(
    isPublicPath("/vendor/kuromoji/0.1.2/base.dat.gz"),
    true,
  );
});

test("mantiene protegidas las rutas de la aplicación", () => {
  assert.equal(isPublicPath("/inicio"), false);
  assert.equal(isPublicPath("/anadir"), false);
  assert.equal(isPublicPath("/leer"), false);
  assert.equal(isPublicPath("/login-falso"), false);
  assert.equal(isPublicPath("/auth-falso"), false);
  assert.equal(isPublicPath("/models/private-file"), false);
});
