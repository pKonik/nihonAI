"use client";

import { useEffect, useRef } from "react";

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
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Colección
        </p>
        <h2
          className="mt-2 text-2xl font-bold text-slate-950"
          id="vocabulary-list-title"
        >
          Mi vocabulario
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
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <p className="font-medium text-slate-800">
            Todavía no hay palabras guardadas.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Completa el formulario para crear tu primera entrada.
          </p>
        </div>
      ) : entries.length > 0 ? (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.id}>
              <article className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">
                      {entry.word}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {entry.reading}
                    </p>
                  </div>
                  {confirmingDeleteId !== entry.id ? (
                    <div className="flex flex-wrap justify-end gap-1">
                      <button
                        aria-label={`Editar ${entry.word}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSaving || deletingId !== null}
                        onClick={() => onEdit(entry)}
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        aria-label={`Eliminar ${entry.word}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSaving || deletingId !== null}
                        onClick={() => onRequestDelete(entry.id)}
                        type="button"
                      >
                        Eliminar
                      </button>
                    </div>
                  ) : null}
                </div>

                {confirmingDeleteId === entry.id ? (
                  <div
                    aria-label={`Confirmar eliminación de ${entry.word}`}
                    className="mt-4 rounded-xl bg-red-50 p-4"
                    role="group"
                  >
                    <p className="text-sm font-medium text-red-900">
                      ¿Eliminar esta entrada?
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
                          ? "Eliminando..."
                          : "Eliminar"}
                      </button>
                      <button
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={
                          isSaving || deletingId === entry.id
                        }
                        onClick={onCancelDelete}
                        type="button"
                      >
                        Cancelar
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

                <p className="mt-4 text-lg text-slate-800">{entry.meaning}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {entry.partOfSpeech}
                  </span>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                    {entry.jlptLevel}
                  </span>
                </div>

                {entry.example ? (
                  <blockquote className="mt-4 border-l-2 border-red-200 pl-4 text-sm leading-6 text-slate-600">
                    {entry.example}
                  </blockquote>
                ) : null}

                {entry.source ? (
                  <p className="mt-4 text-xs text-slate-500">
                    Fuente: {entry.source}
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
