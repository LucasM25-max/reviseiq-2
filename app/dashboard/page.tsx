"use client";

import Link from "next/link";
import { ChevronRight, FlaskConical, Target } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ProgressDial } from "@/components/ui/ProgressDial";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useBrain } from "@/lib/store";

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function DashboardPage() {
  const { state, hydrated } = useBrain();

  if (!hydrated) return null;

  const nextDates = state.subjects
    .flatMap((s) => [s.paper1Date, s.paper2Date])
    .filter((d): d is string => Boolean(d))
    .map((d) => daysUntil(d))
    .filter((d): d is number => d !== null)
    .sort((a, b) => a - b);

  const soonest = nextDates[0] ?? null;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-slate">Welcome back</p>
            <h1 className="font-display text-2xl font-semibold text-graphite">
              {state.user?.username ?? "Student"}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 mb-10">
          <Card className="flex flex-col items-center justify-center px-10 py-10">
            <ProgressDial
              value={0}
              size={148}
              strokeColor="#2954A5"
              centerText={soonest !== null ? String(soonest) : "--"}
              centerSub={soonest !== null ? "days to go" : "no dates set"}
              label="Next exam"
            />
          </Card>

          <Card className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-cobalt">
              <Target size={16} />
              <span className="text-xs font-medium uppercase tracking-wide">Overall mastery</span>
            </div>
            <p className="font-mono text-4xl font-medium text-graphite numeric">0%</p>
            <p className="text-sm text-slate mt-2 max-w-md">
              This will move the moment you start reading notes, answering
              flashcards or attempting questions -- every action recalculates
              it.
            </p>
          </Card>
        </div>

        <h2 className="font-display text-lg font-semibold text-graphite mb-4">Your subjects</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {state.subjects.map((s) => (
            <Link
              key={s.id}
              href="/subjects/biology"
              className="group flex items-center justify-between rounded-md border border-graphite/[0.06] bg-paper-surface p-5 shadow-card transition-colors hover:border-graphite/15"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cobalt-light text-cobalt-dark">
                  <FlaskConical size={18} />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-graphite">
                    {s.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge tone="neutral">{s.board}</Badge>
                    {s.tier && <Badge tone="cobalt">{s.tier}</Badge>}
                    {s.targetGrade && <Badge tone="signal">Target grade {s.targetGrade}</Badge>}
                  </div>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-light transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold text-graphite mb-4">Focus zone</h2>
        <EmptyState
          icon={<Target size={20} />}
          title="Nothing to focus on yet"
          description="Once you've answered some flashcards and questions, your weakest topics will surface here automatically."
        />
      </div>
    </AppShell>
  );
}
