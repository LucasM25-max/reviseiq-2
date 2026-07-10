"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBrain } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, inputClasses } from "@/components/ui/FormField";

export default function ExamDatesStep() {
  const router = useRouter();
  const { state, upsertSubject, completeOnboarding } = useBrain();

  const [paper1, setPaper1] = useState<Record<string, string>>({});
  const [paper2, setPaper2] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state.subjects.length === 0) {
      router.replace("/onboarding/subjects");
      return;
    }
    const p1: Record<string, string> = {};
    const p2: Record<string, string> = {};
    state.subjects.forEach((s) => {
      p1[s.id] = s.paper1Date ?? "";
      p2[s.id] = s.paper2Date ?? "";
    });
    setPaper1(p1);
    setPaper2(p2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.subjects.length]);

  function handleFinish() {
    state.subjects.forEach((s) => {
      upsertSubject({
        ...s,
        paper1Date: paper1[s.id] || null,
        paper2Date: paper2[s.id] || null,
      });
    });
    completeOnboarding();
    router.push("/dashboard");
  }

  const allSet = state.subjects.every((s) => paper1[s.id] && paper2[s.id]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-graphite mb-1.5">
        Set your exam dates
      </h1>
      <p className="text-sm text-slate mb-8 max-w-lg">
        Biology is examined across two papers. These dates drive the
        countdown on your dashboard and how revision intensity ramps up
        toward each paper.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {state.subjects.map((s) => (
          <Card key={s.id} className="p-5">
            <p className="font-display text-base font-semibold text-graphite mb-4">
              {s.subject} <span className="text-slate font-sans text-sm font-normal">({s.board})</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Paper 1 date">
                <input
                  type="date"
                  className={inputClasses}
                  value={paper1[s.id] ?? ""}
                  onChange={(e) => setPaper1((p) => ({ ...p, [s.id]: e.target.value }))}
                />
              </FormField>
              <FormField label="Paper 2 date">
                <input
                  type="date"
                  className={inputClasses}
                  value={paper2[s.id] ?? ""}
                  onChange={(e) => setPaper2((p) => ({ ...p, [s.id]: e.target.value }))}
                />
              </FormField>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleFinish} disabled={!allSet}>
        Finish setup
      </Button>
    </div>
  );
}
