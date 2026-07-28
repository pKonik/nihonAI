import "server-only";

import { createClient } from "@/lib/supabase/server";

type KanaProgressRow = {
  character_key: string;
};

export class KanaAuthenticationError extends Error {}

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new KanaAuthenticationError(
      "No existe una sesión autenticada.",
    );
  }

  return { supabase, user: data.user };
}

export async function getLearnedKanaKeys(): Promise<string[]> {
  const { supabase, user } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("kana_progress")
    .select("character_key")
    .eq("user_id", user.id)
    .order("character_key")
    .overrideTypes<KanaProgressRow[], { merge: false }>();

  if (error) throw error;

  return data.map((row) => row.character_key);
}

export async function setKanaLearned(
  characterKey: string,
  learned: boolean,
): Promise<void> {
  const { supabase, user } = await getAuthenticatedContext();

  if (learned) {
    const { error } = await supabase.from("kana_progress").upsert(
      {
        character_key: characterKey,
        learned_at: new Date().toISOString(),
        user_id: user.id,
      },
      { onConflict: "user_id,character_key" },
    );

    if (error) throw error;
    return;
  }

  const { error } = await supabase
    .from("kana_progress")
    .delete()
    .eq("user_id", user.id)
    .eq("character_key", characterKey);

  if (error) throw error;
}
