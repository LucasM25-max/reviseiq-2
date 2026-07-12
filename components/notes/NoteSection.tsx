import React from "react";

export function NoteSection({
  id,
  number,
  title,
  color,
  children,
}: {
  id: string;
  number: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} aria-hidden />
        <span className="font-mono text-xs text-slate">{number}</span>
        <h2 className="font-display text-lg font-semibold text-graphite dark:text-paper">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
