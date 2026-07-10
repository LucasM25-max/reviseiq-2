import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ModuleHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <Link
        href="/subjects/biology"
        className="inline-flex items-center gap-1.5 text-xs text-slate hover:text-graphite mb-4 transition-colors"
      >
        <ArrowLeft size={13} />
        Biology
      </Link>
      <span className="text-xs font-medium uppercase tracking-wide text-cobalt">{eyebrow}</span>
      <h1 className="font-display text-2xl font-semibold text-graphite mt-1.5 mb-2">{title}</h1>
      <p className="text-sm text-slate max-w-lg leading-relaxed">{description}</p>
    </div>
  );
}
