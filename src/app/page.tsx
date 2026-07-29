import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HeroAmbient } from "@/components/landing/HeroAmbient";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { ReadingPreview } from "@/components/landing/ReadingPreview";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return {
    title: dictionary.meta.landingTitle,
    description: dictionary.meta.landingDescription,
    openGraph: {
      type: "website",
      siteName: "NihonAI",
      title: dictionary.meta.landingTitle,
      description: dictionary.meta.landingDescription,
      images: [
        {
          url: "/og.jpg",
          width: 1733,
          height: 907,
          alt: dictionary.meta.landingImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.landingTitle,
      description: dictionary.meta.landingDescription,
      images: ["/og.jpg"],
    },
  };
}

export default async function LandingPage() {
  const { locale, dictionary } = await getI18n();
  const text = dictionary.landing;
  const readingExample = {
    ...text.hero.example,
    src: "/landing/mining-example-v3.webp",
  } as const;
  const journeySteps = [
    {
      number: "01",
      symbol: "取",
      title: text.journey.importTitle,
      description: text.journey.importDescription,
      status: text.journey.upcoming,
      statusClass: "bg-shu-50 text-shu-700",
    },
    {
      number: "02",
      symbol: "読",
      title: text.journey.readTitle,
      description: text.journey.readDescription,
      status: text.journey.upcoming,
      statusClass: "bg-shu-50 text-shu-700",
    },
    {
      number: "03",
      symbol: "選",
      title: text.journey.selectTitle,
      description: text.journey.selectDescription,
      status: text.journey.planned,
      statusClass: "bg-washi-100 text-sumi-600",
    },
    {
      number: "04",
      symbol: "認",
      title: text.journey.recognizeTitle,
      description: text.journey.recognizeDescription,
      status: text.journey.planned,
      statusClass: "bg-washi-100 text-sumi-600",
    },
    {
      number: "05",
      symbol: "掘",
      title: text.journey.mineTitle,
      description: text.journey.mineDescription,
      status: text.journey.available,
      statusClass: "bg-emerald-50 text-emerald-700",
    },
    {
      number: "06",
      symbol: "復",
      title: text.journey.reviewTitle,
      description: text.journey.reviewDescription,
      status: text.journey.planned,
      statusClass: "bg-washi-100 text-sumi-600",
    },
  ] as const;
  const features = [
    {
      symbol: "読",
      title: text.features.readerTitle,
      description: text.features.readerDescription,
      status: text.features.upcoming,
      available: false,
    },
    {
      symbol: "語",
      title: text.features.vocabularyTitle,
      description: text.features.vocabularyDescription,
      status: text.features.available,
      available: true,
    },
    {
      symbol: "あ",
      title: text.features.kanaTitle,
      description: text.features.kanaDescription,
      status: text.features.available,
      available: true,
    },
    {
      symbol: "組",
      title: text.features.decksTitle,
      description: text.features.decksDescription,
      status: text.features.upcoming,
      available: false,
    },
    {
      symbol: "復",
      title: text.features.reviewTitle,
      description: text.features.reviewDescription,
      status: text.features.upcoming,
      available: false,
    },
  ] as const;
  const privacyPoints = [
    {
      number: "01",
      title: text.privacy.accountTitle,
      description: text.privacy.accountDescription,
    },
    {
      number: "02",
      title: text.privacy.controlTitle,
      description: text.privacy.controlDescription,
    },
    {
      number: "03",
      title: text.privacy.honestTitle,
      description: text.privacy.honestDescription,
    },
  ] as const;
  const questions = [
    {
      question: text.faq.availableQuestion,
      answer: text.faq.availableAnswer,
    },
    {
      question: text.faq.readerQuestion,
      answer: text.faq.readerAnswer,
    },
    {
      question: text.faq.mangaQuestion,
      answer: text.faq.mangaAnswer,
    },
    {
      question: text.faq.languageQuestion,
      answer: text.faq.languageAnswer,
    },
  ] as const;

  return (
    <div className="min-h-screen overflow-x-clip">
      <a
        className="sr-only z-50 rounded-lg bg-sumi-950 px-4 py-2 font-semibold text-white shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#contenido"
      >
        {text.skipToContent}
      </a>

      <LandingHeader
        languageText={dictionary.language}
        locale={locale}
        text={text}
      />

      <main id="contenido">
        <HeroAmbient className="relative px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
          <div
            aria-hidden="true"
            className="hero-ambient__kanji absolute left-1/2 top-8 -z-10 hidden font-[var(--font-noto-sans-jp)] text-[11rem] font-black tracking-[0.2em] text-sumi-950/[0.025] xl:block"
          >
            日本語
          </div>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-20">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-shu-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                <span className="size-2 rounded-full bg-shu-500 shadow-[0_0_0_5px_rgba(237,107,99,0.12)]" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-shu-700">
                  {text.hero.eyebrow}
                </p>
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-sumi-950 sm:text-6xl lg:text-[4.6rem]">
                {text.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-sumi-600 sm:text-xl sm:leading-9">
                {text.hero.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-xl bg-shu-600 px-6 py-3.5 text-center font-bold text-white shadow-[0_18px_32px_-18px_rgba(218,87,82,0.9)] transition hover:-translate-y-0.5 hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 motion-reduce:transform-none"
                  href="/login"
                >
                  {text.hero.primaryAction}
                </Link>
                <Link
                  className="rounded-xl border border-washi-300 bg-white/80 px-6 py-3.5 text-center font-bold text-sumi-800 transition hover:-translate-y-0.5 hover:border-sumi-500 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 motion-reduce:transform-none"
                  href="#recorrido"
                >
                  {text.hero.secondaryAction}
                </Link>
              </div>

              <p className="mt-6 max-w-xl border-l-2 border-shu-300 pl-4 text-sm leading-6 text-sumi-600">
                {text.hero.availability}
              </p>
            </div>

            <ReadingPreview example={readingExample} text={text.hero} />
          </div>
        </HeroAmbient>

        <section
          className="scroll-mt-28 border-y border-washi-200 bg-white/72 px-4 py-20 backdrop-blur-sm sm:px-6 sm:py-24 lg:px-8"
          id="recorrido"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-600">
                  {text.journey.eyebrow}
                </p>
                <h2 className="mt-3 max-w-xl text-4xl font-black tracking-[-0.045em] text-sumi-950 sm:text-5xl">
                  {text.journey.title}
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-sumi-600 lg:justify-self-end">
                {text.journey.description}
              </p>
            </div>

            <ol
              aria-label={text.journey.roadmapLabel}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {journeySteps.map((step, index) => (
                <li
                  className="group relative overflow-hidden rounded-2xl border border-washi-200 bg-white p-5 shadow-[0_20px_48px_-36px_rgba(11,32,41,0.45)] transition hover:-translate-y-1 hover:border-shu-200 hover:shadow-[0_25px_55px_-32px_rgba(11,32,41,0.4)] motion-reduce:transform-none"
                  key={step.number}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-5 font-[var(--font-noto-sans-jp)] text-[6rem] font-black leading-none text-sumi-950/[0.035] transition group-hover:text-shu-600/[0.07]"
                  >
                    {step.symbol}
                  </span>
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold tracking-[0.12em] text-sumi-500">
                      {step.number}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${step.statusClass}`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <h3 className="relative mt-7 text-xl font-extrabold text-sumi-950">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-6 text-sumi-600">
                    {step.description}
                  </p>
                  {index < journeySteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-5 h-px w-10 bg-shu-300"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
          id="herramientas"
        >
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2.2rem] bg-sumi-950 px-5 py-8 shadow-[0_35px_80px_-45px_rgba(11,32,41,0.8)] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-300">
                  {text.features.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  {text.features.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-washi-300">
                  {text.features.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <article
                    className={`relative overflow-hidden rounded-2xl border p-5 ${
                      feature.available
                        ? "border-shu-300/40 bg-shu-500/10"
                        : "border-white/10 bg-white/[0.045]"
                    } ${index === features.length - 1 ? "sm:col-span-2" : ""}`}
                    key={feature.title}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white/8 font-[var(--font-noto-sans-jp)] text-xl font-black text-shu-300">
                        {feature.symbol}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${
                          feature.available
                            ? "bg-emerald-400/12 text-emerald-300"
                            : "bg-white/8 text-washi-300"
                        }`}
                      >
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-washi-300">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 overflow-hidden rounded-[2rem] border border-shu-200 bg-[linear-gradient(125deg,#fff_0%,#fff8f7_100%)] p-6 shadow-[0_22px_55px_-40px_rgba(11,32,41,0.45)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
            <div
              className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-shu-300 bg-shu-50"
            >
              <div
                aria-hidden="true"
                className="absolute -left-12 -top-12 size-40 rounded-full border-[24px] border-white"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -right-4 font-[var(--font-noto-sans-jp)] text-9xl font-black text-shu-600/[0.08]"
              >
                案内
              </div>
              <Image
                alt={text.companion.label}
                className="relative h-64 w-auto object-contain sm:h-72"
                height={1536}
                src="/kitsu-guide.webp"
                width={1024}
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-600">
                {text.companion.eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-sumi-950 sm:text-4xl">
                {text.companion.title}
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-sumi-600">
                {text.companion.description}
              </p>
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-28 border-y border-washi-200 bg-white/75 px-4 py-20 backdrop-blur-sm sm:px-6 sm:py-24 lg:px-8"
          id="privacidad"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-600">
                {text.privacy.eyebrow}
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-black tracking-[-0.045em] text-sumi-950 sm:text-5xl">
                {text.privacy.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-sumi-600">
                {text.privacy.description}
              </p>
            </div>

            <div className="divide-y divide-washi-200 border-y border-washi-200">
              {privacyPoints.map((point) => (
                <article
                  className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5"
                  key={point.number}
                >
                  <span className="font-mono text-xs font-bold tracking-[0.12em] text-shu-600">
                    {point.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-sumi-950">
                      {point.title}
                    </h3>
                    <p className="mt-2 leading-7 text-sumi-600">
                      {point.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
          id="preguntas"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-600">
                {text.faq.eyebrow}
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-sumi-950 sm:text-5xl">
                {text.faq.title}
              </h2>
            </div>

            <div className="space-y-3">
              {questions.map((item, index) => (
                <details
                  className="group rounded-2xl border border-washi-200 bg-white/85 p-5 shadow-sm open:border-shu-200 open:bg-white"
                  key={item.question}
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-washi-100 text-lg text-sumi-700 transition group-open:rotate-45 group-open:bg-shu-50 group-open:text-shu-700 motion-reduce:transition-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl pr-10 leading-7 text-sumi-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2.2rem] bg-shu-600 px-6 py-12 text-center shadow-[0_35px_80px_-45px_rgba(218,87,82,0.85)] sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-24 size-72 rounded-full border-[44px] border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-14 font-[var(--font-noto-sans-jp)] text-[12rem] font-black leading-none text-white/[0.08]"
            >
              始
            </div>
            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-shu-100">
                {text.closing.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                {text.closing.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-shu-50">
                {text.closing.description}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  className="rounded-xl bg-sumi-950 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-sumi-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
                  href="/login"
                >
                  {text.closing.primaryAction}
                </Link>
                <Link
                  className="rounded-xl border border-white/35 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
                  href="/login"
                >
                  {text.closing.secondaryAction}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-washi-200 bg-white/70 px-4 py-8 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-black tracking-[-0.03em] text-sumi-950">
              Nihon<span className="text-shu-600">AI</span>
            </p>
            <p className="mt-2 text-sm text-sumi-600">
              {text.footer.tagline}
            </p>
          </div>
          <div className="sm:text-right">
            <nav aria-label={text.navigationLabel}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-sumi-600 sm:justify-end">
                <li>
                  <Link className="hover:text-shu-700" href="#recorrido">
                    {text.footer.journey}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-shu-700" href="#privacidad">
                    {text.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-shu-700" href="#preguntas">
                    {text.footer.faq}
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-shu-700" href="/login">
                    {text.footer.access}
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="mt-3 text-xs text-sumi-500">
              © {new Date().getFullYear()} {text.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
