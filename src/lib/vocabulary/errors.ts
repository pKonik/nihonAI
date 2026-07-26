export class VocabularyAuthenticationError extends Error {}

export class VocabularyNotFoundError extends Error {}

export function safeVocabularyMutationError(error: unknown): string {
  if (error instanceof VocabularyAuthenticationError) {
    return "Tu sesión ya no es válida. Vuelve a iniciar sesión.";
  }

  if (error instanceof VocabularyNotFoundError) {
    return "La entrada ya no existe o no tienes acceso a ella.";
  }

  return "No se pudo completar la operación. Inténtalo de nuevo.";
}
