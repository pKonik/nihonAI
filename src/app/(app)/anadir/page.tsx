import type { Metadata } from "next";
import { redirect, unstable_rethrow } from "next/navigation";

import { VocabularyApp } from "@/components/vocabulary/VocabularyApp";
import { getI18n } from "@/lib/i18n/server";
import { listVocabularyEntries } from "@/lib/vocabulary/data";
import { VocabularyAuthenticationError } from "@/lib/vocabulary/errors";
import type { VocabularyEntry } from "@/types/vocabulary";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.addTitle };
}

export default async function AddVocabularyPage() {
  const { dictionary, locale } = await getI18n();
  const text = dictionary.vocabulary;
  let initialEntries: VocabularyEntry[] = [];
  let initialLoadError: string | null = null;

  try {
    initialEntries = await listVocabularyEntries();
  } catch (error) {
    unstable_rethrow(error);

    if (error instanceof VocabularyAuthenticationError) {
      redirect("/login");
    }

    console.error("No se pudo cargar el vocabulario.", error);
    initialLoadError = text.loadError;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-sumi-950 sm:text-4xl">
          {text.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-sumi-600">
          {text.description}
        </p>
      </header>

      <VocabularyApp
        initialEntries={initialEntries}
        initialLoadError={initialLoadError}
        locale={locale}
        text={text}
      />
    </div>
  );
}
