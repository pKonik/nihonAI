import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { requireSupabaseConfig } from "@/lib/supabase/env";

export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = requireSupabaseConfig();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Los Server Components no pueden escribir cookies.
          // src/proxy.ts se encarga de renovar la sesión.
        }
      },
    },
  });
}
