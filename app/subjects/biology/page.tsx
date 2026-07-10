"use client";
import React from "react";

import Link from "next/link";
import {
  BookOpen,
  Layers,
  ListChecks,
  TestTube,
  PenLine,
  Calculator,
  SpellCheck,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TopicRow } from "@/components/ui/TopicRow";
import { biologyTopics, biologyModules } from "@/lib/data/biologyTopics";
import { useBrain } from "@/lib/store";

const moduleIcons: Record<string, LucideIcon> = {
  notes: BookOpen,
  flashcards: Layers,
  questions: ListChecks,
  practicals: TestTube,
  "six-mark": PenLine,
  "maths-skills": Calculator,
  "command-words": SpellCheck,
  timetable: CalendarClock,
};

export default function BiologyHub() {
  const { state, hydrated } = useBrain();
  if (!hydrated) return null;

  const config = state.subjects.find((s) => s.subject === "Biology");
  const paper1 = biologyTopics.filter((t) => t.paper === 1);
  const paper2 = biologyTopics.filter((t) => t.paper === 2);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-2xl font-semibold text-graphite">Biology</h1>
          <div className="flex gap-2">
            <Badge tone="neutral">{config?.board ?? "AQA"}</Badge>
            {config?.tier && <Badge tone="cobalt">{config.tier}</Badge>}
            {config?.entryType && <Badge tone="neutral">{config.entryType}</Badge>}
          </div>
        </div>
        <p className="text-sm text-slate mb-10">
          Seven topics across two papers, mapped exactly to the AQA
          specification.
        </p>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wide text-slate mb-3">
              Paper 1
            </h2>
            <div className="flex flex-col gap-2">
              {paper1.map((t) => (
                <TopicRow key={t.code} topic={t} href={`/subjects/biology/notes/${t.code}`} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wide text-slate mb-3">
              Paper 2
            </h2>
            <div className="flex flex-col gap-2">
              {paper2.map((t) => (
                <TopicRow key={t.code} topic={t} href={`/subjects/biology/notes/${t.code}`} />
              ))}
            </div>
          </div>
        </section>

        <h2 className="font-display text-lg font-semibold text-graphite mb-4">Study tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {biologyModules.map((mod) => {
            const IconComponent = moduleIcons[mod.slug];
            return (
              <Link key={mod.slug} href={`/subjects/biology/${mod.slug}`}>
                <Card className="p-5 h-full transition-colors hover:border-graphite/15">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-cobalt-light text-cobalt-dark mb-4">
                    <IconComponent size={17} />
                  </div>
                  <p className="font-display text-sm font-semibold text-graphite mb-1.5">
                    {mod.name}
                  </p>
                  <p className="text-xs text-slate leading-relaxed">{mod.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
