"use client";

import { useRef, useState } from "react";

import {
  createVocabularyAction,
  deleteVocabularyAction,
  updateVocabularyAction,
} from "@/app/vocabulary/actions";
import { VocabularyForm } from "@/components/vocabulary/VocabularyForm";
import { VocabularyList } from "@/components/vocabulary/VocabularyList";
import {
  insertVocabularyEntry,
  removeVocabularyEntry,
  replaceVocabularyEntry,
} from "@/lib/vocabulary/collection";
import type {
  VocabularyDraft,
  VocabularyEntry,
} from "@/types/vocabulary";

type VocabularyAppProps = {
  initialEntries: VocabularyEntry[];
  initialLoadError: string | null;
};

type DeleteError = {
  id: string;
  message: string;
} | null;

export function VocabularyApp({
  initialEntries,
  initialLoadError,
}: VocabularyAppProps) {
  const [entries, setEntries] =
    useState<VocabularyEntry[]>(initialEntries);
  const [editingEntry, setEditingEntry] =
    useState<VocabularyEntry | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] =
    useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<DeleteError>(null);
  const isSavingRef = useRef(false);

  async function saveEntry(draft: VocabularyDraft): Promise<string | null> {
    if (initialLoadError) {
      return "Recarga la página antes de modificar tu vocabulario.";
    }

    if (deletingId) {
      return "Espera a que termine la eliminación en curso.";
    }

    if (isSavingRef.current) {
      return "Ya hay una operación de guardado en curso.";
    }

    const entryBeingEdited = editingEntry;
    isSavingRef.current = true;
    setIsSaving(true);

    try {
      const result = entryBeingEdited
        ? await updateVocabularyAction(entryBeingEdited.id, draft)
        : await createVocabularyAction(draft);

      if (!result.ok) return result.error;

      if (entryBeingEdited) {
        setEntries((currentEntries) =>
          replaceVocabularyEntry(currentEntries, result.data),
        );
        setEditingEntry((currentEntry) =>
          currentEntry?.id === entryBeingEdited.id
            ? null
            : currentEntry,
        );
      } else {
        setEntries((currentEntries) =>
          insertVocabularyEntry(currentEntries, result.data),
        );
      }

      return null;
    } catch {
      return "No se pudo completar la operación. Inténtalo de nuevo.";
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }

  async function confirmDelete(id: string) {
    if (isSavingRef.current) return;

    setDeletingId(id);
    setDeleteError(null);

    try {
      const result = await deleteVocabularyAction(id);

      if (!result.ok) {
        setDeleteError({ id, message: result.error });
        return;
      }

      setEntries((currentEntries) =>
        removeVocabularyEntry(currentEntries, result.data.id),
      );
      setConfirmingDeleteId(null);
      setEditingEntry((currentEntry) =>
        currentEntry?.id === result.data.id ? null : currentEntry,
      );
    } catch {
      setDeleteError({
        id,
        message:
          "No se pudo completar la operación. Inténtalo de nuevo.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <VocabularyForm
        disabledMessage={
          initialLoadError
            ? "Recarga la página para recuperar tu colección antes de guardar cambios."
            : null
        }
        editingEntry={editingEntry}
        isDisabled={initialLoadError !== null || deletingId !== null}
        isSaving={isSaving}
        key={editingEntry?.id ?? "create"}
        onCancelEdit={() => setEditingEntry(null)}
        onSave={saveEntry}
      />
      <VocabularyList
        confirmingDeleteId={confirmingDeleteId}
        deleteError={deleteError}
        deletingId={deletingId}
        entries={entries}
        isSaving={isSaving}
        loadError={initialLoadError}
        onCancelDelete={() => {
          setConfirmingDeleteId(null);
          setDeleteError(null);
        }}
        onConfirmDelete={confirmDelete}
        onEdit={(entry) => {
          setEditingEntry(entry);
          setConfirmingDeleteId(null);
          setDeleteError(null);
        }}
        onRequestDelete={(id) => {
          setConfirmingDeleteId(id);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
