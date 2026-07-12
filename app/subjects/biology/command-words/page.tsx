"use client";

import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const commandWords = [
  "Describe",
  "Explain",
  "Evaluate",
  "Calculate",
  "Compare",
  "Suggest",
  "Determine",
  "Justify",
  "Plan",
  "Deduce",
];

export default function CommandWordsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Command words"
          title="Command word trainer"
          description="AQA examiner reports consistently flag command-word confusion as a cause of lost marks. Each word gets a plain definition and practice questions."
        />

        <div className="flex flex-col gap-2 mt-8">
          {commandWords.map((word) => (
            <Card key={word} className="p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-graphite dark:text-paper">{word}</span>
              <Badge tone="amber">Definition coming soon</Badge>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
