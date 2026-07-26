import { NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const destination = new URL("/login", requestUrl.origin);

  if (!getSupabaseConfig()) {
    destination.searchParams.set("setup", "missing");
    return NextResponse.redirect(destination);
  }

  if (!code) {
    destination.searchParams.set(
      "error",
      "El enlace de confirmación no es válido.",
    );
    return NextResponse.redirect(destination);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    destination.searchParams.set(
      "error",
      "No se pudo confirmar la cuenta. Solicita un enlace nuevo.",
    );
    return NextResponse.redirect(destination);
  }

  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
