import Link from "next/link";

type FeaturePlaceholderProps = {
  description: string;
  nextStep: string;
  title: string;
};

export function FeaturePlaceholder({
  description,
  nextStep,
  title,
}: FeaturePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-red-100 bg-red-50 px-6 py-4 sm:px-10">
          <p className="text-sm font-semibold text-red-700">
            Espacio preparado para una próxima fase
          </p>
        </div>
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            NihonAI
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-950">
              Qué viene después
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {nextStep}
            </p>
          </div>

          <Link
            className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            href="/anadir"
          >
            Añadir vocabulario ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
