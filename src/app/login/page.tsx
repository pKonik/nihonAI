import type { Metadata } from "next";

import {
  resendConfirmation,
  signIn,
  signUp,
} from "@/app/login/actions";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getI18n } from "@/lib/i18n/server";
import { getSupabaseConfig } from "@/lib/supabase/env";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    setup?: string;
  }>;
};

function readFeedback(
  code: string | undefined,
  feedback: Dictionary["login"]["feedback"],
) {
  if (
    !code ||
    !Object.prototype.hasOwnProperty.call(feedback, code)
  ) {
    return null;
  }

  return feedback[code as keyof typeof feedback];
}

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.loginTitle };
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const { locale, dictionary } = await getI18n();
  const text = dictionary.login;
  const isConfigured = Boolean(getSupabaseConfig());
  const error = readFeedback(params.error, text.feedback);
  const message = readFeedback(params.message, text.feedback);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-washi-200 bg-washi-50 shadow-xl shadow-sumi-950/5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="absolute right-6 top-6 z-20">
          <LanguageSelector
            locale={locale}
            text={dictionary.language}
          />
        </div>

        <aside className="hidden bg-sumi-950 p-10 lg:flex lg:flex-col lg:justify-between">
          <BrandLogo inverted />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-300">
              日本語を、自分のペースで。
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-washi-50">
              {text.heroTitle}
            </h2>
            <p className="mt-5 leading-7 text-washi-300">
              {text.heroDescription}
            </p>
          </div>
        </aside>

        <section className="p-6 sm:p-10">
          <div className="mb-8 pr-24 lg:hidden">
            <BrandLogo />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            {text.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-sumi-950">
            {text.title}
          </h1>
          <p className="mt-3 leading-7 text-sumi-600">
            {text.description}
          </p>

          {!isConfigured ? (
            <div
              className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
              role="status"
            >
              <p className="font-semibold">{text.setupTitle}</p>
              <p className="mt-2">
                {text.setupBefore} <code>.env.example</code>{" "}
                {text.setupMiddle} <code>.env.local</code>{" "}
                {text.setupAfter}
              </p>
            </div>
          ) : (
            <>
              <form className="mt-8 space-y-5" action={signIn}>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-sumi-800"
                    htmlFor="email"
                  >
                    {text.email}
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
                    id="email"
                    name="email"
                    placeholder=""
                    required
                    type="email"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-sumi-800"
                    htmlFor="password"
                  >
                    {text.password}
                  </label>
                  <input
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
                    id="password"
                    minLength={6}
                    name="password"
                    required
                    type="password"
                  />
                </div>

                {error ? (
                  <p
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                {message ? (
                  <p
                    className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                    role="status"
                  >
                    {message}
                  </p>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    className="rounded-xl bg-sumi-950 px-5 py-3 font-semibold text-washi-50 transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                    type="submit"
                  >
                    {text.signIn}
                  </button>
                  <button
                    className="rounded-xl border border-washi-300 px-5 py-3 font-semibold text-sumi-800 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                    formAction={signUp}
                    type="submit"
                  >
                    {text.signUp}
                  </button>
                </div>
              </form>

              <details className="mt-6 rounded-2xl border border-washi-200 bg-washi-100 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-sumi-800">
                  {text.noConfirmation}
                </summary>
                <form
                  className="mt-4 space-y-3"
                  action={resendConfirmation}
                >
                  <label
                    className="block text-sm font-medium text-sumi-700"
                    htmlFor="resend-email"
                  >
                    {text.pendingEmail}
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
                    id="resend-email"
                    name="email"
                    required
                    type="email"
                  />
                  <button
                    className="w-full rounded-xl border border-washi-300 bg-white px-5 py-3 font-semibold text-sumi-800 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                    type="submit"
                  >
                    {text.resend}
                  </button>
                </form>
              </details>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
