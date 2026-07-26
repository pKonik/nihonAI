import { VocabularyApp } from "@/components/vocabulary/VocabularyApp";
import { signOut } from "@/app/login/actions";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!getSupabaseConfig()) {
    redirect("/login?setup=missing");
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;

  if (!claims) {
    redirect("/login");
  }

  const email =
    typeof claims.email === "string" ? claims.email : "usuario";

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
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
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-sm text-slate-600">{email}</p>
            <form action={signOut}>
              <button
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                type="submit"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        <VocabularyApp />
      </div>
    </main>
  );
}
