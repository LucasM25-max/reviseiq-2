"use client";

import { CalendarClock } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBrain } from "@/lib/store";

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TimetablePage() {
  const { state, hydrated } = useBrain();
  if (!hydrated) return null;

  const hasSubjects = state.subjects.length > 0;
  const allDatesSet = state.subjects.every((s) => s.paper1Date && s.paper2Date);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-cobalt">
            Revision timetable
          </span>
          <h1 className="font-display text-2xl font-semibold text-graphite dark:text-paper mt-1.5 mb-2">
            Your schedule
          </h1>
          <p className="text-sm text-slate max-w-lg leading-relaxed">
            One timetable across every subject, built backward from each exam
            date and reshuffled as mastery data comes in. This replaces
            needing a separate schedule per subject.
          </p>
        </div>

        {hasSubjects && (
          <div className="flex flex-col gap-2 mt-8">
            {state.subjects.map((s) => (
              <Card key={s.id} className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-graphite dark:text-paper">
                    {s.subject} <span className="text-slate font-normal">({s.board})</span>
                  </p>
                  <p className="text-xs text-slate-light mt-1">
                    Paper 1: {formatDate(s.paper1Date) ?? "not set"} &nbsp;·&nbsp; Paper 2:{" "}
                    {formatDate(s.paper2Date) ?? "not set"}
                  </p>
                </div>
                <Badge tone={s.paper1Date && s.paper2Date ? "signal" : "amber"}>
                  {s.paper1Date && s.paper2Date ? "Dates set" : "Add dates"}
                </Badge>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6">
          <EmptyState
            icon={<CalendarClock size={20} />}
            title={
              !hasSubjects
                ? "No subjects set up yet"
                : allDatesSet
                ? "Timetable not generated yet"
                : "Some exam dates are missing"
            }
            description={
              !hasSubjects
                ? "Add a subject from onboarding to start building a schedule."
                : allDatesSet
                ? "Every subject has exam dates set. Once there's mastery data to work from, a day-by-day schedule spanning all subjects will build itself here."
                : "Head to your account or subject setup to fill in any missing Paper 1 or Paper 2 dates -- the timetable engine needs them to work backward from."
            }
          />
        </div>
      </div>
    </AppShell>
  );
}
