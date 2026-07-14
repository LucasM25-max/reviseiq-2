"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { RotateCcw, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useBrain } from "@/lib/store";
import { isDue, previewInterval } from "@/lib/spacedRepetition";
import type { CardType, Flashcard, ReviewGrade } from "@/lib/types";

const NEW_CARDS_PER_SESSION = 20;
const GRADES: ReviewGrade[] = ["again", "hard", "good", "easy"];

const typeLabel: Record<CardType, string> = {
  definition: "Definition",
  cloze: "Fill the gap",
  application: "Apply it",
  comparison: "Compare",
  calculation: "Calculate",
};

const gradeStyles: Record<ReviewGrade, string> = {
  again:
    "bg-danger-light text-danger hover:bg-danger/20 dark:bg-danger/15 dark:text-danger",
  hard: "bg-amber-light text-amber hover:bg-amber/20 dark:bg-amber/15 dark:text-amber",
  good: "bg-cobalt-light text-cobalt-dark hover:bg-cobalt/20 dark:bg-cobalt/20 dark:text-white",
  easy: "bg-signal-light text-signal hover:bg-signal/20 dark:bg-signal/15 dark:text-signal",
};

const gradeLabel: Record<ReviewGrade, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQueue(
  cards: Flashcard[],
  progress: Record<string, unknown>,
): Flashcard[] {
  const due: Flashcard[] = [];
  const fresh: Flashcard[] = [];
  for (const card of cards) {
    const cardProgress = progress[card.id] as Parameters<typeof isDue>[0];
    if (!cardProgress) fresh.push(card);
    else if (isDue(cardProgress)) due.push(card);
  }
  return shuffle([
    ...shuffle(due),
    ...shuffle(fresh).slice(0, NEW_CARDS_PER_SESSION),
  ]);
}

export function FlashcardReview({
  cards,
  topicColorHex,
}: {
  cards: Flashcard[];
  topicColorHex: string;
}) {
  const { state, hydrated, reviewFlashcard } = useBrain();
  const [sessionId, setSessionId] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [tally, setTally] = useState<Record<ReviewGrade, number>>({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });

  // A new session deliberately rebuilds from the latest progress. Without
  // sessionId, “Study again” re-used the old memoized queue and immediately
  // repeated cards that had just been scheduled for tomorrow or later.
  const queue = useMemo(() => {
    if (!hydrated) return [];
    return buildQueue(cards, state.flashcardProgress);
    // A session intentionally uses a snapshot of progress. Do not add
    // state.flashcardProgress here: each grade updates that state, which would
    // reshuffle the queue mid-session and could skip or repeat cards.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, hydrated, sessionId]);

  if (!hydrated) return null;

  const total = queue.length;
  const current = queue[queueIndex];
  const done = queueIndex >= total;

  const startNewSession = () => {
    setQueueIndex(0);
    setRevealed(false);
    setTally({ again: 0, hard: 0, good: 0, easy: 0 });
    setSessionId((id) => id + 1);
  };

  if (total === 0) {
    return (
      <Card className="p-8 text-center">
        <Sparkles
          className="mx-auto mb-3 h-7 w-7"
          style={{ color: topicColorHex }}
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold">All caught up</h2>
        <p className="mt-2 text-slate">
          No cards are due right now. Come back when your next reviews are
          scheduled.
        </p>
      </Card>
    );
  }

  if (done) {
    const reviewed = GRADES.reduce((sum, grade) => sum + tally[grade], 0);
    return (
      <Card className="p-8 text-center">
        <Sparkles
          className="mx-auto mb-3 h-7 w-7"
          style={{ color: topicColorHex }}
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold">Session complete</h2>
        <p className="mt-2 text-slate">
          You reviewed {reviewed} card{reviewed === 1 ? "" : "s"}. Harder cards
          will return sooner.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
          {GRADES.map((grade) => (
            <Badge key={grade} tone="neutral">
              {tally[grade]} {grade}
            </Badge>
          ))}
        </div>
        <Button type="button" className="mt-6" onClick={startNewSession}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Study again
        </Button>
      </Card>
    );
  }

  const handleGrade = (grade: ReviewGrade) => {
    reviewFlashcard(current.id, grade);
    setTally((previous) => ({ ...previous, [grade]: previous[grade] + 1 }));
    setRevealed(false);
    setQueueIndex((index) => index + 1);
  };

  return (
    <section aria-live="polite">
      <div className="mb-4 flex items-center justify-between text-sm text-slate">
        <span>
          Card {queueIndex + 1} of {total}
        </span>
        <Badge tone="neutral">{current.subpoint}</Badge>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded bg-graphite/10 dark:bg-white/10">
        <div
          className="h-full rounded transition-all"
          style={{
            width: `${((queueIndex + 1) / total) * 100}%`,
            backgroundColor: topicColorHex,
          }}
        />
      </div>
      <Card className="min-h-72 p-6 sm:p-8">
        <Badge tone="neutral">{typeLabel[current.type]}</Badge>
        <p className="mt-8 text-xl font-medium leading-relaxed">
          {current.front}
        </p>
        {revealed && (
          <p className="mt-8 border-t border-graphite/10 pt-6 text-base leading-relaxed text-slate dark:border-white/15">
            {current.back}
          </p>
        )}
      </Card>
      {!revealed ? (
        <div className="mt-6 text-center">
          <Button
            type="button"
            className="px-10"
            onClick={() => setRevealed(true)}
          >
            Show answer
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GRADES.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => handleGrade(grade)}
              className={clsx(
                "flex min-h-16 flex-col items-center justify-center rounded-sm px-3 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2",
                gradeStyles[grade],
              )}
            >
              <span>{gradeLabel[grade]}</span>
              <span className="mt-0.5 text-xs opacity-80">
                {previewInterval(state.flashcardProgress[current.id], grade)}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
