"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";

import { completeOnboardingAction } from "@/app/onboarding/actions";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type OnboardingGuideProps = {
  initialOpen: boolean;
  text: Dictionary["onboarding"];
};

export function OnboardingGuide({
  initialOpen,
  text,
}: OnboardingGuideProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [needsCompletion, setNeedsCompletion] = useState(initialOpen);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const steps = [
    {
      eyebrow: text.welcome.eyebrow,
      title: text.welcome.title,
      description: text.welcome.description,
      symbol: "日",
    },
    {
      eyebrow: text.read.eyebrow,
      title: text.read.title,
      description: text.read.description,
      symbol: "読",
    },
    {
      eyebrow: text.collect.eyebrow,
      title: text.collect.title,
      description: text.collect.description,
      symbol: "語",
    },
    {
      eyebrow: text.remember.eyebrow,
      title: text.remember.title,
      description: text.remember.description,
      symbol: "復",
    },
  ] as const;
  const current = steps[step];
  const isLastStep = step === steps.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  function closeGuide() {
    setIsOpen(false);
    setStep(0);
    setMessage(undefined);
  }

  function dismissGuide() {
    if (isPending) return;

    if (!needsCompletion) {
      closeGuide();
      return;
    }

    startTransition(async () => {
      const result = await completeOnboardingAction();

      if (!result.success) {
        setMessage(result.message);
        return;
      }

      setNeedsCompletion(false);
      closeGuide();
    });
  }

  function openGuide() {
    setStep(0);
    setMessage(undefined);
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-30 rounded-full border border-washi-300 bg-white px-4 py-2.5 text-sm font-bold text-sumi-800 shadow-[0_12px_32px_-14px_rgba(11,32,41,0.45)] transition hover:-translate-y-0.5 hover:border-shu-300 hover:text-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 sm:bottom-6 sm:right-6"
        onClick={openGuide}
        type="button"
      >
        {text.openGuide}
      </button>

      <dialog
        aria-describedby="onboarding-description"
        aria-labelledby="onboarding-title"
        className="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-[1.75rem] border border-washi-200 bg-white p-0 text-sumi-950 shadow-2xl backdrop:bg-sumi-950/65 backdrop:backdrop-blur-sm"
        onCancel={(event) => {
          event.preventDefault();
          dismissGuide();
        }}
        ref={dialogRef}
      >
        <div className="grid min-h-[32rem] md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative flex min-h-64 items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#fff5f4_54%,#ffe6e3_100%)] px-8 pt-8 md:min-h-full">
            <div
              aria-hidden="true"
              className="absolute left-6 top-6 text-7xl font-black text-shu-600/10"
            >
              {current.symbol}
            </div>
            <Image
              alt={text.mascotAlt}
              className="relative h-auto max-h-72 w-auto object-contain md:max-h-[27rem]"
              height={1536}
              loading="eager"
              src="/kitsu-guide.webp"
              width={1024}
            />
          </div>

          <div className="flex min-h-0 flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-shu-600">
                {current.eyebrow}
              </p>
              <button
                aria-label={text.closeLabel}
                className="-mr-2 -mt-2 rounded-full p-2 text-xl leading-none text-sumi-500 transition hover:bg-washi-100 hover:text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                disabled={isPending}
                onClick={dismissGuide}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center py-6">
              <p className="text-sm font-semibold text-sumi-500">
                {text.stepLabel
                  .replace("{current}", String(step + 1))
                  .replace("{total}", String(steps.length))}
              </p>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl"
                id="onboarding-title"
              >
                {current.title}
              </h2>
              <p
                className="mt-4 text-base leading-7 text-sumi-600"
                id="onboarding-description"
              >
                {current.description}
              </p>
              {message ? (
                <p
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  role="alert"
                >
                  {message}
                </p>
              ) : null}
            </div>

            <div>
              <div
                aria-label={text.progressLabel}
                className="mb-5 flex gap-2"
                role="group"
              >
                {steps.map((item, index) => (
                  <span
                    aria-current={index === step ? "step" : undefined}
                    className={`h-1.5 flex-1 rounded-full ${
                      index <= step ? "bg-shu-500" : "bg-washi-200"
                    }`}
                    key={item.title}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-sumi-600 transition hover:bg-washi-100 hover:text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 disabled:opacity-50"
                  disabled={isPending}
                  onClick={dismissGuide}
                  type="button"
                >
                  {isPending ? text.saving : text.skip}
                </button>
                <div className="flex gap-2">
                  {step > 0 ? (
                    <button
                      className="rounded-xl border border-washi-300 bg-white px-4 py-2 text-sm font-bold text-sumi-700 transition hover:border-sumi-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                      disabled={isPending}
                      onClick={() => setStep((currentStep) => currentStep - 1)}
                      type="button"
                    >
                      {text.back}
                    </button>
                  ) : null}
                  <button
                    className="rounded-xl bg-shu-600 px-5 py-2 text-sm font-bold text-white shadow-[0_10px_24px_-14px_rgba(218,87,82,0.9)] transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 disabled:opacity-60"
                    disabled={isPending}
                    onClick={
                      isLastStep
                        ? dismissGuide
                        : () => setStep((currentStep) => currentStep + 1)
                    }
                    type="button"
                  >
                    {isLastStep ? text.finish : text.next}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
