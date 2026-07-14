import type { CardProgress, ReviewGrade } from "./types";

/**
 * SM-2 (SuperMemo-2) spaced repetition scheduler.
 *
 * SM-2 is the algorithm most modern SRS apps (Anki included) are built on
 * or descended from. It was chosen over a simpler fixed-interval scheme
 * because it adapts the review interval per card based on how easy that
 * specific card has been for this specific student — a card the student
 * always finds easy quickly moves to long intervals, while a card they
 * keep getting wrong stays in short-interval rotation until it sticks.
 * That per-card adaptivity is what the "brain" personalisation concept
 * needs: it's the same underlying idea as topic-level mastery scoring,
 * just running at the level of one atomic fact instead of one topic.
 *
 * Grading is collapsed from SM-2's original 0-5 "quality of response"
 * scale to four buttons (again / hard / good / easy), matching the
 * convention most recognisable spaced-repetition tools use today. Each
 * button maps to a quality score for the underlying formula:
 *   again = 0   hard = 3   good = 4   easy = 5
 */

const QUALITY: Record<ReviewGrade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

const STARTING_EASINESS = 2.5;
const MIN_EASINESS = 1.3;

/** A card with no prior progress starts "due now" so it enters the very
 *  first study session as a new card. */
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

/** Applies one review to a card's progress and returns the updated record.
 *  Pure function — the caller (the brain) is responsible for persisting
 *  the result. */
export function reviewCard(progress: CardProgress, grade: ReviewGrade): CardProgress {
  const quality = QUALITY[grade];
  const now = new Date();

  // Update easiness factor first — this happens on every review,
  // regardless of whether the answer was remembered.
  let easiness =
    progress.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easiness < MIN_EASINESS) easiness = MIN_EASINESS;

  let repetitions: number;
  let intervalDays: number;

  if (quality < 3) {
    // Forgotten. Reset the repetition streak and bring it back tomorrow,
    // regardless of how "mature" the card was — a forgotten card gets
    // re-learned from scratch, which is what the desirable-difficulty
    // and retrieval-practice literature both call for.
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions = progress.repetitions + 1;
    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(progress.intervalDays * easiness);
    }
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

export function isDue(progress: CardProgress | undefined, now: Date = new Date()): boolean {
  if (!progress) return true; // never studied = due
  return new Date(progress.dueDate).getTime() <= now.getTime();
}

/** Human-readable summary of when a card will next come back, used on the
 *  grade buttons so the student sees the consequence of each choice
 *  before they pick it — this feedback is itself part of what makes
 *  spaced repetition feel motivating rather than arbitrary. */
export function previewInterval(progress: CardProgress | undefined, grade: ReviewGrade): string {
  const base = progress ?? newCardProgress("preview");
  const next = reviewCard(base, grade);
  const days = next.intervalDays;
  if (days <= 0) return "later today";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  if (days < 30) return `in ${Math.round(days / 7)} wk`;
  if (days < 365) return `in ${Math.round(days / 30)} mo`;
  return `in ${Math.round(days / 365)} yr`;
}
