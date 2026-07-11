import clsx from "clsx";
import React from "react";

type Tone = "neutral" | "cobalt" | "amber" | "signal" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-graphite/[0.06] text-graphite/70 dark:bg-white/10 dark:text-paper/70",
  cobalt: "bg-cobalt-light text-cobalt-dark dark:bg-cobalt/20 dark:text-white",
  amber: "bg-amber-light text-amber dark:bg-amber/20 dark:text-amber",
  signal: "bg-signal-light text-signal dark:bg-signal/20 dark:text-signal",
  danger: "bg-danger-light text-danger dark:bg-danger/20 dark:text-danger",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
