import "server-only";

import { createClient } from "@/lib/supabase/server";
import { calculateKanaQuizStats } from "@/lib/kana/stats";
import type {
  KanaQuizPerformance,
  KanaQuizStats,
} from "@/types/kana";

type KanaProgressRow = {
  character_key: string;
};

type KanaQuizStudyDateRow = {
  study_date: string;
};

type KanaQuizAttemptRow = {
  character_key: string;
  is_correct: boolean;
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

export async function setKanaGroupLearned(
  characterKeys: string[],
  learned: boolean,
): Promise<void> {
  const { supabase, user } = await getAuthenticatedContext();

  if (learned) {
    const learnedAt = new Date().toISOString();
    const { error } = await supabase.from("kana_progress").upsert(
      characterKeys.map((characterKey) => ({
        character_key: characterKey,
        learned_at: learnedAt,
        user_id: user.id,
      })),
      { onConflict: "user_id,character_key" },
    );

    if (error) throw error;
    return;
  }

  const { error } = await supabase
    .from("kana_progress")
    .delete()
    .eq("user_id", user.id)
    .in("character_key", characterKeys);

  if (error) throw error;
}

export async function getKanaQuizStats(): Promise<KanaQuizStats> {
  const { supabase, user } = await getAuthenticatedContext();
  const [totalResult, correctResult, datesResult] = await Promise.all([
    supabase
      .from("kana_quiz_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("kana_quiz_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_correct", true),
    supabase
      .from("kana_quiz_attempts")
      .select("study_date")
      .eq("user_id", user.id)
      .order("study_date")
      .overrideTypes<KanaQuizStudyDateRow[], { merge: false }>(),
  ]);

  if (totalResult.error) throw totalResult.error;
  if (correctResult.error) throw correctResult.error;
  if (datesResult.error) throw datesResult.error;

  return calculateKanaQuizStats(
    totalResult.count ?? 0,
    correctResult.count ?? 0,
    datesResult.data.map((row) => row.study_date),
  );
}

export async function getKanaQuizPerformance(): Promise<
  KanaQuizPerformance[]
> {
  const { supabase, user } = await getAuthenticatedContext();
  const { data, error } = await supabase
    .from("kana_quiz_attempts")
    .select("character_key, is_correct")
    .eq("user_id", user.id)
    .overrideTypes<KanaQuizAttemptRow[], { merge: false }>();

  if (error) throw error;

  const performance = new Map<string, KanaQuizPerformance>();

  data.forEach((row) => {
    const current = performance.get(row.character_key) ?? {
      characterKey: row.character_key,
      correctAnswers: 0,
      totalAnswers: 0,
    };

    current.totalAnswers += 1;
    if (row.is_correct) current.correctAnswers += 1;
    performance.set(row.character_key, current);
  });

  return [...performance.values()];
}

export async function recordKanaQuizAttempt(
  characterKey: string,
  correct: boolean,
): Promise<void> {
  const { supabase, user } = await getAuthenticatedContext();
  const { error } = await supabase.from("kana_quiz_attempts").insert({
    character_key: characterKey,
    is_correct: correct,
    user_id: user.id,
  });

  if (error) throw error;
}
