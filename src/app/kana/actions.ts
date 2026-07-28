"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import { isKanaKey } from "@/lib/kana/catalog";
import {
  KanaAuthenticationError,
  setKanaLearned,
} from "@/lib/kana/data";
import { getI18n } from "@/lib/i18n/server";
import type { KanaMutationResult } from "@/types/kana";

export async function setKanaProgressAction(
  characterKey: unknown,
  learned: unknown,
): Promise<KanaMutationResult> {
  const { dictionary } = await getI18n();

  if (!isKanaKey(characterKey) || typeof learned !== "boolean") {
    return {
      ok: false,
      error: dictionary.kana.feedback.invalidCharacter,
    };
  }

  try {
    await setKanaLearned(characterKey, learned);
    revalidatePath("/kana");
    return { ok: true, learned };
  } catch (error) {
    console.error("No se pudo actualizar el progreso de kana.", error);
    return {
      ok: false,
      error:
        error instanceof KanaAuthenticationError
          ? dictionary.kana.feedback.authExpired
          : dictionary.kana.feedback.saveFailed,
    };
  }
}
