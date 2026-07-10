"use client";

import { PenLine } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SixMarkPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Six-mark answer builder"
          title="Extended-response practice"
          description="Scaffolded prompts that build a full six-mark answer piece by piece, then compare it against the real mark scheme."
        />
        <div className="mt-8">
          <EmptyState
            icon={<PenLine size={20} />}
            title="No six-mark questions yet"
            description="Once questions are added, each one will walk through a point-by-point scaffold before revealing the mark scheme for self-marking."
          />
        </div>
      </div>
    </AppShell>
  );
}
