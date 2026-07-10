"use client";

import { AppShell } from "@/components/ui/AppShell";
import { TopicRow } from "@/components/ui/TopicRow";
import { biologyTopics } from "@/lib/data/biologyTopics";
import { ModuleHeader } from "@/components/ui/ModuleHeader";

export default function NotesIndex() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Study notes"
          title="Notes by topic"
          description="Dual-coded, colour-coded notes chunked for retrieval practice. Pick a topic to open its notes."
        />
        <div className="flex flex-col gap-2 mt-8">
          {biologyTopics.map((t) => (
            <TopicRow key={t.code} topic={t} href={`/subjects/biology/notes/${t.code}`} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
