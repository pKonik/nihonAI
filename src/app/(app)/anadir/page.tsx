import type { Metadata } from "next";
import { redirect, unstable_rethrow } from "next/navigation";

import { VocabularyApp } from "@/components/vocabulary/VocabularyApp";
import { listVocabularyEntries } from "@/lib/vocabulary/data";
import { VocabularyAuthenticationError } from "@/lib/vocabulary/errors";
import type { VocabularyEntry } from "@/types/vocabulary";

export const metadata: Metadata = {
  title: "Añadir vocabulario | NihonAI",
};

export default async function AddVocabularyPage() {
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
    initialLoadError =
      "No se pudo cargar tu vocabulario. Recarga la página para intentarlo de nuevo.";
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Colección
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Añadir vocabulario
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Guarda las palabras que encuentras durante tu estudio y administra tu
          colección personal.
        </p>
      </header>

      <VocabularyApp
        initialEntries={initialEntries}
        initialLoadError={initialLoadError}
      />
    </div>
  );
}
