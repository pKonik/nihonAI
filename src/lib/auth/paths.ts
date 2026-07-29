const PUBLIC_EXACT_PATHS = new Set(["/", "/login"]);
const PUBLIC_PATH_PREFIXES = [
  "/auth",
  "/models/manga-ocr-mobile",
];

export function isPublicPath(pathname: string) {
  return (
    PUBLIC_EXACT_PATHS.has(pathname) ||
    PUBLIC_PATH_PREFIXES.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  );
}
