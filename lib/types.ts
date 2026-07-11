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
}

/** Every topic-level mastery score the "brain" will eventually track.
 *  Content and real scores are intentionally absent at this stage --
 *  every value below starts at 0 and is wired up, not populated. */
export interface TopicMastery {
  topicCode: string;
  masteryPercent: number;
  lastReviewed: string | null;
}
