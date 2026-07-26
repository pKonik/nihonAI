import { createBrowserClient } from "@supabase/ssr";

import { requireSupabaseConfig } from "@/lib/supabase/env";

export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();

  return createBrowserClient(url, publishableKey);
}
