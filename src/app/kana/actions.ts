"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import {
  checkKanaQuizAnswer,
  getKanaQuizAnswers,
  isKanaKey,
  normalizeKanaQuizAnswer,
} from "@/lib/kana/catalog";
import {
  getKanaQuizStats,
  KanaAuthenticationError,
  recordKanaQuizAttempt,
  setKanaGroupLearned,
  setKanaLearned,
} from "@/lib/kana/data";
import { getI18n } from "@/lib/i18n/server";
import type {
  KanaMutationResult,
  KanaQuizAnswerResult,
} from "@/types/kana";

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

export async function setKanaGroupProgressAction(
  characterKeys: unknown,
  learned: unknown,
): Promise<KanaMutationResult> {
  const { dictionary } = await getI18n();
  const uniqueKeys =
    Array.isArray(characterKeys) &&
    characterKeys.length > 0 &&
    characterKeys.length <= 71
      ? [...new Set(characterKeys)]
      : [];

  if (
    uniqueKeys.length === 0 ||
    uniqueKeys.length !== (Array.isArray(characterKeys) ? characterKeys.length : 0) ||
    !uniqueKeys.every(isKanaKey) ||
    typeof learned !== "boolean"
  ) {
    return {
      ok: false,
      error: dictionary.kana.feedback.invalidCharacter,
    };
  }

  try {
    await setKanaGroupLearned(uniqueKeys, learned);
    revalidatePath("/kana");
    return { ok: true, learned };
  } catch (error) {
    console.error("No se pudo actualizar el progreso de la fila kana.", error);
    return {
      ok: false,
      error:
        error instanceof KanaAuthenticationError
          ? dictionary.kana.feedback.authExpired
          : dictionary.kana.feedback.saveFailed,
    };
  }
}

export async function answerKanaQuizAction(
  characterKey: unknown,
  answer: unknown,
): Promise<KanaQuizAnswerResult> {
  const { dictionary } = await getI18n();
  const normalizedAnswer =
    typeof answer === "string" ? normalizeKanaQuizAnswer(answer) : "";

  if (
    !isKanaKey(characterKey) ||
    !normalizedAnswer ||
    normalizedAnswer.length > 12 ||
    !/^[a-z]+$/.test(normalizedAnswer)
  ) {
    return {
      ok: false,
      error: dictionary.kana.quiz.invalidAnswer,
    };
  }

  const acceptedAnswers = getKanaQuizAnswers(characterKey);
  if (!acceptedAnswers) {
    return {
      ok: false,
      error: dictionary.kana.feedback.invalidCharacter,
    };
  }

  try {
    const correct = checkKanaQuizAnswer(characterKey, normalizedAnswer);
    await recordKanaQuizAttempt(characterKey, correct);
    let stats;

    try {
      stats = await getKanaQuizStats();
    } catch (statsError) {
      console.error(
        "La respuesta se guardó, pero no se pudieron actualizar las estadísticas.",
        statsError,
      );
    }

    return {
      correct,
      expectedAnswer: acceptedAnswers.join(" / "),
      ok: true,
      stats,
    };
  } catch (error) {
    console.error("No se pudo registrar la respuesta del quiz de kana.", error);
    return {
      ok: false,
      error:
        error instanceof KanaAuthenticationError
          ? dictionary.kana.feedback.authExpired
          : dictionary.kana.quiz.saveFailed,
    };
  }
}
