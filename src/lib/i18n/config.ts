export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE = "nihonai_locale";

export function parseLocale(value: unknown): Locale | null {
  return typeof value === "string" &&
    LOCALES.some((locale) => locale === value)
    ? (value as Locale)
    : null;
}
