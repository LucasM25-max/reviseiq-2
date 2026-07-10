"use client";

import { CalendarClock } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { useBrain } from "@/lib/store";

export default function TimetablePage() {
  const { state, hydrated } = useBrain();
  if (!hydrated) return null;

  const config = state.subjects.find((s) => s.subject === "Biology");
  const hasDates = config?.paper1Date && config?.paper2Date;

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 md:px-10 py-10">
        <ModuleHeader
          eyebrow="Revision timetable"
          title="Your schedule"
          description="Generated from your exam dates and mastery data -- it re-adjusts automatically as both change."
        />
        <div className="mt-8">
          <EmptyState
            icon={<CalendarClock size={20} />}
            title={hasDates ? "Timetable not generated yet" : "Add your exam dates first"}
            description={
              hasDates
                ? "Your exam dates are set. Once there's mastery data to work from, a day-by-day schedule will build itself here."
                : "Head back to setup to add Paper 1 and Paper 2 dates -- the timetable engine needs them to work backward from."
            }
          />
        </div>
      </div>
    </AppShell>
  );
}
