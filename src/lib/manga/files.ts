export const MANGA_IMAGE_EXTENSIONS = [
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
] as const;

export const MANGA_IMPORT_LIMITS = {
  archiveBytes: 200 * 1024 * 1024,
  imageBytes: 20 * 1024 * 1024,
  pages: 300,
  totalImageBytes: 400 * 1024 * 1024,
} as const;

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export function isSupportedMangaImage(name: string): boolean {
  const normalizedName = name.toLocaleLowerCase();

  return MANGA_IMAGE_EXTENSIONS.some((extension) =>
    normalizedName.endsWith(extension),
  );
}

export function sortMangaPageNames(names: readonly string[]): string[] {
  return [...names].sort((left, right) => naturalCollator.compare(left, right));
}
