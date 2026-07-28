import { setLocaleAction } from "@/app/language/actions";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LanguageSelectorProps = {
  inverted?: boolean;
  locale: Locale;
  text: Dictionary["language"];
};

export function LanguageSelector({
  inverted = false,
  locale,
  text,
}: LanguageSelectorProps) {
  return (
    <form
      action={setLocaleAction}
      aria-label={text.label}
      className={`inline-flex rounded-xl border p-1 ${
        inverted
          ? "border-white/15 bg-white/5"
          : "border-washi-300 bg-white/80"
      }`}
    >
      <button
        aria-pressed={locale === "es"}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-500 ${
          locale === "es"
            ? "bg-shu-600 text-white"
            : inverted
              ? "text-washi-300 hover:bg-white/10 hover:text-white"
              : "text-sumi-600 hover:bg-washi-100 hover:text-sumi-950"
        }`}
        name="locale"
        title={text.spanish}
        type="submit"
        value="es"
      >
        ES
      </button>
      <button
        aria-pressed={locale === "en"}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-500 ${
          locale === "en"
            ? "bg-shu-600 text-white"
            : inverted
              ? "text-washi-300 hover:bg-white/10 hover:text-white"
              : "text-sumi-600 hover:bg-washi-100 hover:text-sumi-950"
        }`}
        name="locale"
        title={text.english}
        type="submit"
        value="en"
      >
        EN
      </button>
    </form>
  );
}
