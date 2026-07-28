export const DISPLAY_NAME_MAX_LENGTH = 50;
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

const AVATAR_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type DisplayNameValidation =
  | { success: true; data: string }
  | { success: false; error: "required" | "tooLong" };

export type AvatarValidation =
  | { success: true; data: File }
  | {
      success: false;
      error: "required" | "tooLarge" | "invalidType";
    };

export function parseDisplayName(value: unknown): DisplayNameValidation {
  if (typeof value !== "string") {
    return { success: false, error: "required" };
  }

  const displayName = value.trim().replace(/\s+/g, " ");

  if (!displayName) {
    return { success: false, error: "required" };
  }

  if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
    return { success: false, error: "tooLong" };
  }

  return { success: true, data: displayName };
}

export function parseAvatar(value: unknown): AvatarValidation {
  if (!(value instanceof File) || value.size === 0) {
    return { success: false, error: "required" };
  }

  if (value.size > AVATAR_MAX_BYTES) {
    return { success: false, error: "tooLarge" };
  }

  if (!AVATAR_TYPES.has(value.type)) {
    return { success: false, error: "invalidType" };
  }

  return { success: true, data: value };
}
