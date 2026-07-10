import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "./Badge";
import type { BiologyTopic } from "@/lib/data/biologyTopics";

export function TopicRow({ topic, href }: { topic: BiologyTopic; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-sm border border-graphite/[0.06] bg-paper-surface px-5 py-4 transition-colors hover:border-graphite/15"
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: topic.color }}
        aria-hidden
      />
      <span className="font-mono text-xs text-slate w-10 shrink-0">{topic.code}</span>
      <span className="flex-1 text-sm font-medium text-graphite">{topic.name}</span>
      <Badge tone="neutral">Paper {topic.paper}</Badge>
      <span className="font-mono text-xs text-slate-light w-16 text-right">0% mastered</span>
      <ChevronRight
        size={16}
        className="text-slate-light transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
