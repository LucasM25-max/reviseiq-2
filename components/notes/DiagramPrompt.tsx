import { Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * Placeholder for a diagram that hasn't been generated yet. Renders the
 * exact prompt an AI image generator would need, styled clearly as
 * scaffolding rather than a bug. All prompts specify flat vector
 * illustration style, matching the agreed diagram style for the app.
 */
export function DiagramPrompt({ title, prompt }: { title: string; prompt: string }) {
  return (
    <div className="rounded-sm border border-dashed border-graphite/20 dark:border-white/20 bg-graphite/[0.02] dark:bg-white/[0.03] p-5">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={15} className="text-slate shrink-0" />
        <p className="text-sm font-medium text-graphite dark:text-paper">{title}</p>
        <Badge tone="neutral">Vector illustration -- not generated yet</Badge>
      </div>
      <p className="text-xs text-slate leading-relaxed font-mono bg-paper dark:bg-graphite rounded-xs px-3 py-2.5 border border-graphite/10 dark:border-white/10">
        {prompt}
      </p>
    </div>
  );
}
