import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  VocabularyAuthenticationError,
  VocabularyNotFoundError,
} from "@/lib/vocabulary/errors";
import {
  toVocabularyEntry,
  toVocabularyWrite,
  type VocabularyRow,
} from "@/lib/vocabulary/mapper";
import { createClient } from "@/lib/supabase/server";
import type {
  VocabularyDraft,
  VocabularyEntry,
} from "@/types/vocabulary";

const ENTRY_COLUMNS =
  "id, word, reading, meaning, meaning_language, part_of_speech, jlpt_level, example, source, created_at, updated_at";

type AuthenticatedContext = {
  supabase: SupabaseClient;
  userId: string;
};

async function getAuthenticatedContext(): Promise<AuthenticatedContext> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId =
    typeof data?.claims?.sub === "string" ? data.claims.sub : null;

  if (error || !userId) {
    throw new VocabularyAuthenticationError(
      "No existe una sesión autenticada.",
    );
  }

  return { supabase, userId };
}

export async function listVocabularyEntries(): Promise<VocabularyEntry[]> {
  const { supabase, userId } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("vocabulary_entries")
    .select(ENTRY_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .overrideTypes<VocabularyRow[], { merge: false }>();

  if (error) throw error;
  return data.map(toVocabularyEntry);
}

export async function createVocabularyEntry(
  draft: VocabularyDraft,
): Promise<VocabularyEntry> {
  const { supabase, userId } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("vocabulary_entries")
    .insert({ ...toVocabularyWrite(draft), user_id: userId })
    .select(ENTRY_COLUMNS)
    .single()
    .overrideTypes<VocabularyRow, { merge: false }>();

  if (error) throw error;
  return toVocabularyEntry(data);
}

export async function updateVocabularyEntry(
  id: string,
  draft: VocabularyDraft,
): Promise<VocabularyEntry> {
  const { supabase, userId } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("vocabulary_entries")
    .update(toVocabularyWrite(draft))
    .eq("id", id)
    .eq("user_id", userId)
    .select(ENTRY_COLUMNS)
    .maybeSingle()
    .overrideTypes<VocabularyRow | null, { merge: false }>();

  if (error) throw error;
  if (!data) {
    throw new VocabularyNotFoundError("La entrada no existe.");
  }

  return toVocabularyEntry(data);
}

export async function deleteVocabularyEntry(id: string): Promise<string> {
  const { supabase, userId } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("vocabulary_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle()
    .overrideTypes<{ id: string } | null, { merge: false }>();

  if (error) throw error;
  if (!data) {
    throw new VocabularyNotFoundError("La entrada no existe.");
  }

  return data.id;
}
