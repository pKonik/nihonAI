import { redirect } from "next/navigation";

import { AppShell } from "@/components/navigation/AppShell";
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
  const email =
    typeof claims.email === "string"
      ? claims.email
      : dictionary.shell.userFallback;

  return (
    <AppShell
      email={email}
      locale={locale}
      text={dictionary}
    >
      {children}
    </AppShell>
  );
}
