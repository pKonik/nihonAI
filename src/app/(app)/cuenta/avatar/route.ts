import { createClient } from "@/lib/supabase/server";

type AvatarProfile = {
  avatar_path: string | null;
};

export async function GET() {
  const supabase = await createClient();
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    return new Response(null, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("user_id", userData.user.id)
    .single()
    .overrideTypes<AvatarProfile, { merge: false }>();

  const expectedPath = `${userData.user.id}/avatar`;
  if (
    profileError ||
    !profile.avatar_path ||
    profile.avatar_path !== expectedPath
  ) {
    return new Response(null, { status: 404 });
  }

  const { data: avatar, error: downloadError } = await supabase.storage
    .from("avatars")
    .download(expectedPath);

  if (downloadError) {
    return new Response(null, { status: 404 });
  }

  return new Response(avatar, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      "Content-Type": avatar.type || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
