import Link from "next/link";

import type { Dictionary } from "@/lib/i18n/dictionaries";

type FeaturePlaceholderProps = {
  description: string;
  nextStep: string;
  text: Dictionary["feature"];
  title: string;
};

export function FeaturePlaceholder({
  description,
  nextStep,
  text,
  title,
}: FeaturePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <section className="relative overflow-hidden rounded-[2rem] border border-washi-200 bg-washi-50 shadow-[0_24px_70px_-45px_rgba(11,32,41,0.45)]">
        <span
          aria-hidden="true"
          className="absolute -right-3 top-10 font-[var(--font-noto-sans-jp)] text-[10rem] font-bold leading-none text-sumi-950/[0.035]"
        >
          次
        </span>
        <div className="border-b border-shu-100 bg-shu-50 px-6 py-4 sm:px-10">
          <p className="text-sm font-semibold text-shu-700">
            {text.prepared}
          </p>
        </div>
        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            NihonAI · 次の一歩
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-sumi-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sumi-600">
            {description}
          </p>

          <div className="mt-8 rounded-2xl border border-washi-200 bg-washi-100 p-5">
            <p className="text-sm font-semibold text-sumi-950">
              {text.next}
            </p>
            <p className="mt-2 text-sm leading-6 text-sumi-600">
              {nextStep}
            </p>
          </div>

          <Link
            className="mt-8 inline-flex rounded-xl bg-sumi-950 px-5 py-3 font-semibold text-washi-50 transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
            href="/anadir"
          >
            {text.addNow}
          </Link>
        </div>
      </section>
    </div>
  );
}
