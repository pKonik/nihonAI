export class VocabularyAuthenticationError extends Error {}

export class VocabularyNotFoundError extends Error {}

export type VocabularyMutationErrorCode =
  | "authExpired"
  | "notFound"
  | "operationFailed";

export function safeVocabularyMutationError(
  error: unknown,
): VocabularyMutationErrorCode {
  if (error instanceof VocabularyAuthenticationError) {
    return "authExpired";
  }

  if (error instanceof VocabularyNotFoundError) {
    return "notFound";
  }

  return "operationFailed";
}
