import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LandingHeaderProps = {
  locale: Locale;
  languageText: Dictionary["language"];
  text: Dictionary["landing"];
};

export function LandingHeader({
  locale,
  languageText,
  text,
}: LandingHeaderProps) {
  const navigationItems = [
    { href: "#recorrido", label: text.navigation.journey },
    { href: "#herramientas", label: text.navigation.features },
    { href: "#privacidad", label: text.navigation.privacy },
    { href: "#preguntas", label: text.navigation.faq },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-washi-200/80 bg-washi-50/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          aria-label="NihonAI"
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600"
          href="/"
        >
          <BrandLogo compact />
        </Link>

        <nav
          aria-label={text.navigationLabel}
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-sumi-600 transition hover:bg-white hover:text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector locale={locale} text={languageText} />
          <Link
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-sumi-700 transition hover:bg-white hover:text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 sm:block"
            href="/login"
          >
            {text.signIn}
          </Link>
          <Link
            className="rounded-xl bg-sumi-950 px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_-16px_rgba(11,32,41,0.75)] transition hover:-translate-y-0.5 hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 motion-reduce:transform-none"
            href="/login"
          >
            {text.createAccount}
          </Link>
        </div>
      </div>

      <nav
        aria-label={text.navigationLabel}
        className="border-t border-washi-200/70 px-3 lg:hidden"
      >
        <ul className="flex justify-between gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navigationItems.map((item) => (
            <li className="shrink-0" key={item.href}>
              <Link
                className="block rounded-lg px-2.5 py-1.5 text-xs font-semibold text-sumi-600 transition hover:bg-white hover:text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
