"use server";

import { cookies, headers } from "next/headers";

import {
  LOCALE_COOKIE,
  parseLocale,
} from "@/lib/i18n/config";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function setLocaleAction(formData: FormData) {
  const locale = parseLocale(formData.get("locale"));

  if (!locale) {
    return;
  }

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const isHttps =
    requestHeaders.get("x-forwarded-proto") === "https" ||
    origin?.startsWith("https://") === true;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    httpOnly: true,
    maxAge: ONE_YEAR_IN_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: isHttps,
  });
}
