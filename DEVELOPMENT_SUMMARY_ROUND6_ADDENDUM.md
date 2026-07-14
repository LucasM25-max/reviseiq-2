# Addendum to DEVELOPMENT_SUMMARY.md — Round 6

Append this as a new section under "Development Rounds", after Round 5.

---

### Round 6: AQA Biology 4.1.1 Flashcards + Spaced-Repetition Engine

**Deliverable:** Changed-files-only zip (8 files) adding a working flashcard
deck for 4.1.1 Cell structure, and a real SM-2 spaced-repetition engine
wired into the brain (previously the flashcards module was an empty
scaffold showing "0 cards due").

**Content delivered:**
- 56 atomic flashcards covering all five 4.1.1 sub-points (4.1.1.1–4.1.1.5),
  written directly from the existing study notes — no new facts introduced.
- Card types: definition, cloze, application/reasoning, comparison and
  calculation, matched to the kind of knowledge each fact represents.
- Two-directional cards for core vocabulary (e.g. "what does the nucleus
  do?" and "which structure contains the cell's DNA?") since AQA can ask
  either way.
- Minimum information principle followed throughout — lists (e.g. the six
  specialised cells) are split into one card per item rather than one card
  demanding the whole list back.

**Engine built:**
- `lib/spacedRepetition.ts`: SM-2 algorithm — easiness factor, interval,
  repetitions and due date per card, updated on every review.
- Four-button grading (Again / Hard / Good / Easy), previewing the next
  due date on each button before the student picks it.
- Session queue = all due cards + up to 20 new cards, shuffled together
  (interleaved across sub-points rather than studied in spec order).
- `lib/store.tsx` gained `reviewFlashcard()`; `BrainState` gained
  `flashcardProgress: Record<string, CardProgress>`, persisted the same
  way as everything else in the brain (localStorage).

**UI built:**
- `components/flashcards/FlashcardReview.tsx`: flip-card session UI with
  progress bar, card-type badge, four-button grading, and a session-summary
  screen.
- `app/subjects/biology/flashcards/[topicId]/page.tsx`: new dynamic route,
  one per topic, following the same pattern as the notes module's
  `[topicId]` route.
- `app/subjects/biology/flashcards/page.tsx`: deck list now shows live
  due/new counts (via `lib/flashcardStats.ts`) instead of a static
  placeholder, and links through to a study session only for topics that
  have a written deck.

**Design principles applied (the "what makes a good flashcard" research
this round was built around):**
- Free recall over recognition — no multiple choice, per the testing-effect
  literature (Roediger & Karpicke) showing free recall drives stronger
  long-term retention.
- Minimum information principle (Wozniak's rules for writing spaced-
  repetition cards) — one atomic fact per card.
- Interleaving over blocking (Rohrer & Taylor) — sessions mix sub-points
  rather than drilling one at a time.
- SM-2 scheduling — the same family of algorithm underlying most current
  spaced-repetition tools, chosen over a fixed-interval scheme so each
  card's schedule adapts to how easy it's actually been for that student.

**Scope note:** only 4.1 (Cell biology) has a deck, since only 4.1.1 has
written notes. `flashcardDecks` in `lib/content/biology/flashcards-4-1.ts`
is a lookup by topic code, so future topics slot in the same way the notes
module already does (`topic-4-2.tsx`, etc.).
