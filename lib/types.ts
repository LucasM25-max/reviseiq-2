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

/* ---------------------------------------------------------------------- */
/* Question bank & AI marking                                              */
/* ---------------------------------------------------------------------- */

export type AssessmentObjective = "AO1" | "AO2" | "AO3";
export type QuestionTier = "Foundation" | "Higher" | "Both";
export type GradeBand = "4-6" | "6-7" | "7-9";
export type PartType = "multiple-choice" | "free-response";

/** One point on an official-style mark scheme. `marks` is almost always 1
 *  — AQA mark schemes are written as a list of separately-awardable
 *  points — but is kept as a number so a single point can occasionally
 *  carry 2 marks where AQA schemes do that (e.g. "correct method AND
 *  correct answer" collapsed to one point). */
export interface MarkPoint {
  point: string;
  marks: number;
}

export interface QuestionPart {
  id: string; // unique across the whole bank, e.g. "4.1.1.1-Q1-b"
  label?: string; // "a)", "b)", ... omitted for single-part questions
  prompt: string;
  type: PartType;
  marks: number;
  options?: string[]; // multiple-choice only
  correctOption?: number; // index into options, multiple-choice only
  markScheme?: MarkPoint[]; // free-response only, must sum to `marks`
  modelAnswer?: string; // free-response only, shown after marking
}

export interface ExamQuestion {
  id: string;
  topicCode: string; // e.g. "4.1"
  subpoint: string; // e.g. "4.1.1.1"
  gradeBand: GradeBand;
  assessmentObjective: AssessmentObjective;
  tier: QuestionTier;
  context?: string; // scene-setting text shown above part (a), e.g. "Figure 1 shows..."
  totalMarks: number; // must equal the sum of part marks
  parts: QuestionPart[];
  examTip?: string;
}

/** Response shape returned by POST /api/mark-answer. */
export interface AiMarkResult {
  marksAwarded: number;
  maxMarks: number;
  matchedPoints: string[];
  feedback: string;
}
