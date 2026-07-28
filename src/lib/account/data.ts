import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  AccountOverview,
  AccountProfile,
} from "@/types/account";

type ProfileRow = {
  display_name: string | null;
  avatar_path: string | null;
  updated_at: string;
};

export class AccountAuthenticationError extends Error {}

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new AccountAuthenticationError(
      "No existe una sesión autenticada.",
    );
  }

  return { supabase, user: data.user };
}

function toAccountProfile(row: ProfileRow): AccountProfile {
  return {
    displayName: row.display_name,
    avatarPath: row.avatar_path,
    updatedAt: row.updated_at,
  };
}

export async function getShellProfile(
  userId: string,
): Promise<AccountProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, avatar_path, updated_at")
    .eq("user_id", userId)
    .maybeSingle()
    .overrideTypes<ProfileRow | null, { merge: false }>();

  if (error) {
    console.error("No se pudo cargar el perfil de la navegación.", error);
    return null;
  }

  return data ? toAccountProfile(data) : null;
}

export async function getAccountOverview(): Promise<AccountOverview> {
  const { supabase, user } = await getAuthenticatedContext();
  const [profileResult, vocabularyResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, avatar_path, updated_at")
      .eq("user_id", user.id)
      .single()
      .overrideTypes<ProfileRow, { merge: false }>(),
    supabase
      .from("vocabulary_entries")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (vocabularyResult.error) throw vocabularyResult.error;

  return {
    ...toAccountProfile(profileResult.data),
    email: user.email ?? "",
    joinedAt: user.created_at,
    vocabularyCount: vocabularyResult.count ?? 0,
  };
}

export async function updateDisplayName(displayName: string) {
  const { supabase, user } = await getAuthenticatedContext();
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName })
    .eq("user_id", user.id);

  if (error) throw error;
}

export async function uploadAvatar(file: File) {
  const { supabase, user } = await getAuthenticatedContext();
  const avatarPath = `${user.id}/avatar`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarPath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_path: avatarPath })
    .eq("user_id", user.id);

  if (profileError) throw profileError;
}

export async function removeAvatar() {
  const { supabase, user } = await getAuthenticatedContext();
  const avatarPath = `${user.id}/avatar`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .remove([avatarPath]);

  if (storageError) throw storageError;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_path: null })
    .eq("user_id", user.id);

  if (profileError) throw profileError;
}
