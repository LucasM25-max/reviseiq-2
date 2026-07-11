import React from "react";

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-graphite dark:text-paper">{label}</span>
      {children}
      {hint && <span className="text-xs text-slate">{hint}</span>}
    </label>
  );
}

export const inputClasses =
  "w-full rounded-sm border border-graphite/15 bg-paper-surface px-4 py-3 text-sm text-graphite placeholder:text-slate-light focus:border-cobalt outline-none transition-colors dark:border-white/15 dark:bg-graphite-soft dark:text-paper";
