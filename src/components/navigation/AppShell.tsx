import Link from "next/link";

import { signOut } from "@/app/login/actions";
import { UserAvatar } from "@/components/account/UserAvatar";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { OnboardingGuide } from "@/components/onboarding/OnboardingGuide";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type AppShellProps = {
  children: React.ReactNode;
  avatarVersion?: string;
  displayName: string;
  email: string;
  hasAvatar: boolean;
  initialOnboardingOpen: boolean;
  locale: Locale;
  text: Dictionary;
};

function AccountControls({
  avatarVersion,
  displayName,
  email,
  hasAvatar,
  locale,
  text,
}: {
  avatarVersion?: string;
  displayName: string;
  email: string;
  hasAvatar: boolean;
  locale: Locale;
  text: Dictionary;
}) {
  return (
    <div className="border-t border-white/15 pt-5">
      <Link
        aria-label={text.shell.accountLabel.replace(
          "{name}",
          displayName,
        )}
        className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-300"
        href="/cuenta"
      >
        <UserAvatar
          alt={text.account.avatarAlt.replace("{name}", displayName)}
          avatarVersion={avatarVersion}
          displayName={displayName}
          hasAvatar={hasAvatar}
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-washi-50">
            {displayName}
          </span>
          <span className="block truncate text-xs text-washi-300">
            {email}
          </span>
        </span>
      </Link>
      <div className="mt-4">
        <LanguageSelector
          inverted
          locale={locale}
          text={text.language}
        />
      </div>
      <form action={signOut} className="mt-3">
        <button
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-washi-50 transition hover:border-shu-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-300"
          type="submit"
        >
          {text.shell.signOut}
        </button>
      </form>
    </div>
  );
}

export function AppShell({
  children,
  avatarVersion,
  displayName,
  email,
  hasAvatar,
  initialOnboardingOpen,
  locale,
  text,
}: AppShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <a
        className="sr-only z-50 rounded-lg bg-washi-50 px-4 py-2 font-semibold text-sumi-950 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        {text.shell.skipToContent}
      </a>

      <aside className="relative hidden overflow-hidden bg-sumi-950 px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-shu-500/10 blur-3xl"
        />
        <Link
          aria-label={text.shell.homeLabel}
          className="relative rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-300"
          href="/inicio"
        >
          <BrandLogo inverted />
        </Link>

        <div className="relative mt-10 flex-1">
          <MainNavigation text={text.navigation} />
        </div>

        <div className="relative">
          <AccountControls
            avatarVersion={avatarVersion}
            displayName={displayName}
            email={email}
            hasAvatar={hasAvatar}
            locale={locale}
            text={text}
          />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-washi-200 bg-washi-50/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link
              aria-label={text.shell.homeLabel}
              className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600"
              href="/inicio"
            >
              <BrandLogo compact />
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSelector locale={locale} text={text.language} />
              <Link
                aria-label={text.shell.accountLabel.replace(
                  "{name}",
                  displayName,
                )}
                className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                href="/cuenta"
              >
                <UserAvatar
                  alt={text.account.avatarAlt.replace(
                    "{name}",
                    displayName,
                  )}
                  avatarVersion={avatarVersion}
                  displayName={displayName}
                  hasAvatar={hasAvatar}
                />
              </Link>
              <form action={signOut}>
                <button
                  aria-label={text.shell.signOutAccount.replace(
                    "{email}",
                    email,
                  )}
                  className="rounded-lg border border-washi-300 px-3 py-2 text-xs font-semibold text-sumi-700 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                  type="submit"
                >
                  {text.shell.signOutShort}
                </button>
              </form>
            </div>
          </div>
          <MainNavigation isMobile text={text.navigation} />
        </header>

        <main
          className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
          id="main-content"
        >
          {children}
        </main>
      </div>
      <OnboardingGuide
        initialOpen={initialOnboardingOpen}
        text={text.onboarding}
      />
    </div>
  );
}
