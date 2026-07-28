import type { Metadata } from "next";
import Link from "next/link";

import { LearningMotif } from "@/components/brand/LearningMotif";

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
    symbol: "語",
  },
  {
    href: "/leer",
    title: "Leer manga",
    description:
      "Importa y recorre páginas de manga para aprender desde su contexto.",
    status: "Próxima fase",
    symbol: "読",
  },
  {
    href: "/mazos",
    title: "Organizar mazos",
    description:
      "Agrupa el vocabulario según tus objetivos y materiales de estudio.",
    status: "Planificado",
    symbol: "組",
  },
  {
    href: "/repasar",
    title: "Repasar",
    description:
      "Practica tus palabras en sesiones de repetición espaciada.",
    status: "Planificado",
    symbol: "復",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="relative overflow-hidden rounded-[2rem] border border-washi-200 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#fff5f4_100%)] px-6 py-10 shadow-[0_24px_70px_-45px_rgba(11,32,41,0.45)] sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-32 h-72 w-72 rounded-full border-[42px] border-shu-100/60"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
              Tu espacio de estudio
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.06] tracking-[-0.045em] text-sumi-950 sm:text-6xl lg:text-[3.4rem]">
              Tu estudio de japonés, en un solo lugar.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sumi-600">
              Construye una colección útil desde las palabras que encuentras y
              prepárala para conectarla con lectura de manga y repasos.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-sumi-600 lg:hidden">
              {["読む", "集める", "覚える"].map((step) => (
                <span
                  className="rounded-full border border-washi-200 bg-white/80 px-3 py-1.5"
                  key={step}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-xl bg-shu-600 px-5 py-3 text-center font-semibold text-white shadow-[0_12px_28px_-16px_rgba(218,87,82,0.9)] transition hover:-translate-y-0.5 hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                href="/anadir"
              >
                Añadir una palabra
              </Link>
              <Link
                className="rounded-xl border border-washi-300 bg-white/85 px-5 py-3 text-center font-semibold text-sumi-800 transition hover:border-sumi-500 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                href="/leer"
              >
                Ver el espacio de lectura
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <LearningMotif />
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="study-areas-title">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            Recorrido
          </p>
          <h2
            className="mt-2 text-2xl font-bold text-sumi-950"
            id="study-areas-title"
          >
            Áreas de aprendizaje
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {AREAS.map((area) => (
            <Link
              className="group relative overflow-hidden rounded-2xl border border-washi-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-shu-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
              href={area.href}
              key={area.href}
            >
              <span
                aria-hidden="true"
                className="absolute -right-1 -top-5 font-[var(--font-noto-sans-jp)] text-[5.5rem] font-bold leading-none text-sumi-950/[0.035] transition group-hover:text-shu-600/[0.07]"
              >
                {area.symbol}
              </span>
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-sumi-950 group-hover:text-shu-700">
                  {area.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    area.status === "Disponible"
                      ? "bg-shu-50 text-shu-700"
                      : "bg-washi-100 text-sumi-600"
                  }`}
                >
                  {area.status}
                </span>
              </div>
              <p className="relative mt-3 max-w-[28rem] text-sm leading-6 text-sumi-600">
                {area.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
