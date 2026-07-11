"use client";

import { useParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { useBrain } from "@/lib/store";

export default function TopicNotesPage() {
  const params = useParams<{ topicId: string }>();
  const { state } = useBrain();
  const topic = biologyTopics.find((t) => t.code === params.topicId);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow={`Topic ${topic?.code ?? ""}`}
          title={topic?.name ?? "Topic not found"}
          description="Notes for this topic haven't been written yet. Below is the note format they'll follow once they are."
        />

        <div className="mt-8 flex items-center gap-2">
          {topic && (
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: topicColor(topic.code, state.preferences.colorBlindSafe) }}
              aria-hidden
            />
          )}
          <Badge tone="neutral">Paper {topic?.paper}</Badge>
        </div>

        <div className="mt-6">
          <EmptyState
            icon={<BookOpen size={20} />}
            title="No notes yet"
            description={`This is where colour-coded, dual-coded notes for ${
              topic?.name ?? "this topic"
            } will appear, chunked into short sections with a self-check quiz at the end of each.`}
          />
        </div>

        <Card className="p-6 mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-slate mb-4">
            Note formatting system
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <LegendRow tone="cobalt" label="Command word" description="Highlighted wherever it appears in an exam-style question." />
            <LegendRow tone="signal" label="Key term" description="Bold, coloured, linked to the glossary." />
            <LegendRow tone="amber" label="Common exam mistake" description="Flagged inline, not buried in a footnote." />
            <LegendRow tone="neutral" label="Higher tier only" description="Marked so Foundation students can skip it confidently." />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function LegendRow({
  tone,
  label,
  description,
}: {
  tone: "cobalt" | "signal" | "amber" | "neutral";
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Badge tone={tone} className="mt-0.5 shrink-0">
        {label}
      </Badge>
      <p className="text-xs text-slate leading-relaxed">{description}</p>
    </div>
  );
}
