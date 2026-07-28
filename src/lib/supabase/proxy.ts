import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isPublicPath } from "@/lib/auth/paths";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  const config = getSupabaseConfig();
  const pathname = request.nextUrl.pathname;

  if (!config) {
    if (isPublicPath(pathname)) {
      return NextResponse.next({ request });
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("setup", "missing");
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    config.url,
    config.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([name, value]) => {
            response.headers.set(name, value);
          });
        },
      },
    },
  );

  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;

  if (!claims && !isPublicPath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  if (claims && pathname === "/login") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/inicio";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return response;
}
