import type { Metadata } from "next";

import { KanaLearning } from "@/components/kana/KanaLearning";
import {
  getKanaCharacters,
  getLocalizedCombinations,
} from "@/lib/kana/catalog";
import {
  getLearnedKanaKeys,
  KanaAuthenticationError,
} from "@/lib/kana/data";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();
  return { title: dictionary.meta.kanaTitle };
}

export default async function KanaPage() {
  const { locale, dictionary } = await getI18n();
  let learnedKeys: string[] = [];
  let loadError = false;

  try {
    learnedKeys = await getLearnedKanaKeys();
  } catch (error) {
    if (!(error instanceof KanaAuthenticationError)) {
      console.error("No se pudo cargar el progreso de kana.", error);
    }
    loadError = true;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="relative overflow-hidden rounded-[2rem] border border-washi-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_62%,#f0f6f2_100%)] px-6 py-10 shadow-[0_24px_70px_-45px_rgba(11,32,41,0.45)] sm:px-10 sm:py-12">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-8 font-[var(--font-noto-sans-jp)] text-[11rem] font-bold leading-none text-sumi-950/[0.04]"
        >
          あ
        </span>
        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            {dictionary.kana.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-sumi-950 sm:text-5xl">
            {dictionary.kana.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-sumi-600">
            {dictionary.kana.description}
          </p>
        </div>
      </section>

      {loadError ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          {dictionary.kana.loadError}
        </p>
      ) : null}

      <KanaLearning
        combinations={getLocalizedCombinations(locale)}
        hiragana={getKanaCharacters("hiragana", locale)}
        initialLearnedKeys={learnedKeys}
        katakana={getKanaCharacters("katakana", locale)}
        text={dictionary.kana}
      />
    </div>
  );
}
