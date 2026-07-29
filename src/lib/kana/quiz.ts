import type {
  KanaCharacter,
  KanaQuizPerformance,
  KanaQuizScope,
  KanaSoundRow,
} from "@/types/kana";

export type KanaQuizCategory = "basic" | "dakuten" | "handakuten";

type KanaQuizSelection = {
  category: KanaQuizCategory;
  characters: KanaCharacter[];
  learnedKeys: ReadonlySet<string>;
  performance: KanaQuizPerformance[];
  random?: () => number;
  row: KanaSoundRow;
  scope: KanaQuizScope;
  size: number;
};

function getCategory(character: KanaCharacter): KanaQuizCategory {
  if (character.group === "dakuten") return "dakuten";
  if (character.group === "handakuten") return "handakuten";
  return "basic";
}

function getPerformanceMap(
  performance: KanaQuizPerformance[],
): Map<string, KanaQuizPerformance> {
  return new Map(
    performance.map((item) => [item.characterKey, item]),
  );
}

export function getKanaQuizCandidates({
  category,
  characters,
  learnedKeys,
  performance,
  row,
  scope,
}: Omit<KanaQuizSelection, "random" | "size">): KanaCharacter[] {
  const performanceMap = getPerformanceMap(performance);

  switch (scope) {
    case "learned":
      return characters.filter((character) =>
        learnedKeys.has(character.key),
      );
    case "category":
      return characters.filter(
        (character) => getCategory(character) === category,
      );
    case "row":
      return characters.filter(
        (character) => character.soundRow === row,
      );
    case "mistakes":
      return characters.filter((character) => {
        const result = performanceMap.get(character.key);
        return Boolean(
          result &&
            result.correctAnswers / result.totalAnswers < 0.8,
        );
      });
    case "all":
      return characters;
  }
}

function getSelectionWeight(
  character: KanaCharacter,
  performanceMap: ReadonlyMap<string, KanaQuizPerformance>,
): number {
  const result = performanceMap.get(character.key);

  if (!result || result.totalAnswers === 0) return 3;

  const errors = result.totalAnswers - result.correctAnswers;
  const errorRate = errors / result.totalAnswers;
  return 1 + errorRate * 4 + Math.min(errors, 4) * 0.5;
}

export function createAdaptiveKanaQuiz({
  category,
  characters,
  learnedKeys,
  performance,
  random = Math.random,
  row,
  scope,
  size,
}: KanaQuizSelection): KanaCharacter[] {
  const performanceMap = getPerformanceMap(performance);
  const remaining = getKanaQuizCandidates({
    category,
    characters,
    learnedKeys,
    performance,
    row,
    scope,
  }).map((character) => ({
    character,
    weight: getSelectionWeight(character, performanceMap),
  }));
  const selected: KanaCharacter[] = [];

  while (remaining.length && selected.length < size) {
    const totalWeight = remaining.reduce(
      (total, item) => total + item.weight,
      0,
    );
    let target = random() * totalWeight;
    let selectedIndex = remaining.length - 1;

    for (let index = 0; index < remaining.length; index += 1) {
      target -= remaining[index].weight;
      if (target <= 0) {
        selectedIndex = index;
        break;
      }
    }

    selected.push(remaining[selectedIndex].character);
    remaining.splice(selectedIndex, 1);
  }

  return selected;
}

export function createAdaptiveMixedKanaQuiz({
  category,
  hiragana,
  katakana,
  learnedKeys,
  performance,
  random = Math.random,
  row,
  scope,
  size,
}: Omit<KanaQuizSelection, "characters"> & {
  hiragana: KanaCharacter[];
  katakana: KanaCharacter[];
}): KanaCharacter[] {
  const hiraganaSize = Math.ceil(size / 2);
  const katakanaSize = size - hiraganaSize;
  const commonSelection = {
    category,
    learnedKeys,
    performance,
    random,
    row,
    scope,
  };
  const selected = [
    ...createAdaptiveKanaQuiz({
      ...commonSelection,
      characters: hiragana,
      size: hiraganaSize,
    }),
    ...createAdaptiveKanaQuiz({
      ...commonSelection,
      characters: katakana,
      size: katakanaSize,
    }),
  ];
  const selectedKeys = new Set(
    selected.map((character) => character.key),
  );

  if (selected.length < size) {
    const remainingCharacters = getKanaQuizCandidates({
      category,
      characters: [...hiragana, ...katakana],
      learnedKeys,
      performance,
      row,
      scope,
    }).filter((character) => !selectedKeys.has(character.key));

    selected.push(
      ...createAdaptiveKanaQuiz({
        ...commonSelection,
        characters: remainingCharacters,
        scope: "all",
        size: size - selected.length,
      }),
    );
  }

  for (let index = selected.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [selected[index], selected[target]] = [
      selected[target],
      selected[index],
    ];
  }

  return selected;
}
