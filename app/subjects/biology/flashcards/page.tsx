"use client";

import { Layers } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Card } from "@/components/ui/Card";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { useBrain } from "@/lib/store";

export default function FlashcardsPage() {
  const { state } = useBrain();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Flashcards"
          title="Spaced-repetition decks"
          description="One deck per topic. Cards you get wrong come back sooner; cards you know well come back later."
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {biologyTopics.map((t) => (
            <Card key={t.code} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: topicColor(t.code, state.preferences.colorBlindSafe) }}
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-medium text-graphite dark:text-paper">{t.name}</p>
                  <p className="text-xs text-slate-light">0 cards due</p>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-graphite/[0.04] dark:bg-white/5 text-slate-light">
                <Layers size={15} />
              </div>
            </Card>
          ))}
        </div>

        <p className="text-xs text-slate-light mt-8">
          Deck contents haven't been written yet. Once cards exist, the
          scheduling engine will be live from the first review.
        </p>
      </div>
    </AppShell>
  );
}
