import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio | NihonAI",
};

const AREAS = [
  {
    href: "/anadir",
    title: "Añadir vocabulario",
    description:
      "Guarda palabras, lecturas y ejemplos en tu colección personal.",
    status: "Disponible",
  },
  {
    href: "/leer",
    title: "Leer manga",
    description:
      "Importa y recorre páginas de manga para aprender desde su contexto.",
    status: "Próxima fase",
  },
  {
    href: "/mazos",
    title: "Organizar mazos",
    description:
      "Agrupa el vocabulario según tus objetivos y materiales de estudio.",
    status: "Planificado",
  },
  {
    href: "/repasar",
    title: "Repasar",
    description:
      "Practica tus palabras en sesiones de repetición espaciada.",
    status: "Planificado",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Inicio
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Tu estudio de japonés, en un solo lugar.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Construye una colección útil desde las palabras que encuentras y
          prepárala para conectarla con lectura de manga y repasos.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="rounded-xl bg-slate-950 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            href="/anadir"
          >
            Añadir una palabra
          </Link>
          <Link
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            href="/leer"
          >
            Ver el espacio de lectura
          </Link>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="study-areas-title">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Recorrido
          </p>
          <h2
            className="mt-2 text-2xl font-bold text-slate-950"
            id="study-areas-title"
          >
            Áreas de aprendizaje
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {AREAS.map((area) => (
            <Link
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              href={area.href}
              key={area.href}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-red-700">
                  {area.title}
                </h3>
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {area.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
