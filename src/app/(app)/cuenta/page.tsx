import type { Metadata } from "next";

import { AccountForms } from "@/components/account/AccountForms";
import { getAccountOverview } from "@/lib/account/data";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.accountTitle };
}

export default async function AccountPage() {
  const [{ dictionary, locale }, account] = await Promise.all([
    getI18n(),
    getAccountOverview(),
  ]);
  const text = dictionary.account;
  const displayName =
    account.displayName || account.email.split("@")[0] || text.userFallback;
  const joinedAt = new Intl.DateTimeFormat(
    locale === "es" ? "es-PE" : "en-US",
    { dateStyle: "long" },
  ).format(new Date(account.joinedAt));

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-sumi-950 sm:text-5xl">
          {text.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-sumi-600">
          {text.description}
        </p>
      </header>

      <section
        aria-labelledby="account-summary-title"
        className="mt-8 grid gap-4 sm:grid-cols-3"
      >
        <h2 className="sr-only" id="account-summary-title">
          {text.summaryTitle}
        </h2>
        <div className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-sumi-500">{text.email}</p>
          <p className="mt-2 break-all font-semibold text-sumi-950">
            {account.email}
          </p>
        </div>
        <div className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-sumi-500">{text.memberSince}</p>
          <p className="mt-2 font-semibold text-sumi-950">{joinedAt}</p>
        </div>
        <div className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-sumi-500">{text.savedWords}</p>
          <p className="mt-2 text-3xl font-extrabold text-sumi-950">
            {account.vocabularyCount}
          </p>
          <p className="mt-1 text-xs text-sumi-500">
            {text.realActivityNote}
          </p>
        </div>
      </section>

      <div className="mt-5">
        <AccountForms
          avatarVersion={account.updatedAt}
          displayName={displayName}
          hasAvatar={Boolean(account.avatarPath)}
          text={text}
        />
      </div>
    </div>
  );
}
