"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { RotateCcw, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useBrain } from "@/lib/store";
import { isDue, previewInterval } from "@/lib/spacedRepetition";
import type { CardType, Flashcard, ReviewGrade } from "@/lib/types";

const NEW_CARDS_PER_SESSION = 20;

const typeLabel: Record<CardType, string> = {
  definition: "Definition",
  cloze: "Fill the gap",
  application: "Apply it",
  comparison: "Compare",
  calculation: "Calculate",
};

const gradeStyles: Record<ReviewGrade, string> = {
  again: "bg-danger-light text-danger hover:bg-danger/20 dark:bg-danger/15 dark:text-danger",
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

// Deterministic shuffle seeded by a string so the queue order is stable
// across re-renders within a session, but varies session to session.
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function FlashcardReview({
  cards,
  topicColorHex,
}: {
  cards: Flashcard[];
  topicColorHex: string;
}) {
  const { state, hydrated, reviewFlashcard } = useBrain();
  const [revealed, setRevealed] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [tally, setTally] = useState<Record<ReviewGrade, number>>({ again: 0, hard: 0, good: 0, easy: 0 });

  // Built once per mount: due cards (studied before, now due again) plus a
  // capped batch of brand-new cards, interleaved by shuffling together.
  // Capping new cards per session is standard SRS practice — it stops a
  // first-ever session from dumping 50 unfamiliar facts on the student at
  // once, which is worse for retention than a steady daily trickle.
  const queue = useMemo(() => {
    if (!hydrated) return [];
    const due: Flashcard[] = [];
    const fresh: Flashcard[] = [];
    for (const card of cards) {
      const progress = state.flashcardProgress[card.id];
      if (!progress) fresh.push(card);
      else if (isDue(progress)) due.push(card);
    }
    return shuffle([...shuffle(due), ...shuffle(fresh).slice(0, NEW_CARDS_PER_SESSION)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (!hydrated) return null;

  const total = queue.length;
  const current = queue[queueIndex];
  const done = queueIndex >= total;

  if (total === 0) {
    return (
      <Card className="flex flex-col items-center text-center gap-3 px-8 py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-signal-light text-signal">
          <Sparkles size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-graphite dark:text-paper">
          All caught up
        </h3>
        <p className="text-sm text-slate leading-relaxed max-w-sm">
          No cards are due right now. Come back once new cards are scheduled, or once today's
          reviews come round again.
        </p>
      </Card>
    );
  }

  if (done) {
    const reviewed = tally.again + tally.hard + tally.good + tally.easy;
    return (
      <Card className="flex flex-col items-center text-center gap-4 px-8 py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-signal-light text-signal">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-semibold text-graphite dark:text-paper">
            Session complete
          </h3>
          <p className="text-sm text-slate leading-relaxed max-w-sm">
            You reviewed {reviewed} card{reviewed === 1 ? "" : "s"}. Cards you found harder will
            come back sooner than the ones you knew well.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <Badge tone="danger">{tally.again} again</Badge>
          <Badge tone="amber">{tally.hard} hard</Badge>
          <Badge tone="cobalt">{tally.good} good</Badge>
          <Badge tone="signal">{tally.easy} easy</Badge>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setQueueIndex(0);
            setRevealed(false);
            setTally({ again: 0, hard: 0, good: 0, easy: 0 });
          }}
        >
          <RotateCcw size={14} />
          Study again
        </Button>
      </Card>
    );
  }

  function handleGrade(grade: ReviewGrade) {
    reviewFlashcard(current.id, grade);
    setTally((t) => ({ ...t, [grade]: t[grade] + 1 }));
    setRevealed(false);
    setQueueIndex((i) => i + 1);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate">
          Card {queueIndex + 1} of {total}
        </p>
        <Badge tone="neutral">{current.subpoint}</Badge>
      </div>

      <div className="h-1 w-full rounded-full bg-graphite/[0.06] dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(queueIndex / total) * 100}%`, backgroundColor: topicColorHex }}
        />
      </div>

      <Card className="p-8 min-h-[240px] flex flex-col">
        <span
          className="self-start text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-xs mb-5"
          style={{ backgroundColor: `${topicColorHex}1A`, color: topicColorHex }}
        >
          {typeLabel[current.type]}
        </span>

        <p className="text-base text-graphite dark:text-paper leading-relaxed font-medium flex-1">
          {current.front}
        </p>

        {revealed && (
          <div className="mt-6 pt-6 border-t border-graphite/10 dark:border-white/10">
            <p className="text-sm text-slate leading-relaxed">{current.back}</p>
          </div>
        )}
      </Card>

      {!revealed ? (
        <Button variant="primary" onClick={() => setRevealed(true)} className="self-center px-10">
          Show answer
        </Button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["again", "hard", "good", "easy"] as ReviewGrade[]).map((grade) => (
            <button
              key={grade}
              onClick={() => handleGrade(grade)}
              className={clsx(
                "flex flex-col items-center gap-0.5 rounded-sm px-3 py-3 text-sm font-medium transition-colors",
                gradeStyles[grade]
              )}
            >
              <span>{gradeLabel[grade]}</span>
              <span className="text-xs opacity-70">
                {previewInterval(state.flashcardProgress[current.id], grade)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
