# ReviseIQ

A GCSE revision app, starting with AQA Biology. This build covers account
creation, onboarding, account settings (profile, password form, dark theme,
accessibility), a universal timetable, and the full Biology navigation
structure with the design system in place. Revision content (notes,
flashcards, questions, practicals detail) is intentionally left blank — see
"What's not built yet" below.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (with `darkMode: "class"`)
- React Context + `localStorage` as a local data layer (no backend yet)
- lucide-react for icons

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy to Vercel via GitHub

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial ReviseIQ scaffold"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In Vercel: **New Project → Import** the repository. Vercel auto-detects
   Next.js — no configuration needed. Deploy.

## What's built

- **Landing page** at `/`
- **Sign up / log in** (`/signup`, `/login`) — local-only for now, see note below
- **Onboarding** (`/onboarding/subjects` → `/grades` → `/exam-dates`):
  subject + exam board + entry type + tier, current/target grade, Paper 1
  and Paper 2 dates
- **Dashboard** (`/dashboard`): exam countdown, overall mastery (0%),
  subject cards, empty Focus Zone
- **Timetable** (`/timetable`): universal, across every subject the student
  has set up — no longer scoped to Biology alone
- **Biology hub** (`/subjects/biology`): all 7 AQA topics across both
  papers, linking into 7 study modules (notes, flashcards, question bank,
  required practicals, six-mark builder, maths skills, command words) — all
  present with working navigation and empty states, no content yet
- **Account** (`/account`), linked from the bottom of the left nav:
  - Profile — edit username and school
  - Password — validates and is fully wired up, but see the auth note below
  - Appearance — light/dark theme
  - Accessibility — dyslexia-friendly font (Atkinson Hyperlegible), text
    size (normal/large/extra large), colour-blind-safe topic colours
- Full design system: colour tokens, type scale (Bricolage Grotesque /
  IBM Plex Sans / IBM Plex Mono), the recurring "instrument dial" component
  used for both the exam countdown and topic mastery, a working dark theme,
  visible focus states, `prefers-reduced-motion` support
- Left nav is fixed height and pinned (`sticky` + `h-screen`) so it never
  scrolls with the page, and its contents are compact enough to stay fully
  visible without internal scrolling on typical screens

## What's not built yet (by design, per this round's brief)

- Any actual Biology notes, flashcards, questions, or practical write-ups
- Real authentication — `lib/store.tsx` explains this in detail. Usernames
  and schools persist in `localStorage`; passwords are validated on forms
  (sign-up and the new Account > Password form) but never stored anywhere.
  This needs a real backend (hashed credentials, a database, sessions)
  before any real student data touches it — e.g. NextAuth, Supabase Auth,
  or a custom API.
- The mastery-scoring and spaced-repetition engine described in the product
  spec — the data model (`TopicMastery` in `lib/types.ts`) is in place, but
  nothing writes to it yet, since there's no content to generate scores from

## One accuracy check before this ships

`lib/data/biologyTopics.ts` lists the AQA required practicals. Nine are
populated with confident titles; the tenth is marked `status: "tbc"`.
Confirm the full official list against the current published AQA Biology
specification before this goes live — exam board specs are updated
periodically.

## Manual step if you're updating an existing deployment

The old `app/subjects/biology/timetable/` route has been replaced by
`app/timetable/`. If you're layering this update onto a previous version of
the repo, delete `app/subjects/biology/timetable/page.tsx` manually — a zip
of changed files can add or overwrite files but can't delete anything from
your existing repo.

## Project structure

```
app/                    Routes (App Router)
  (auth)/signup, login
  account/                Profile, password, theme, accessibility
  onboarding/              3-step onboarding flow, shared Stepper layout
  dashboard/
  timetable/               Universal revision timetable, all subjects
  subjects/biology/        Hub + 7 module pages
components/ui/           Design-system primitives (Button, Card, Badge,
                          ProgressDial, Stepper, EmptyState, AppShell, ...)
lib/
  store.tsx              The "brain" -- client-side state + localStorage,
                          now including theme/accessibility preferences
  types.ts                Shared data model
  data/biologyTopics.ts   AQA Biology spec structure (topics, modules,
                           required practicals, colour palettes) --
                           structural only, no content
```
