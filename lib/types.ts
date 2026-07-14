export type ExamBoard = "AQA";

export type EntryType = "Separate (Triple)" | "Combined Science: Trilogy";

export type Tier = "Foundation" | "Higher";

export type Grade =
  | "U"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export interface SubjectConfig {
  id: string;
  subject: "Biology";
  board: ExamBoard;
  entryType: EntryType;
  tier: Tier | null;
  currentGrade: Grade | null;
  targetGrade: Grade | null;
  paper1Date: string | null;
  paper2Date: string | null;
}

export interface UserProfile {
  username: string;
  school: string | null;
  createdAt: string;
}

export type Theme = "light" | "dark";
export type TextScale = "normal" | "large" | "xl";

export interface Preferences {
  theme: Theme;
  dyslexiaFont: boolean;
  textScale: TextScale;
  colorBlindSafe: boolean;
}

export const defaultPreferences: Preferences = {
  theme: "light",
  dyslexiaFont: false,
  textScale: "normal",
  colorBlindSafe: false,
};

export interface BrainState {
  user: UserProfile | null;
  subjects: SubjectConfig[];
  onboarded: boolean;
  preferences: Preferences;
  flashcardProgress: Record<string, CardProgress>;
}

/* ---------------------------------------------------------------------- */
/* Flashcards & spaced repetition                                          */
/* ---------------------------------------------------------------------- */

/** Atomic card types, chosen to match how each fact is best retrieved.
 *  See lib/spacedRepetition.ts for the scheduling algorithm and
 *  lib/content/biology/flashcards-4-1.ts for the card data + the design
 *  rationale comment at the top of that file. */
export type CardType = "definition" | "cloze" | "application" | "comparison" | "calculation";

export interface Flashcard {
  id: string;
  topicCode: string; // e.g. "4.1"
  subpoint: string; // e.g. "4.1.1.1"
  type: CardType;
  front: string;
  back: string;
}

/** The four self-graded recall qualities shown to the student after they
 *  reveal a card's answer. Mirrors the SM-2 "quality of response" scale,
 *  collapsed to four buttons (as Anki and most modern SRS apps do) rather
 *  than SM-2's original 0-5, since four clearly distinct options are
 *  faster to grade honestly than six similar-sounding ones. */
export type ReviewGrade = "again" | "hard" | "good" | "easy";

export interface CardProgress {
  cardId: string;
  easiness: number; // SM-2 "EF", starts at 2.5, floor 1.3
  intervalDays: number;
  repetitions: number; // consecutive correct (non-"again") reviews
  dueDate: string; // ISO date string
  lastReviewed: string | null; // ISO date string
}

/** Every topic-level mastery score the "brain" will eventually track.
 *  Content and real scores are intentionally absent at this stage —
 *  every value below starts at 0 and is wired up, not populated. */
export interface TopicMastery {
  topicCode: string;
  masteryPercent: number;
  lastReviewed: string | null;
}
