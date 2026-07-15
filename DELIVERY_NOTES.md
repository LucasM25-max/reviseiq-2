# Round 7 — Exam question bank + AI marking (4.1.1 Cell structure) — Delivery Notes

## What's in this zip
Changed/new files only, matching the repo's folder structure:

- `lib/types.ts` — **modified**: added `ExamQuestion`, `QuestionPart`,
  `MarkPoint`, `AssessmentObjective`, `QuestionTier`, `GradeBand`,
  `PartType`, and `AiMarkResult` types.
- `lib/content/biology/questions-4-1.ts` — **new**: the 4.1.1 question
  bank — 16 exam-style questions (46 gradable parts, 66 marks total),
  plus the design-rationale comment explaining the marking model and the
  research behind the question design.
- `app/api/mark-answer/route.ts` — **new**: the AI marking endpoint. Calls
  Groq (`llama-3.3-70b-versatile`) server-side, given the exact mark
  scheme for whichever question part was submitted, and returns a JSON
  mark + feedback.
- `components/questions/QuestionCard.tsx` — **new**: renders one question
  — multiple-choice parts are marked instantly client-side; free-response
  parts get a "Mark my answer" button wired to the API route above, with
  matched marking points, feedback, a running score, and a "show full mark
  scheme + model answer" toggle.
- `app/subjects/biology/questions/page.tsx` — **modified**: the empty
  "0 questions match these filters" scaffold now lists real questions,
  filterable by topic, assessment objective (AO1/AO2/AO3) and target
  grade band (4-6 / 6-7 / 7-9).
- `.env.example` — **new**: documents the `GROQ_API_KEY` variable.

## Manual steps required

**1. Add the GROQ_API_KEY environment variable in Vercel — required, or
marking will fail.**
- Go to your Vercel project → **Settings → Environment Variables**
- Name: `GROQ_API_KEY`
- Value: your key from [console.groq.com](https://console.groq.com)
- Apply to Production (and Preview/Development if you use them)
- Redeploy after adding it — environment variables only take effect on
  the next deployment, not retroactively.

Without this, multiple-choice questions still work (marked client-side),
but "Mark my answer" on free-response questions will return a clear error
message rather than crashing.

**2. No file deletions needed** — nothing is removed or renamed this
round, so the zip uploads straight over the existing files.

## How the AI marking works
- The route only runs server-side (`app/api/mark-answer/route.ts` is a
  Next.js Route Handler) — `GROQ_API_KEY` is never sent to the browser.
- Each free-response part carries its own itemised mark scheme (written
  the way real AQA mark schemes are: a list of separately-awardable
  points). That scheme is sent to the model with an instruction to award
  each point independently — meaning a partially-correct answer gets
  partial credit, not an all-or-nothing right/wrong.
- The model is instructed to reply with strict JSON only; the route
  parses defensively (strips code fences, falls back to extracting a JSON
  object from the text, clamps the awarded mark to the question's actual
  maximum) so a malformed model response can't award phantom marks or
  crash the page.
- Multiple-choice questions are marked instantly in the browser — there's
  a single correct answer, so there's nothing for an AI call to add, and
  it keeps the question bank fast and free to use for the majority of
  quick-recall questions.

## Question design — the research this was built around
- **Command words used precisely** (state/give vs describe vs explain),
  matching AQA's own convention — command-word misreading is one of the
  most commonly cited causes of lost marks in AQA examiner reports, so
  drilling the distinction is itself part of the learning goal, not just
  the biology content.
- **Itemised mark schemes**, one point per idea — this is what makes
  partial-credit AI marking honest, and mirrors how AQA actually marks.
- **Grade bands (4-6 / 6-7 / 7-9)** attached per question, the same
  convention CGP Revision Question Cards use, so a student (or their
  parent) can target practice at a specific grade rather than working
  through an undifferentiated list.
- **Assessment objectives tagged** (AO1 recall / AO2 application / AO3
  analysis) so practice can be balanced across recall and the higher-mark
  "explain"/"evaluate" style questions AQA weights heavily at grades 7-9.
- **Grounded entirely in the existing notes** — no new facts are
  introduced; every question and mark scheme traces back to
  `lib/content/biology/topic-4-1.tsx`.

## Scope note
Only 4.1 (Cell biology) has a written question bank, matching the current
notes. `questionBanks` in `lib/content/biology/questions-4-1.ts` is a
lookup by topic code, so future topics slot in the same way the notes and
flashcards modules already do.

## Known limitation
Scores aren't currently saved to the brain / localStorage — the question
bank is session-only for now (refreshing the page resets marks). Wiring
question-bank performance into the mastery-scoring engine (`TopicMastery`
in `lib/types.ts`, still unwritten) is a natural next step, same as
flagged for flashcards in the Round 6 notes.

## Verified before delivery
- `npx tsc --noEmit` — no type errors across the whole project, including
  this round's additions.
- `npx next build` — compiles cleanly; the build only fails in this
  sandboxed environment because it can't reach Google Fonts
  (`fonts.googleapis.com` isn't reachable here) — a sandbox network
  restriction, not a code issue. This will build fine on Vercel.
