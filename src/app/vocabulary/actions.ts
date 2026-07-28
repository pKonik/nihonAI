"use server";

import "server-only";

import {
  createVocabularyEntry,
  deleteVocabularyEntry,
  updateVocabularyEntry,
} from "@/lib/vocabulary/data";
import { getI18n } from "@/lib/i18n/server";
import { safeVocabularyMutationError } from "@/lib/vocabulary/errors";
import {
  parseVocabularyDraft,
  parseVocabularyId,
} from "@/lib/vocabulary/validation";
import type {
  VocabularyEntry,
  VocabularyResult,
} from "@/types/vocabulary";

export async function createVocabularyAction(
  value: unknown,
): Promise<VocabularyResult<VocabularyEntry>> {
  const { dictionary } = await getI18n();
  const errors = dictionary.vocabulary.errors;
  const parsed = parseVocabularyDraft(value);
  if (!parsed.success) {
    return { ok: false, error: errors[parsed.error] };
  }

  try {
    return {
      ok: true,
      data: await createVocabularyEntry(parsed.data),
    };
  } catch (error) {
    console.error("No se pudo crear la entrada de vocabulario.", error);
    return {
      ok: false,
      error: errors[safeVocabularyMutationError(error)],
    };
  }
}

export async function updateVocabularyAction(
  idValue: unknown,
  value: unknown,
): Promise<VocabularyResult<VocabularyEntry>> {
  const { dictionary } = await getI18n();
  const errors = dictionary.vocabulary.errors;
  const id = parseVocabularyId(idValue);
  const parsed = parseVocabularyDraft(value);

  if (!id) {
    return { ok: false, error: errors.invalidEntry };
  }

  if (!parsed.success) {
    return { ok: false, error: errors[parsed.error] };
  }

  try {
    return {
      ok: true,
      data: await updateVocabularyEntry(id, parsed.data),
    };
  } catch (error) {
    console.error(
      "No se pudo actualizar la entrada de vocabulario.",
      error,
    );
    return {
      ok: false,
      error: errors[safeVocabularyMutationError(error)],
    };
  }
}

export async function deleteVocabularyAction(
  idValue: unknown,
): Promise<VocabularyResult<{ id: string }>> {
  const { dictionary } = await getI18n();
  const errors = dictionary.vocabulary.errors;
  const id = parseVocabularyId(idValue);
  if (!id) {
    return { ok: false, error: errors.invalidEntry };
  }

  try {
    return {
      ok: true,
      data: { id: await deleteVocabularyEntry(id) },
    };
  } catch (error) {
    console.error(
      "No se pudo eliminar la entrada de vocabulario.",
      error,
    );
    return {
      ok: false,
      error: errors[safeVocabularyMutationError(error)],
    };
  }
}
