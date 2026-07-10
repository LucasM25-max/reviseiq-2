"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Check, Lock } from "lucide-react";
import { useBrain } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { EntryType, SubjectConfig, Tier } from "@/lib/types";

const comingSoon = [
  "Chemistry",
  "Physics",
  "Combined Science",
  "Maths",
  "English Language",
  "English Literature",
  "Geography",
  "History",
];

export default function SubjectsStep() {
  const router = useRouter();
  const { state, upsertSubject } = useBrain();

  const existing = state.subjects.find((s) => s.subject === "Biology");

  const [selected, setSelected] = useState(true);
  const [entryType, setEntryType] = useState<EntryType>(
    existing?.entryType ?? "Separate (Triple)"
  );
  const [tier, setTier] = useState<Tier | null>(existing?.tier ?? null);

  function handleContinue() {
    const config: SubjectConfig = {
      id: existing?.id ?? "biology-aqa",
      subject: "Biology",
      board: "AQA",
      entryType,
      tier,
      currentGrade: existing?.currentGrade ?? null,
      targetGrade: existing?.targetGrade ?? null,
      paper1Date: existing?.paper1Date ?? null,
      paper2Date: existing?.paper2Date ?? null,
    };
    upsertSubject(config);
    router.push("/onboarding/grades");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-graphite mb-1.5">
        Choose your subjects
      </h1>
      <p className="text-sm text-slate mb-8 max-w-lg">
        Pick a subject and exam board to set up. More subjects and boards are
        being added -- everything here is built to support them without
        changing how this screen works.
      </p>

      <Card
        role="button"
        tabIndex={0}
        onClick={() => setSelected(true)}
        className={clsx(
          "p-5 mb-4 cursor-pointer transition-colors",
          selected ? "border-cobalt ring-1 ring-cobalt" : "hover:border-graphite/15"
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-base font-semibold text-graphite">Biology</p>
            <p className="text-sm text-slate">AQA</p>
          </div>
          <div
            className={clsx(
              "flex h-6 w-6 items-center justify-center rounded-full",
              selected ? "bg-cobalt text-white" : "border border-graphite/20"
            )}
          >
            {selected && <Check size={14} />}
          </div>
        </div>

        {selected && (
          <div
            className="mt-6 grid sm:grid-cols-2 gap-6 border-t border-graphite/[0.06] pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-sm font-medium text-graphite mb-2.5">Entry type</p>
              <div className="flex flex-col gap-2">
                {(["Separate (Triple)", "Combined Science: Trilogy"] as EntryType[]).map(
                  (option) => (
                    <OptionPill
                      key={option}
                      active={entryType === option}
                      onClick={() => setEntryType(option)}
                    >
                      {option}
                    </OptionPill>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-graphite mb-2.5">Tier</p>
              <div className="flex flex-col gap-2">
                {(["Foundation", "Higher"] as Tier[]).map((option) => (
                  <OptionPill key={option} active={tier === option} onClick={() => setTier(option)}>
                    {option}
                  </OptionPill>
                ))}
              </div>
              <p className="text-xs text-slate-light mt-2">
                Not sure yet? You can change this later.
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {comingSoon.map((subject) => (
          <div
            key={subject}
            className="flex items-center justify-between rounded-sm border border-dashed border-graphite/15 px-5 py-4 text-slate-light"
          >
            <span className="text-sm">{subject}</span>
            <Lock size={14} />
          </div>
        ))}
      </div>

      <Button onClick={handleContinue} disabled={!selected}>
        Continue
      </Button>
    </div>
  );
}

function OptionPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-sm border px-4 py-2.5 text-left text-sm font-medium transition-colors",
        active
          ? "border-cobalt bg-cobalt-light text-cobalt-dark"
          : "border-graphite/15 text-slate hover:border-graphite/30"
      )}
    >
      {children}
    </button>
  );
}
