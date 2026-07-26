import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { VOCABULARY_FIELD_LIMITS } from "@/lib/vocabulary/validation";
import {
  JLPT_LEVELS,
  WORD_TYPES,
  type JlptLevel,
  type VocabularyDraft,
  type VocabularyEntry,
  type WordType,
} from "@/types/vocabulary";

type VocabularyFormProps = {
  disabledMessage: string | null;
  editingEntry: VocabularyEntry | null;
  isDisabled: boolean;
  isSaving: boolean;
  onCancelEdit: () => void;
  onSave: (draft: VocabularyDraft) => Promise<string | null>;
};

const INITIAL_VALUES: VocabularyDraft = {
  word: "",
  reading: "",
  meaning: "",
  partOfSpeech: "Sustantivo",
  jlptLevel: "N5",
  example: "",
  source: "",
};

const FIELD_CLASSES =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

function getInitialValues(
  editingEntry: VocabularyEntry | null,
): VocabularyDraft {
  if (!editingEntry) return INITIAL_VALUES;

  return {
    word: editingEntry.word,
    reading: editingEntry.reading,
    meaning: editingEntry.meaning,
    partOfSpeech: editingEntry.partOfSpeech,
    jlptLevel: editingEntry.jlptLevel,
    example: editingEntry.example,
    source: editingEntry.source,
  };
}

export function VocabularyForm({
  disabledMessage,
  editingEntry,
  isDisabled,
  isSaving,
  onCancelEdit,
  onSave,
}: VocabularyFormProps) {
  const [values, setValues] = useState<VocabularyDraft>(() =>
    getInitialValues(editingEntry),
  );
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFormDisabled = isSaving || isDisabled;

  useEffect(() => {
    if (editingEntry) {
      headingRef.current?.focus();
    }
  }, [editingEntry]);

  function updateField<Key extends keyof VocabularyDraft>(
    field: Key,
    value: VocabularyDraft[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValues: VocabularyDraft = {
      ...values,
      word: values.word.trim(),
      reading: values.reading.trim(),
      meaning: values.meaning.trim(),
      example: values.example.trim(),
      source: values.source.trim(),
    };

    if (
      !normalizedValues.word ||
      !normalizedValues.reading ||
      !normalizedValues.meaning
    ) {
      setError("Completa la palabra, la lectura y el significado.");
      return;
    }

    try {
      const saveError = await onSave(normalizedValues);

      if (saveError) {
        setError(saveError);
        return;
      }

      if (!editingEntry) {
        setValues(INITIAL_VALUES);
      }
      setError("");
    } catch {
      setError(
        "No se pudo completar la operación. Inténtalo de nuevo.",
      );
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          {editingEntry ? "Editar entrada" : "Nueva entrada"}
        </p>
        <h2
          className="mt-2 text-2xl font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
          ref={headingRef}
          tabIndex={-1}
        >
          {editingEntry ? "Editar vocabulario" : "Añadir vocabulario"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Los campos marcados con * son obligatorios.
        </p>
      </div>

      <form
        aria-busy={isSaving}
        className="space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-800"
            htmlFor="word"
          >
            Palabra en japonés *
          </label>
          <input
            className={FIELD_CLASSES}
            id="word"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.word}
            name="word"
            value={values.word}
            onChange={(event) => updateField("word", event.target.value)}
            placeholder="例: 勉強"
            required
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-800"
            htmlFor="reading"
          >
            Lectura *
          </label>
          <input
            className={FIELD_CLASSES}
            id="reading"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.reading}
            name="reading"
            value={values.reading}
            onChange={(event) => updateField("reading", event.target.value)}
            placeholder="べんきょう"
            required
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-800"
            htmlFor="meaning"
          >
            Significado en español *
          </label>
          <input
            className={FIELD_CLASSES}
            id="meaning"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.meaning}
            name="meaning"
            value={values.meaning}
            onChange={(event) => updateField("meaning", event.target.value)}
            placeholder="estudio"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-800"
              htmlFor="partOfSpeech"
            >
              Tipo de palabra
            </label>
            <select
              className={FIELD_CLASSES}
              id="partOfSpeech"
              disabled={isFormDisabled}
              name="partOfSpeech"
              value={values.partOfSpeech}
              onChange={(event) =>
                updateField("partOfSpeech", event.target.value as WordType)
              }
            >
              {WORD_TYPES.map((wordType) => (
                <option key={wordType} value={wordType}>
                  {wordType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-800"
              htmlFor="jlptLevel"
            >
              Nivel JLPT
            </label>
            <select
              className={FIELD_CLASSES}
              id="jlptLevel"
              disabled={isFormDisabled}
              name="jlptLevel"
              value={values.jlptLevel}
              onChange={(event) =>
                updateField("jlptLevel", event.target.value as JlptLevel)
              }
            >
              {JLPT_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-800"
            htmlFor="example"
          >
            Frase de ejemplo
          </label>
          <textarea
            className={`${FIELD_CLASSES} min-h-24 resize-y`}
            id="example"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.example}
            name="example"
            value={values.example}
            onChange={(event) => updateField("example", event.target.value)}
            placeholder="毎日、日本語を勉強します。"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-800"
            htmlFor="source"
          >
            Fuente o etiqueta de origen
          </label>
          <input
            className={FIELD_CLASSES}
            id="source"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.source}
            name="source"
            value={values.source}
            onChange={(event) => updateField("source", event.target.value)}
            placeholder="Anime, libro, clase..."
          />
        </div>

        {disabledMessage ? (
          <p
            className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"
            role="alert"
          >
            {disabledMessage}
          </p>
        ) : null}

        {error ? (
          <p
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="flex-1 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isFormDisabled}
            type="submit"
          >
            {isSaving
              ? editingEntry
                ? "Guardando cambios..."
                : "Guardando..."
              : editingEntry
                ? "Guardar cambios"
                : "Guardar palabra"}
          </button>

          {editingEntry ? (
            <button
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isFormDisabled}
              onClick={onCancelEdit}
              type="button"
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
