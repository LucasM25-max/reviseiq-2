import React from "react";
import { AlertTriangle, Calculator, Lightbulb, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type Variant = "mistake" | "maths" | "example";

const config: Record<Variant, { icon: LucideIcon; label: string; tone: "amber" | "cobalt" | "signal"; bg: string }> = {
  mistake: {
    icon: AlertTriangle,
    label: "Common exam mistake",
    tone: "amber",
    bg: "bg-amber-light dark:bg-amber/10",
  },
  maths: {
    icon: Calculator,
    label: "Maths skill",
    tone: "cobalt",
    bg: "bg-cobalt-light dark:bg-cobalt/10",
  },
  example: {
    icon: Lightbulb,
    label: "Worked example",
    tone: "signal",
    bg: "bg-signal-light dark:bg-signal/10",
  },
};

export function Callout({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, tone, bg } = config[variant];
  return (
    <div className={`rounded-sm p-5 ${bg}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon size={15} />
        <Badge tone={tone}>{title ?? label}</Badge>
      </div>
      <div className="text-sm text-graphite dark:text-paper leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
