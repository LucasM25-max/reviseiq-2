import React from "react";
import { Card } from "./Card";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center text-center gap-4 px-8 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-graphite/[0.05] text-slate dark:bg-white/10">
        {icon}
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-display text-lg font-semibold text-graphite dark:text-paper">{title}</h3>
        <p className="text-sm text-slate leading-relaxed">{description}</p>
      </div>
      {action}
    </Card>
  );
}
