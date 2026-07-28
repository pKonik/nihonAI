import "server-only";

import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  parseLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function getLocale() {
  const cookieStore = await cookies();

  return (
    parseLocale(cookieStore.get(LOCALE_COOKIE)?.value) ?? DEFAULT_LOCALE
  );
}

export async function getI18n() {
  const locale = await getLocale();

  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
