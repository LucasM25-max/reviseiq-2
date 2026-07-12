export interface BiologyTopic {
  code: string;
  name: string;
  paper: 1 | 2;
  color: string; // hex, default palette — see topicColorsSafe for the alt palette
}

// AQA GCSE Biology (8461 / 8464 shared content) — the seven specification
// topics, numbered as AQA numbers them. This numbering is real spec order,
// so it is used as the app's structural device rather than an arbitrary 1-7.
// Colours are applied inline (not as Tailwind classes) since they're looped
// over dynamically — values are kept in sync with tailwind.config.ts.
export const biologyTopics: BiologyTopic[] = [
  { code: "4.1", name: "Cell biology", paper: 1, color: "#7C5CBF" },
  { code: "4.2", name: "Organisation", paper: 1, color: "#C14E77" },
  { code: "4.3", name: "Infection and response", paper: 1, color: "#D9713D" },
  { code: "4.4", name: "Bioenergetics", paper: 1, color: "#7C8C3E" },
  { code: "4.5", name: "Homeostasis and response", paper: 2, color: "#23897E" },
  { code: "4.6", name: "Inheritance, variation and evolution", paper: 2, color: "#6B4C93" },
  { code: "4.7", name: "Ecology", paper: 2, color: "#3E8259" },
];

// Colour-blind-safe alternative, based on the Okabe-Ito palette, chosen so
// all seven topics stay distinguishable under the common forms of colour
// vision deficiency. Swapped in via topicColor() when the preference is on.
const topicColorsSafe: Record<string, string> = {
  "4.1": "#0072B2",
  "4.2": "#E69F00",
  "4.3": "#009E73",
  "4.4": "#D55E00",
  "4.5": "#56B4E9",
  "4.6": "#CC79A7",
  "4.7": "#000000",
};

export function topicColor(code: string, colorBlindSafe: boolean): string {
  if (colorBlindSafe) return topicColorsSafe[code] ?? "#5B6470";
  return biologyTopics.find((t) => t.code === code)?.color ?? "#5B6470";
}

export interface FeatureModule {
  slug: string;
  name: string;
  description: string;
}

export const biologyModules: FeatureModule[] = [
  {
    slug: "notes",
    name: "Study notes",
    description: "Colour-coded, dual-coded notes for every topic, chunked for retrieval practice.",
  },
  {
    slug: "flashcards",
    name: "Flashcards",
    description: "Spaced-repetition decks that reschedule themselves around what you forget.",
  },
  {
    slug: "questions",
    name: "Question bank",
    description: "Exam-style questions tagged by topic, tier, assessment objective and marks.",
  },
  {
    slug: "practicals",
    name: "Required practicals",
    description: "Method, variables and exam-style questions for every required practical.",
  },
  {
    slug: "six-mark",
    name: "Six-mark answer builder",
    description: "Scaffolded practice for extended-response questions, marked against the scheme.",
  },
  {
    slug: "maths-skills",
    name: "Maths skills",
    description: "The maths AQA examines inside Biology — standard form, ratios, graphs, means.",
  },
  {
    slug: "command-words",
    name: "Command words",
    description: "Train the difference between describe, explain, evaluate and calculate.",
  },
];

// The AQA specification lists required practicals for Biology. Titles below
// are populated where confidently known; TBC entries should be verified
// against the current published AQA specification before this ships.
export interface RequiredPractical {
  id: number;
  title: string;
  topicCode: string;
  status: "confirmed" | "tbc";
}

export const requiredPracticals: RequiredPractical[] = [
  { id: 1, title: "Microscopy: observing and drawing plant and animal cells", topicCode: "4.1", status: "confirmed" },
  { id: 2, title: "Food tests: identifying carbohydrates, lipids and proteins", topicCode: "4.2", status: "confirmed" },
  { id: 3, title: "Osmosis: effect of solution concentration on plant tissue mass", topicCode: "4.2", status: "confirmed" },
  { id: 4, title: "Effect of pH on the rate of amylase enzyme activity", topicCode: "4.2", status: "confirmed" },
  { id: 5, title: "Antimicrobial effect on bacterial growth using agar plates", topicCode: "4.3", status: "confirmed" },
  { id: 6, title: "Effect of light intensity on the rate of photosynthesis", topicCode: "4.4", status: "confirmed" },
  { id: 7, title: "Effect of exercise on heart rate and breathing rate", topicCode: "4.5", status: "confirmed" },
  { id: 8, title: "Investigating human reaction time", topicCode: "4.5", status: "confirmed" },
  { id: 9, title: "Sampling techniques: quadrats and transects", topicCode: "4.7", status: "confirmed" },
  { id: 10, title: "Practical 10 — title to be confirmed against current AQA specification", topicCode: "4.7", status: "tbc" },
];
