"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { createVocabularyAction } from "@/app/vocabulary/actions";
import { VocabularyForm } from "@/components/vocabulary/VocabularyForm";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { VocabularyDraft } from "@/types/vocabulary";

type MinedVocabularyDialogProps = {
  draft: VocabularyDraft;
  onClose: () => void;
  onSaved: () => void;
  text: Dictionary["vocabulary"];
};

export function MinedVocabularyDialog({
  draft,
  onClose,
  onSaved,
  text,
}: MinedVocabularyDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSaving) onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSaving, onClose]);

  async function saveDraft(
    value: VocabularyDraft,
  ): Promise<string | null> {
    setIsSaving(true);

    try {
      const result = await createVocabularyAction(value);
      if (!result.ok) return result.error;

      return null;
    } catch {
      return text.errors.operationFailed;
    } finally {
      setIsSaving(false);
    }
  }

  return createPortal(
    <div
      aria-label={text.form.addTitle}
      aria-modal="true"
      className="fixed inset-0 z-[90] overflow-y-auto bg-sumi-950/55 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-2 flex justify-end">
          <button
            className="rounded-full border border-white/30 bg-sumi-950/80 px-4 py-2 text-sm font-bold text-white transition hover:bg-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
            disabled={isSaving}
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            {text.form.cancel}
          </button>
        </div>
        <VocabularyForm
          disabledMessage={null}
          editingEntry={null}
          initialDraft={draft}
          isDisabled={false}
          isSaving={isSaving}
          onCancelEdit={onClose}
          onSave={saveDraft}
          onSaved={onSaved}
          text={text}
        />
      </div>
    </div>,
    document.body,
  );
}
