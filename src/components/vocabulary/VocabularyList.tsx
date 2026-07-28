"use client";

import { useEffect, useRef } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { VocabularyEntry } from "@/types/vocabulary";

type VocabularyListProps = {
  confirmingDeleteId: string | null;
  deleteError: { id: string; message: string } | null;
  deletingId: string | null;
  entries: VocabularyEntry[];
  isSaving: boolean;
  loadError: string | null;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => Promise<void>;
  onEdit: (entry: VocabularyEntry) => void;
  onRequestDelete: (id: string) => void;
  text: Dictionary["vocabulary"];
};

export function VocabularyList({
  confirmingDeleteId,
  deleteError,
  deletingId,
  entries,
  isSaving,
  loadError,
  onCancelDelete,
  onConfirmDelete,
  onEdit,
  onRequestDelete,
  text,
}: VocabularyListProps) {
  const confirmDeleteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmingDeleteId) {
      confirmDeleteButtonRef.current?.focus();
    }
  }, [confirmingDeleteId]);

  return (
    <section
      aria-labelledby="vocabulary-list-title"
      className="rounded-3xl border border-washi-200 bg-washi-50 p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {text.list.eyebrow}
        </p>
        <h2
          className="mt-2 text-2xl font-bold text-sumi-950"
          id="vocabulary-list-title"
        >
          {text.list.title}
        </h2>
      </div>

      {loadError ? (
        <p
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      {entries.length === 0 && !loadError ? (
        <div className="rounded-2xl border border-dashed border-washi-300 bg-washi-100 px-6 py-12 text-center">
          <p className="font-medium text-sumi-800">
            {text.list.emptyTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-sumi-500">
            {text.list.emptyDescription}
          </p>
        </div>
      ) : entries.length > 0 ? (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.id}>
              <article className="rounded-2xl border border-washi-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-sumi-950">
                      {entry.word}
                    </h3>
                    <p className="mt-1 text-sm text-sumi-500">
                      {entry.reading}
                    </p>
                  </div>
                  {confirmingDeleteId !== entry.id ? (
                    <div className="flex flex-wrap justify-end gap-1">
                      <button
                        aria-label={text.list.editLabel.replace(
                          "{word}",
                          entry.word,
                        )}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-sumi-700 transition hover:bg-washi-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSaving || deletingId !== null}
                        onClick={() => onEdit(entry)}
                        type="button"
                      >
                        {text.list.edit}
                      </button>
                      <button
                        aria-label={text.list.deleteLabel.replace(
                          "{word}",
                          entry.word,
                        )}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSaving || deletingId !== null}
                        onClick={() => onRequestDelete(entry.id)}
                        type="button"
                      >
                        {text.list.delete}
                      </button>
                    </div>
                  ) : null}
                </div>

                {confirmingDeleteId === entry.id ? (
                  <div
                    aria-label={text.list.confirmLabel.replace(
                      "{word}",
                      entry.word,
                    )}
                    className="mt-4 rounded-xl bg-red-50 p-4"
                    role="group"
                  >
                    <p className="text-sm font-medium text-red-900">
                      {text.list.confirmQuestion}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        className="rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={
                          isSaving || deletingId === entry.id
                        }
                        onClick={() => void onConfirmDelete(entry.id)}
                        ref={confirmDeleteButtonRef}
                        type="button"
                      >
                        {deletingId === entry.id
                          ? text.list.deleting
                          : text.list.delete}
                      </button>
                      <button
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-sumi-800 transition hover:border-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={
                          isSaving || deletingId === entry.id
                        }
                        onClick={onCancelDelete}
                        type="button"
                      >
                        {text.list.cancel}
                      </button>
                    </div>
                    {deleteError?.id === entry.id ? (
                      <p
                        className="mt-3 text-sm text-red-700"
                        role="alert"
                      >
                        {deleteError.message}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <p className="mt-4 text-lg text-sumi-800">{entry.meaning}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-washi-100 px-3 py-1 text-sumi-700">
                    {text.form.wordTypes[entry.partOfSpeech]}
                  </span>
                  <span className="rounded-full bg-shu-50 px-3 py-1 text-shu-700">
                    {entry.jlptLevel === "Sin clasificar"
                      ? text.form.unclassified
                      : entry.jlptLevel}
                  </span>
                </div>

                {entry.example ? (
                  <blockquote className="mt-4 border-l-2 border-shu-200 pl-4 text-sm leading-6 text-sumi-600">
                    {entry.example}
                  </blockquote>
                ) : null}

                {entry.source ? (
                  <p className="mt-4 text-xs text-sumi-500">
                    {text.list.source.replace(
                      "{source}",
                      entry.source,
                    )}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
