# Round 6 — Flashcards (4.1.1 Cell structure) — Delivery Notes

## What's in this zip
Changed/new files only, matching the folder structure of the repo so you can
upload directly to GitHub:

- `lib/types.ts` — **modified**: added `Flashcard`, `CardType`, `ReviewGrade`,
  `CardProgress` types, and `flashcardProgress` on `BrainState`.
- `lib/store.tsx` — **modified**: added `reviewFlashcard()` to the brain, and
  persists flashcard progress in the same localStorage blob as everything
  else.
- `lib/spacedRepetition.ts` — **new**: the SM-2 scheduling algorithm
  (pure functions, no UI).
- `lib/flashcardStats.ts` — **new**: due/new/total counters used on the
  deck list page.
- `lib/content/biology/flashcards-4-1.ts` — **new**: the 4.1.1 card deck
  (56 atomic cards), plus the design-rationale comment explaining why each
  card is written the way it is.
- `components/flashcards/FlashcardReview.tsx` — **new**: the study session
  UI (flip card, four-button grading, session summary).
- `app/subjects/biology/flashcards/page.tsx` — **modified**: deck list now
  shows real due/new counts instead of the "0 cards due" placeholder.
- `app/subjects/biology/flashcards/[topicId]/page.tsx` — **new**: the
  per-topic study session route.

## Manual steps required
**None.** No files are removed or renamed this round, so a straight zip
upload to GitHub (overwriting existing files, adding the new ones) is
enough — unlike Round 5, there's nothing to manually delete first.

## What this covers
Only 4.1 (Cell biology) has a written deck, since only 4.1.1 has written
notes so far — as scoped. Every other topic still shows "0 cards written"
on the deck list, same empty-state pattern as before. `flashcardDecks` in
`lib/content/biology/flashcards-4-1.ts` is a lookup keyed by topic code —
adding `topic-4-2` etc. later is a case of writing `flashcards-4-2.ts` and
adding one line to that map, same pattern the notes module already uses.

## How the flashcards work
- **Scheduling:** SM-2 (SuperMemo-2), the algorithm most modern spaced
  repetition apps are built on. Each card tracks its own easiness factor,
  interval and due date — cards that are graded "again" come back the next
  day; cards graded "easy" repeatedly stretch out to weeks, then months.
- **Grading:** four buttons (Again / Hard / Good / Easy), the same
  convention Anki and most current SRS tools use. Each button previews
  when the card will come back before the student picks it.
- **Session composition:** all currently-due cards, plus up to 20 new
  cards, shuffled together rather than studied in spec order. This
  interleaving (mixing sub-points rather than blocking through them one at
  a time) is deliberate — it's supported by the spacing/interleaving
  literature as producing better long-term retention than studying one
  sub-point to "completion" before moving to the next.
- **Card writing:** every card tests exactly one atomic fact (the
  "minimum information principle" from spaced-repetition card-writing
  practice) rather than asking for a list — so a card never scores as a
  full miss just because the student forgot one item out of six.

## Verified before delivery
- `npx tsc --noEmit` — no type errors.
- `npx next build` — compiles cleanly; the build only fails in this
  sandboxed environment because it can't reach Google Fonts
  (`fonts.googleapis.com` isn't reachable here), which is a sandbox network
  restriction, not a code issue. This will build fine on Vercel.
