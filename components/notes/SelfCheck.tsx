"use client";
import React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface SelfCheckQuestion {
  q: React.ReactNode;
  a: React.ReactNode;
}

/**
 * Retrieval-practice block: every note section ends with one of these.
 * Answers are hidden until clicked so reading the question first forces
 * actual recall rather than passive re-reading.
 */
export function SelfCheck({ questions }: { questions: SelfCheckQuestion[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-sm border border-graphite/10 dark:border-white/10 overflow-hidden">
      <div className="bg-graphite/[0.03] dark:bg-white/[0.05] px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate">
          Check your understanding
        </p>
      </div>
      <div className="divide-y divide-graphite/10 dark:divide-white/10">
        {questions.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-sm text-graphite dark:text-paper hover:bg-graphite/[0.02] dark:hover:bg-white/[0.03] transition-colors"
            >
              <span>{item.q}</span>
              <ChevronDown
                size={15}
                className={clsx(
                  "shrink-0 text-slate-light transition-transform",
                  open === i && "rotate-180"
                )}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-slate leading-relaxed bg-graphite/[0.015] dark:bg-white/[0.02]">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
