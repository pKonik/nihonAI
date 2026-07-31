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
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type {
  VocabularyDraft,
  VocabularyEntry,
} from "@/types/vocabulary";

type VocabularyAppProps = {
  initialEntries: VocabularyEntry[];
  initialLoadError: string | null;
  locale: Locale;
  text: Dictionary["vocabulary"];
};

type DeleteError = {
  id: string;
  message: string;
} | null;

export function VocabularyApp({
  initialEntries,
  initialLoadError,
  locale,
  text,
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
      return text.errors.reloadBeforeModify;
    }

    if (deletingId) {
      return text.errors.waitForDelete;
    }

    if (isSavingRef.current) {
      return text.errors.saveInProgress;
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
      return text.errors.operationFailed;
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
          text.errors.operationFailed,
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <VocabularyForm
        disabledMessage={
          initialLoadError ? text.errors.disabled : null
        }
        editingEntry={editingEntry}
        isDisabled={initialLoadError !== null || deletingId !== null}
        isSaving={isSaving}
        initialDraft={{
          word: "",
          reading: "",
          meaning: "",
          meaningLanguage: locale,
          partOfSpeech: "Sustantivo",
          jlptLevel: "N5",
          example: "",
          source: "",
        }}
        key={editingEntry?.id ?? "create"}
        onCancelEdit={() => setEditingEntry(null)}
        onSave={saveEntry}
        text={text}
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
        text={text}
      />
    </div>
  );
}
