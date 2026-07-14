import type { CardProgress, ReviewGrade } from "./types";

const QUALITY: Record<ReviewGrade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

const STARTING_EASINESS = 2.5;
const MIN_EASINESS = 1.3;

export function newCardProgress(cardId: string): CardProgress {
  return {
    cardId,
    easiness: STARTING_EASINESS,
    intervalDays: 0,
    repetitions: 0,
    dueDate: new Date().toISOString(),
    lastReviewed: null,
  };
}

/**
 * Apply one SM-2 review. The calculation accepts persisted data defensively:
 * older/corrupt localStorage values cannot create a zero-day mature-card loop
 * or an invalid due date.
 */
export function reviewCard(
  progress: CardProgress,
  grade: ReviewGrade,
): CardProgress {
  const quality = QUALITY[grade];
  const now = new Date();
  const previousEasiness = Number.isFinite(progress.easiness)
    ? Math.max(MIN_EASINESS, progress.easiness)
    : STARTING_EASINESS;
  const previousInterval = Number.isFinite(progress.intervalDays)
    ? Math.max(1, Math.round(progress.intervalDays))
    : 1;
  const previousRepetitions = Number.isFinite(progress.repetitions)
    ? Math.max(0, Math.floor(progress.repetitions))
    : 0;

  const easiness = Math.max(
    MIN_EASINESS,
    previousEasiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  let repetitions: number;
  let intervalDays: number;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions = previousRepetitions + 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.max(1, Math.round(previousInterval * easiness));
  }

  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + intervalDays);

  return {
    cardId: progress.cardId,
    easiness,
    intervalDays,
    repetitions,
    dueDate: dueDate.toISOString(),
    lastReviewed: now.toISOString(),
  };
}

export function isDue(
  progress: CardProgress | undefined,
  now: Date = new Date(),
): boolean {
  if (!progress) return true;
  const dueTime = Date.parse(progress.dueDate);
  // Treat invalid persisted dates as due rather than hiding a card forever.
  return !Number.isFinite(dueTime) || dueTime <= now.getTime();
}

export function previewInterval(
  progress: CardProgress | undefined,
  grade: ReviewGrade,
): string {
  const next = reviewCard(progress ?? newCardProgress("preview"), grade);
  const days = next.intervalDays;
  if (days <= 0) return "later today";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  if (days < 30) return `in ${Math.round(days / 7)} wk`;
  if (days < 365) return `in ${Math.round(days / 30)} mo`;
  return `in ${Math.round(days / 365)} yr`;
}
