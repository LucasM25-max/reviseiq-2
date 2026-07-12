"use client";

import { useParams } from "next/navigation";
import { BookOpen, Info } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { useBrain } from "@/lib/store";
import { Topic41CellStructureNotes } from "@/lib/content/biology/topic-4-1";

const writtenSections: Record<string, { id: string; label: string }[]> = {
  "4.1": [
    { id: "4.1.1.1", label: "4.1.1.1 Eukaryotes and prokaryotes" },
    { id: "4.1.1.2", label: "4.1.1.2 Animal and plant cells" },
    { id: "4.1.1.3", label: "4.1.1.3 Cell specialisation" },
    { id: "4.1.1.4", label: "4.1.1.4 Cell differentiation" },
    { id: "4.1.1.5", label: "4.1.1.5 Microscopy" },
  ],
};

export default function TopicNotesPage() {
  const params = useParams<{ topicId: string }>();
  const { state } = useBrain();
  const topic = biologyTopics.find((t) => t.code === params.topicId);
  const sections = topic ? writtenSections[topic.code] : undefined;
  const hasContent = Boolean(sections && sections.length > 0);

  return (
    <AppShell>
      <div className={`mx-auto px-6 md:px-10 py-10 ${hasContent ? "max-w-4xl" : "max-w-3xl"}`}>
        <ModuleHeader
          eyebrow={`Topic ${topic?.code ?? ""}`}
          title={topic?.name ?? "Topic not found"}
          description={
            hasContent
              ? "Colour-coded, dual-coded notes, chunked by specification sub-point with a self-check quiz at the end of each."
              : "Notes for this topic haven't been written yet. Below is the note format they'll follow once they are."
          }
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

        {hasContent ? (
          <>
            <Card className="p-5 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-slate" />
                <p className="text-xs font-medium uppercase tracking-wide text-slate">
                  On this page
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {sections!.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-xs bg-graphite/[0.05] dark:bg-white/10 px-2.5 py-1 text-xs font-medium text-slate hover:text-graphite dark:hover:text-paper transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-light leading-relaxed">
                Tap any <span className="text-signal font-semibold underline decoration-dotted">underlined term</span>{" "}
                for its definition, and tap a question at the end of each section to check
                your answer.
              </p>
            </Card>

            <div className="mt-8">
              {topic?.code === "4.1" && <Topic41CellStructureNotes />}
            </div>

            <div className="mt-8">
              <EmptyState
                icon={<BookOpen size={20} />}
                title="More sections coming"
                description="This page currently covers 4.1.1 Cell structure. Further sections of Cell biology will be added here as they're written."
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
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
