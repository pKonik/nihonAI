import assert from "node:assert/strict";
import test from "node:test";

import {
  isSupportedMangaImage,
  sortMangaPageNames,
} from "./files.ts";

test("sorts manga pages by their full path and numeric portions", () => {
  const names = [
    "chapter 2/page 10.jpg",
    "chapter 10/page 1.jpg",
    "chapter 2/page 2.jpg",
  ];

  assert.deepEqual(sortMangaPageNames(names), [
    "chapter 2/page 2.jpg",
    "chapter 2/page 10.jpg",
    "chapter 10/page 1.jpg",
  ]);
});

test("recognizes only supported image extensions without case sensitivity", () => {
  assert.equal(isSupportedMangaImage("page-01.JPG"), true);
  assert.equal(isSupportedMangaImage("page-02.webp"), true);
  assert.equal(isSupportedMangaImage("notes.txt"), false);
  assert.equal(isSupportedMangaImage("image.svg"), false);
});
