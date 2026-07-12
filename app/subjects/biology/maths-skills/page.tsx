"use client";

import { Calculator } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";

const skillAreas = [
  "Standard form",
  "Ratios and proportions",
  "Percentages and percentage change",
  "Means, medians and ranges",
  "Reading and drawing graphs",
  "Rates and gradients",
];

export default function MathsSkillsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Maths skills"
          title="The maths inside Biology"
          description="Around 10% of Biology marks depend on maths skills applied in a biological context — drilled separately so marks aren't lost here."
        />

        <div className="grid sm:grid-cols-2 gap-3 mt-8 mb-6">
          {skillAreas.map((skill) => (
            <Card key={skill} className="p-4">
              <p className="text-sm font-medium text-graphite dark:text-paper">{skill}</p>
              <p className="text-xs text-slate-light mt-1">Drills coming soon</p>
            </Card>
          ))}
        </div>

        <EmptyState
          icon={<Calculator size={20} />}
          title="No drills yet"
          description="This module is scaffolded and ready — practice questions for each skill area will be added here."
        />
      </div>
    </AppShell>
  );
}
