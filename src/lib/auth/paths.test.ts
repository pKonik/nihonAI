import assert from "node:assert/strict";
import test from "node:test";

import { isPublicPath } from "./paths.ts";

test("mantiene públicas únicamente la landing y las rutas de acceso", () => {
  assert.equal(isPublicPath("/"), true);
  assert.equal(isPublicPath("/login"), true);
  assert.equal(isPublicPath("/auth"), true);
  assert.equal(isPublicPath("/auth/confirm"), true);
});

test("mantiene protegidas las rutas de la aplicación", () => {
  assert.equal(isPublicPath("/inicio"), false);
  assert.equal(isPublicPath("/anadir"), false);
  assert.equal(isPublicPath("/leer"), false);
  assert.equal(isPublicPath("/login-falso"), false);
  assert.equal(isPublicPath("/auth-falso"), false);
});
