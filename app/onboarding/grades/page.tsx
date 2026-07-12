"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBrain } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, inputClasses } from "@/components/ui/FormField";
import type { Grade } from "@/lib/types";

const grades: Grade[] = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "U"];

export default function GradesStep() {
  const router = useRouter();
  const { state, upsertSubject } = useBrain();

  const [current, setCurrent] = useState<Record<string, Grade | "">>({});
  const [target, setTarget] = useState<Record<string, Grade | "">>({});

  useEffect(() => {
    if (state.subjects.length === 0) {
      router.replace("/onboarding/subjects");
      return;
    }
    const c: Record<string, Grade | ""> = {};
    const t: Record<string, Grade | ""> = {};
    state.subjects.forEach((s) => {
      c[s.id] = s.currentGrade ?? "";
      t[s.id] = s.targetGrade ?? "";
    });
    setCurrent(c);
    setTarget(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.subjects.length]);

  function handleContinue() {
    state.subjects.forEach((s) => {
      upsertSubject({
        ...s,
        currentGrade: (current[s.id] || null) as Grade | null,
        targetGrade: (target[s.id] || null) as Grade | null,
      });
    });
    router.push("/onboarding/exam-dates");
  }

  const allSet = state.subjects.every((s) => current[s.id] && target[s.id]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-graphite dark:text-paper mb-1.5">
        Set your grades
      </h1>
      <p className="text-sm text-slate mb-8 max-w-lg">
        Your current grade is your best honest estimate — from a teacher,
        mock exam, or your own judgement. The gap to your target grade shapes
        how the app paces your revision.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {state.subjects.map((s) => (
          <Card key={s.id} className="p-5">
            <p className="font-display text-base font-semibold text-graphite dark:text-paper mb-4">
              {s.subject} <span className="text-slate font-sans text-sm font-normal">({s.board})</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Current working grade">
                <select
                  className={inputClasses}
                  value={current[s.id] ?? ""}
                  onChange={(e) =>
                    setCurrent((c) => ({ ...c, [s.id]: e.target.value as Grade }))
                  }
                >
                  <option value="" disabled>
                    Select a grade
                  </option>
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Target grade">
                <select
                  className={inputClasses}
                  value={target[s.id] ?? ""}
                  onChange={(e) =>
                    setTarget((t) => ({ ...t, [s.id]: e.target.value as Grade }))
                  }
                >
                  <option value="" disabled>
                    Select a grade
                  </option>
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={handleContinue} disabled={!allSet}>
        Continue
      </Button>
    </div>
  );
}
