import type { KanaQuizStats } from "@/types/kana";

function previousDate(date: string): string {
  const value = new Date(`${date}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() - 1);
  return value.toISOString().slice(0, 10);
}

export function calculateKanaQuizStats(
  totalAnswers: number,
  correctAnswers: number,
  studyDates: string[],
  today = new Date().toISOString().slice(0, 10),
): KanaQuizStats {
  const uniqueDates = new Set(studyDates);
  const latestDate = [...uniqueDates].sort().at(-1);
  const yesterday = previousDate(today);
  let currentStreak = 0;

  if (latestDate === today || latestDate === yesterday) {
    let expectedDate = latestDate;

    while (uniqueDates.has(expectedDate)) {
      currentStreak += 1;
      expectedDate = previousDate(expectedDate);
    }
  }

  return {
    activeDays: uniqueDates.size,
    correctAnswers,
    currentStreak,
    totalAnswers,
  };
}
