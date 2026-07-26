"use client";

import { useState } from "react";

import { VocabularyForm } from "@/components/vocabulary/VocabularyForm";
import { VocabularyList } from "@/components/vocabulary/VocabularyList";
import type {
  VocabularyDraft,
  VocabularyEntry,
} from "@/types/vocabulary";

export function VocabularyApp() {
  const [entries, setEntries] = useState<VocabularyEntry[]>([]);

  function addEntry(draft: VocabularyDraft) {
    const newEntry: VocabularyEntry = {
      id: crypto.randomUUID(),
      ...draft,
    };

    setEntries((currentEntries) => [newEntry, ...currentEntries]);
  }

  function deleteEntry(id: string) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <VocabularyForm onAdd={addEntry} />
      <VocabularyList entries={entries} onDelete={deleteEntry} />
    </div>
  );
}
