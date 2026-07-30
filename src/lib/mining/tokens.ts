export type MiningToken = {
  dictionaryForm: string;
  reading: string;
  searchable: boolean;
  surface: string;
};

export type MorphologicalToken = MiningToken & {
  partOfSpeech: string;
  partOfSpeechDetail: string;
};

function isIndependentPredicate(token: MorphologicalToken): boolean {
  return (
    token.searchable &&
    (token.partOfSpeech === "動詞" ||
      token.partOfSpeech === "形容詞") &&
    token.partOfSpeechDetail !== "非自立" &&
    token.partOfSpeechDetail !== "接尾"
  );
}

function isPredicateContinuation(token: MorphologicalToken): boolean {
  return (
    token.partOfSpeech === "助動詞" ||
    ((token.partOfSpeech === "動詞" ||
      token.partOfSpeech === "形容詞") &&
      token.partOfSpeechDetail === "非自立") ||
    (token.partOfSpeech === "助詞" &&
      token.partOfSpeechDetail === "接続助詞")
  );
}

function isSuruStem(
  token: MorphologicalToken,
  next: MorphologicalToken | undefined,
): boolean {
  return (
    token.partOfSpeech === "名詞" &&
    token.partOfSpeechDetail === "サ変接続" &&
    next?.partOfSpeech === "動詞" &&
    next.dictionaryForm === "する"
  );
}

function isCopulaStart(
  token: MorphologicalToken,
  next: MorphologicalToken | undefined,
): boolean {
  return (
    token.searchable &&
    (token.partOfSpeech === "名詞" ||
      token.partOfSpeech === "形容動詞") &&
    next?.partOfSpeech === "助動詞" &&
    (next.dictionaryForm === "だ" || next.dictionaryForm === "です")
  );
}

function mergeTokens(
  tokens: readonly MorphologicalToken[],
  start: number,
  end: number,
  dictionaryForm: string,
): MiningToken {
  return {
    dictionaryForm,
    reading: tokens
      .slice(start, end)
      .map((token) => token.reading)
      .join(""),
    searchable: true,
    surface: tokens
      .slice(start, end)
      .map((token) => token.surface)
      .join(""),
  };
}

export function groupMiningTokens(
  tokens: readonly MorphologicalToken[],
): readonly MiningToken[] {
  const grouped: MiningToken[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const next = tokens[index + 1];
    const suruStem = isSuruStem(token, next);
    const predicateStart =
      isIndependentPredicate(token) || suruStem || isCopulaStart(token, next);

    if (!predicateStart) {
      grouped.push(token);
      continue;
    }

    let end = index + 1;
    let dictionaryForm = token.dictionaryForm;

    if (suruStem && next) {
      end += 1;
      dictionaryForm = `${token.surface}${next.dictionaryForm}`;
    }

    while (
      end < tokens.length &&
      isPredicateContinuation(tokens[end])
    ) {
      end += 1;
    }

    grouped.push(
      mergeTokens(tokens, index, end, dictionaryForm),
    );
    index = end - 1;
  }

  return grouped;
}
