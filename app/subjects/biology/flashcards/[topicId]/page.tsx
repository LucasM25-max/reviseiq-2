"use client";

import { useParams } from "next/navigation";
import { Layers } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { flashcardDecks } from "@/lib/content/biology/flashcards-4-1";
import { useBrain } from "@/lib/store";
import { FlashcardReview } from "@/components/flashcards/FlashcardReview";

export default function FlashcardTopicPage() {
  const params = useParams<{ topicId: string }>();
  const { state } = useBrain();
  const topic = biologyTopics.find((t) => t.code === params.topicId);
  const cards = topic ? flashcardDecks[topic.code] : undefined;
  const hasContent = Boolean(cards && cards.length > 0);
  const color = topic ? topicColor(topic.code, state.preferences.colorBlindSafe) : "#5B6470";

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow={`Flashcards — ${topic?.code ?? ""}`}
          title={topic?.name ?? "Topic not found"}
          description={
            hasContent
              ? "Read the question, try to recall the answer before revealing it, then grade yourself honestly — that's what schedules the next review."
              : "This deck hasn't been written yet."
          }
          backHref="/subjects/biology/flashcards"
          backLabel="Flashcards"
        />

        <div className="mt-6 flex items-center gap-2">
          {topic && <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />}
          <Badge tone="neutral">Paper {topic?.paper}</Badge>
        </div>

        <div className="mt-8">
          {hasContent ? (
            <FlashcardReview cards={cards!} topicColorHex={color} />
          ) : (
            <EmptyState
              icon={<Layers size={20} />}
              title="No cards yet"
              description={`Flashcards for ${topic?.name ?? "this topic"} will appear here once its notes are written.`}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
