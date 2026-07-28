import { redirect } from "next/navigation";

import { AppShell } from "@/components/navigation/AppShell";
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

  const email =
    typeof claims.email === "string" ? claims.email : "usuario";

  return <AppShell email={email}>{children}</AppShell>;
}
