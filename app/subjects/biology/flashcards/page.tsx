"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { flashcardDecks } from "@/lib/content/biology/flashcards-4-1";
import { deckStats } from "@/lib/flashcardStats";
import { useBrain } from "@/lib/store";

export default function FlashcardsPage() {
  const { state, hydrated } = useBrain();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Flashcards"
          title="Spaced-repetition decks"
          description="One deck per topic. Cards you get wrong come back sooner; cards you know well come back later."
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {biologyTopics.map((t) => {
            const cards = flashcardDecks[t.code];
            const hasContent = Boolean(cards && cards.length > 0);
            const stats = hasContent && hydrated ? deckStats(cards, state.flashcardProgress) : null;
            const color = topicColor(t.code, state.preferences.colorBlindSafe);

            const body = (
              <Card
                className={`p-5 flex items-center justify-between ${
                  hasContent ? "hover:border-graphite/20 dark:hover:border-white/20 transition-colors" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-graphite dark:text-paper truncate">{t.name}</p>
                    {hasContent ? (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {stats && stats.due > 0 && <Badge tone="cobalt">{stats.due} due</Badge>}
                        {stats && stats.newCount > 0 && <Badge tone="neutral">{stats.newCount} new</Badge>}
                        {stats && stats.due === 0 && stats.newCount === 0 && (
                          <Badge tone="signal">All caught up</Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-light">0 cards written</p>
                    )}
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-graphite/[0.04] dark:bg-white/5 text-slate-light shrink-0">
                  <Layers size={15} />
                </div>
              </Card>
            );

            return hasContent ? (
              <Link key={t.code} href={`/subjects/biology/flashcards/${t.code}`}>
                {body}
              </Link>
            ) : (
              <div key={t.code} className="opacity-60 cursor-not-allowed">
                {body}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-light mt-8">
          Cell biology (4.1) has a written deck, built directly from the 4.1.1 Cell structure
          notes. Other topics get their decks once their notes are written.
        </p>
      </div>
    </AppShell>
  );
}
