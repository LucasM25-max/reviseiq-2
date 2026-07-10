"use client";
import React from "react";

import { useState } from "react";
import { ListChecks } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { biologyTopics } from "@/lib/data/biologyTopics";

const aoOptions = ["AO1 -- Recall", "AO2 -- Application", "AO3 -- Analysis"];
const tierOptions = ["Foundation", "Higher"];

export default function QuestionsPage() {
  const [topic, setTopic] = useState("all");
  const [ao, setAo] = useState("all");
  const [tier, setTier] = useState("all");

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Question bank"
          title="Exam-style questions"
          description="Every question will be tagged by topic, tier, assessment objective, marks and command word so revision can target exactly what's needed."
        />

        <div className="flex flex-wrap gap-3 mt-8 mb-6">
          <FilterSelect label="Topic" value={topic} onChange={setTopic}>
            <option value="all">All topics</option>
            {biologyTopics.map((t) => (
              <option key={t.code} value={t.code}>
                {t.code} {t.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Assessment objective" value={ao} onChange={setAo}>
            <option value="all">All AOs</option>
            {aoOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Tier" value={tier} onChange={setTier}>
            <option value="all">Both tiers</option>
            {tierOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </FilterSelect>
        </div>

        <EmptyState
          icon={<ListChecks size={20} />}
          title="0 questions match these filters"
          description="The question bank is empty for now -- this filter bar is wired up and ready for content."
        />
      </div>
    </AppShell>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-sm border border-graphite/15 bg-paper-surface px-3 py-2 text-sm text-graphite outline-none focus:border-cobalt"
      >
        {children}
      </select>
    </label>
  );
}
