import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
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
  text: Dictionary["vocabulary"];
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
  "w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100 disabled:cursor-not-allowed disabled:bg-washi-100 disabled:text-sumi-500";

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
  text,
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
      setError(text.errors.requiredFields);
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
      setError(text.errors.operationFailed);
    }
  }

  return (
    <section className="rounded-3xl border border-washi-200 bg-washi-50 p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
          {editingEntry
            ? text.form.editEyebrow
            : text.form.newEyebrow}
        </p>
        <h2
          className="mt-2 text-2xl font-bold text-sumi-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600"
          ref={headingRef}
          tabIndex={-1}
        >
          {editingEntry ? text.form.editTitle : text.form.addTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-sumi-600">
          {text.form.requiredHelp}
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
            className="mb-2 block text-sm font-medium text-sumi-800"
            htmlFor="word"
          >
            {text.form.word}
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
            className="mb-2 block text-sm font-medium text-sumi-800"
            htmlFor="reading"
          >
            {text.form.reading}
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
            className="mb-2 block text-sm font-medium text-sumi-800"
            htmlFor="meaning"
          >
            {text.form.meaning}
          </label>
          <input
            className={FIELD_CLASSES}
            id="meaning"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.meaning}
            name="meaning"
            value={values.meaning}
            onChange={(event) => updateField("meaning", event.target.value)}
            placeholder={text.form.meaningPlaceholder}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-sumi-800"
              htmlFor="partOfSpeech"
            >
              {text.form.wordType}
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
                  {text.form.wordTypes[wordType]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-sumi-800"
              htmlFor="jlptLevel"
            >
              {text.form.jlpt}
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
                  {level === "Sin clasificar"
                    ? text.form.unclassified
                    : level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-sumi-800"
            htmlFor="example"
          >
            {text.form.example}
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
            className="mb-2 block text-sm font-medium text-sumi-800"
            htmlFor="source"
          >
            {text.form.source}
          </label>
          <input
            className={FIELD_CLASSES}
            id="source"
            disabled={isFormDisabled}
            maxLength={VOCABULARY_FIELD_LIMITS.source}
            name="source"
            value={values.source}
            onChange={(event) => updateField("source", event.target.value)}
            placeholder={text.form.sourcePlaceholder}
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
            className="flex-1 rounded-xl bg-sumi-950 px-5 py-3 font-semibold text-washi-50 transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isFormDisabled}
            type="submit"
          >
            {isSaving
              ? editingEntry
                ? text.form.savingChanges
                : text.form.saving
              : editingEntry
                ? text.form.saveChanges
                : text.form.saveWord}
          </button>

          {editingEntry ? (
            <button
              className="rounded-xl border border-washi-300 bg-white px-5 py-3 font-semibold text-sumi-800 transition hover:border-sumi-500 hover:bg-washi-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isFormDisabled}
              onClick={onCancelEdit}
              type="button"
            >
              {text.form.cancel}
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
