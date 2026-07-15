"use client";
import React, { useMemo, useState } from "react";

import { ListChecks } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { biologyTopics, topicColor } from "@/lib/data/biologyTopics";
import { questionBanks } from "@/lib/content/biology/questions-4-1";
import { useBrain } from "@/lib/store";
import type { AssessmentObjective, GradeBand } from "@/lib/types";

const aoOptions: { value: AssessmentObjective; label: string }[] = [
  { value: "AO1", label: "AO1 — Recall" },
  { value: "AO2", label: "AO2 — Application" },
  { value: "AO3", label: "AO3 — Analysis" },
];

const gradeBandOptions: GradeBand[] = ["4-6", "6-7", "7-9"];

const allQuestions = Object.values(questionBanks).flat();

export default function QuestionsPage() {
  const { state } = useBrain();
  const [topic, setTopic] = useState("all");
  const [ao, setAo] = useState<AssessmentObjective | "all">("all");
  const [gradeBand, setGradeBand] = useState<GradeBand | "all">("all");

  const filtered = useMemo(
    () =>
      allQuestions.filter((q) => {
        if (topic !== "all" && q.topicCode !== topic) return false;
        if (ao !== "all" && q.assessmentObjective !== ao) return false;
        if (gradeBand !== "all" && q.gradeBand !== gradeBand) return false;
        return true;
      }),
    [topic, ao, gradeBand]
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Question bank"
          title="Exam-style questions"
          description="Every question is tagged by topic, assessment objective and target grade. Free-response answers are marked by AI against the exact mark scheme — multiple choice is marked instantly."
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
          <FilterSelect label="Assessment objective" value={ao} onChange={(v) => setAo(v as AssessmentObjective | "all")}>
            <option value="all">All AOs</option>
            {aoOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Target grade" value={gradeBand} onChange={(v) => setGradeBand(v as GradeBand | "all")}>
            <option value="all">All grades</option>
            {gradeBandOptions.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </FilterSelect>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<ListChecks size={20} />}
            title="0 questions match these filters"
            description="Try a broader filter — the question bank currently covers Cell biology (4.1) only, since that's the only topic with written notes so far."
          />
        ) : (
          <div className="flex flex-col gap-5">
            <p className="text-xs text-slate-light">
              {filtered.length} question{filtered.length === 1 ? "" : "s"} · {filtered.reduce((s, q) => s + q.totalMarks, 0)} marks
            </p>
            {filtered.map((q) => (
              <QuestionCard key={q.id} question={q} topicColorHex={topicColor(q.topicCode, state.preferences.colorBlindSafe)} />
            ))}
          </div>
        )}
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
        className="rounded-sm border border-graphite/15 dark:border-white/15 bg-paper-surface dark:bg-graphite-soft px-3 py-2 text-sm text-graphite dark:text-paper outline-none focus:border-cobalt"
      >
        {children}
      </select>
    </label>
  );
}
