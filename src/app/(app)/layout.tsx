import { redirect } from "next/navigation";

import { AppShell } from "@/components/navigation/AppShell";
import { getShellProfile } from "@/lib/account/data";
import { getI18n } from "@/lib/i18n/server";
import { getSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!getSupabaseConfig()) {
    redirect("/login?setup=missing");
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;

  if (!claims) {
    redirect("/login");
  }

  const { locale, dictionary } = await getI18n();
  const userId =
    typeof claims.sub === "string" ? claims.sub : "";
  const email =
    typeof claims.email === "string"
      ? claims.email
      : dictionary.shell.userFallback;
  const profile = userId ? await getShellProfile(userId) : null;
  const displayName =
    profile?.displayName ||
    email.split("@")[0] ||
    dictionary.shell.userFallback;

  return (
    <AppShell
      avatarVersion={profile?.updatedAt}
      displayName={displayName}
      email={email}
      hasAvatar={Boolean(profile?.avatarPath)}
      initialOnboardingOpen={Boolean(
        profile && !profile.onboardingCompletedAt,
      )}
      locale={locale}
      text={dictionary}
    >
      {children}
    </AppShell>
  );
}
