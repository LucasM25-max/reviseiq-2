"use client";

import { TestTube } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { requiredPracticals, biologyTopics } from "@/lib/data/biologyTopics";

export default function PracticalsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Required practicals"
          title="Required practicals"
          description="Method, variables, hazards and exam-style questions for each one -- these are heavily examined and easy to under-revise."
        />

        <div className="flex flex-col gap-2 mt-8">
          {requiredPracticals.map((p) => {
            const topic = biologyTopics.find((t) => t.code === p.topicCode);
            return (
              <Card key={p.id} className="p-5 flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-graphite/[0.05] text-slate">
                  <TestTube size={15} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-graphite">{p.title}</p>
                  <p className="text-xs text-slate-light mt-0.5">
                    Linked to {topic?.code} {topic?.name}
                  </p>
                </div>
                <Badge tone={p.status === "confirmed" ? "signal" : "amber"}>
                  {p.status === "confirmed" ? "Structure ready" : "Verify against spec"}
                </Badge>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-slate-light mt-6">
          Titles are drawn from the AQA Biology specification. Method,
          hazard and question content is intentionally not written yet --
          confirm the full official list before publishing.
        </p>
      </div>
    </AppShell>
  );
}
