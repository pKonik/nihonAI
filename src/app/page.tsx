import { VocabularyApp } from "@/components/vocabulary/VocabularyApp";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          日本語を学ぶ
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            NihonAI
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Guarda las palabras que encuentras durante tu estudio del japonés
            y construye tu colección personal.
          </p>
        </header>

        <VocabularyApp />
      </div>
    </main>
  );
}
