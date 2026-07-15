"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Check, X, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { inputClasses } from "@/components/ui/FormField";
import type { AiMarkResult, ExamQuestion, GradeBand } from "@/lib/types";

const gradeBandTone: Record<GradeBand, "signal" | "cobalt" | "amber"> = {
  "4-6": "signal",
  "6-7": "cobalt",
  "7-9": "amber",
};

interface PartState {
  answer: string;
  mcqSelected: number | null;
  result: AiMarkResult | null;
  loading: boolean;
  error: string | null;
  showScheme: boolean;
}

const emptyPartState: PartState = {
  answer: "",
  mcqSelected: null,
  result: null,
  loading: false,
  error: null,
  showScheme: false,
};

export function QuestionCard({ question, topicColorHex }: { question: ExamQuestion; topicColorHex: string }) {
  const [parts, setParts] = useState<Record<string, PartState>>(() =>
    Object.fromEntries(question.parts.map((p) => [p.id, { ...emptyPartState }]))
  );

  function updatePart(id: string, patch: Partial<PartState>) {
    setParts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function markFreeResponse(partId: string) {
    const part = question.parts.find((p) => p.id === partId);
    if (!part) return;
    const state = parts[partId];
    if (!state.answer.trim()) {
      updatePart(partId, { error: "Write an answer before submitting for marking." });
      return;
    }
    updatePart(partId, { loading: true, error: null });
    try {
      const res = await fetch("/api/mark-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPrompt: part.prompt,
          context: question.context,
          markScheme: part.markScheme ?? [],
          maxMarks: part.marks,
          studentAnswer: state.answer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        updatePart(partId, { loading: false, error: data.error ?? "Marking failed. Try again." });
        return;
      }
      updatePart(partId, { loading: false, result: data as AiMarkResult });
    } catch {
      updatePart(partId, { loading: false, error: "Couldn't reach the marking service. Check your connection and try again." });
    }
  }

  const marksSoFar = question.parts.reduce((sum, p) => {
    const s = parts[p.id];
    if (p.type === "multiple-choice") {
      return sum + (s.mcqSelected !== null && s.mcqSelected === p.correctOption ? p.marks : 0);
    }
    return sum + (s.result?.marksAwarded ?? 0);
  }, 0);

  const attempted = question.parts.every((p) => {
    const s = parts[p.id];
    return p.type === "multiple-choice" ? s.mcqSelected !== null : s.result !== null;
  });

  return (
    <Card className="p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone={gradeBandTone[question.gradeBand]}>Grade {question.gradeBand}</Badge>
          <Badge tone="neutral">{question.assessmentObjective}</Badge>
          <Badge tone="neutral">{question.subpoint}</Badge>
        </div>
        <span
          className={clsx(
            "text-xs font-medium tabular-nums shrink-0",
            attempted ? "text-graphite dark:text-paper" : "text-slate-light"
          )}
        >
          {attempted ? `${marksSoFar} / ${question.totalMarks} marks` : `${question.totalMarks} marks total`}
        </span>
      </div>

      {question.context && <p className="text-sm text-slate leading-relaxed">{question.context}</p>}

      <div className="flex flex-col gap-6">
        {question.parts.map((part) => {
          const state = parts[part.id];
          return (
            <div key={part.id} className="flex flex-col gap-3">
              <p className="text-sm text-graphite dark:text-paper leading-relaxed">
                {part.label && <span className="font-medium mr-1">{part.label}</span>}
                {part.prompt}
                <span className="text-xs text-slate-light ml-1.5">
                  [{part.marks} mark{part.marks === 1 ? "" : "s"}]
                </span>
              </p>

              {part.type === "multiple-choice" ? (
                <div className="flex flex-col gap-1.5">
                  {part.options!.map((option, idx) => {
                    const selected = state.mcqSelected === idx;
                    const revealed = state.mcqSelected !== null;
                    const isCorrect = idx === part.correctOption;
                    return (
                      <button
                        key={idx}
                        onClick={() => updatePart(part.id, { mcqSelected: idx })}
                        disabled={revealed}
                        className={clsx(
                          "flex items-center justify-between rounded-sm border px-4 py-2.5 text-sm text-left transition-colors",
                          !revealed &&
                            "border-graphite/15 dark:border-white/15 hover:border-cobalt text-graphite dark:text-paper",
                          revealed && isCorrect && "border-signal bg-signal-light text-signal dark:bg-signal/15",
                          revealed && selected && !isCorrect && "border-danger bg-danger-light text-danger dark:bg-danger/15",
                          revealed && !selected && !isCorrect && "border-graphite/10 dark:border-white/10 text-slate-light"
                        )}
                      >
                        <span>{option}</span>
                        {revealed && isCorrect && <Check size={15} />}
                        {revealed && selected && !isCorrect && <X size={15} />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <textarea
                    className={clsx(inputClasses, "min-h-[88px] resize-y")}
                    placeholder="Type your answer..."
                    value={state.answer}
                    onChange={(e) => updatePart(part.id, { answer: e.target.value, error: null })}
                    disabled={state.loading}
                  />

                  {state.error && (
                    <p className="flex items-center gap-1.5 text-xs text-danger">
                      <AlertCircle size={13} />
                      {state.error}
                    </p>
                  )}

                  {!state.result ? (
                    <button
                      onClick={() => markFreeResponse(part.id)}
                      disabled={state.loading}
                      className="self-start flex items-center gap-1.5 rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-dark transition-colors disabled:opacity-60"
                    >
                      {state.loading && <Loader2 size={14} className="animate-spin" />}
                      {state.loading ? "Marking..." : "Mark my answer"}
                    </button>
                  ) : (
                    <div className="rounded-sm border border-graphite/10 dark:border-white/10 p-4 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "text-sm font-semibold tabular-nums",
                            state.result.marksAwarded === part.marks
                              ? "text-signal"
                              : state.result.marksAwarded === 0
                              ? "text-danger"
                              : "text-amber"
                          )}
                        >
                          {state.result.marksAwarded} / {part.marks} marks
                        </span>
                      </div>

                      {state.result.matchedPoints.length > 0 && (
                        <ul className="flex flex-col gap-1">
                          {state.result.matchedPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate">
                              <Check size={12} className="text-signal mt-0.5 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}

                      {state.result.feedback && <p className="text-xs text-slate leading-relaxed">{state.result.feedback}</p>}

                      <button
                        onClick={() => updatePart(part.id, { showScheme: !state.showScheme })}
                        className="self-start flex items-center gap-1 text-xs font-medium text-cobalt-dark dark:text-cobalt hover:underline"
                      >
                        <ChevronDown size={13} className={clsx("transition-transform", state.showScheme && "rotate-180")} />
                        {state.showScheme ? "Hide mark scheme" : "Show full mark scheme"}
                      </button>

                      {state.showScheme && (
                        <div className="rounded-xs bg-graphite/[0.03] dark:bg-white/5 p-3 flex flex-col gap-1.5">
                          <ul className="flex flex-col gap-1">
                            {(part.markScheme ?? []).map((mp, i) => (
                              <li key={i} className="text-xs text-slate leading-relaxed">
                                • {mp.point}{" "}
                                <span className="text-slate-light">
                                  ({mp.marks} mark{mp.marks === 1 ? "" : "s"})
                                </span>
                              </li>
                            ))}
                          </ul>
                          {part.modelAnswer && (
                            <p className="text-xs text-slate leading-relaxed mt-1.5 pt-1.5 border-t border-graphite/10 dark:border-white/10">
                              <span className="font-medium text-graphite dark:text-paper">Model answer: </span>
                              {part.modelAnswer}
                            </p>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => updatePart(part.id, { ...emptyPartState, answer: state.answer })}
                        className="self-start text-xs text-slate-light hover:text-slate"
                      >
                        Try again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {question.examTip && (
        <div className="rounded-sm bg-amber-light dark:bg-amber/10 px-4 py-3">
          <p className="text-xs text-graphite dark:text-paper leading-relaxed">
            <span className="font-medium">Exam tip: </span>
            {question.examTip}
          </p>
        </div>
      )}

      <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: topicColorHex }} aria-hidden />
    </Card>
  );
}
