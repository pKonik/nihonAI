"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import {
  AccountAuthenticationError,
  removeAvatar,
  updateDisplayName,
  uploadAvatar,
} from "@/lib/account/data";
import {
  parseAvatar,
  parseDisplayName,
} from "@/lib/account/validation";
import { getI18n } from "@/lib/i18n/server";
import type { AccountActionState } from "@/types/account";

function refreshAccountViews() {
  revalidatePath("/cuenta");
  revalidatePath("/inicio");
}

function safeError(
  error: unknown,
  authMessage: string,
  fallbackMessage: string,
) {
  return error instanceof AccountAuthenticationError
    ? authMessage
    : fallbackMessage;
}

export async function updateDisplayNameAction(
  _state: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const { dictionary } = await getI18n();
  const text = dictionary.account;
  const parsed = parseDisplayName(formData.get("displayName"));

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error === "tooLong"
          ? text.feedback.nameTooLong
          : text.feedback.nameRequired,
    };
  }

  try {
    await updateDisplayName(parsed.data);
    refreshAccountViews();
    return { status: "success", message: text.feedback.nameSaved };
  } catch (error) {
    console.error("No se pudo actualizar el nombre visible.", error);
    return {
      status: "error",
      message: safeError(
        error,
        text.feedback.authExpired,
        text.feedback.saveFailed,
      ),
    };
  }
}

export async function uploadAvatarAction(
  _state: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const { dictionary } = await getI18n();
  const text = dictionary.account;
  const parsed = parseAvatar(formData.get("avatar"));

  if (!parsed.success) {
    const messages = {
      required: text.feedback.avatarRequired,
      tooLarge: text.feedback.avatarTooLarge,
      invalidType: text.feedback.avatarInvalidType,
    };
    return { status: "error", message: messages[parsed.error] };
  }

  try {
    await uploadAvatar(parsed.data);
    refreshAccountViews();
    return { status: "success", message: text.feedback.avatarSaved };
  } catch (error) {
    console.error("No se pudo actualizar el avatar.", error);
    return {
      status: "error",
      message: safeError(
        error,
        text.feedback.authExpired,
        text.feedback.avatarFailed,
      ),
    };
  }
}

export async function removeAvatarAction(
  _state: AccountActionState,
  _formData: FormData,
): Promise<AccountActionState> {
  void _state;
  void _formData;
  const { dictionary } = await getI18n();
  const text = dictionary.account;

  try {
    await removeAvatar();
    refreshAccountViews();
    return { status: "success", message: text.feedback.avatarRemoved };
  } catch (error) {
    console.error("No se pudo eliminar el avatar.", error);
    return {
      status: "error",
      message: safeError(
        error,
        text.feedback.authExpired,
        text.feedback.avatarFailed,
      ),
    };
  }
}
