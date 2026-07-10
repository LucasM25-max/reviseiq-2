import Link from "next/link";
import clsx from "clsx";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cobalt text-white hover:bg-cobalt-dark active:bg-cobalt-dark shadow-card",
  secondary:
    "bg-transparent text-graphite border border-graphite/15 hover:border-graphite/30 hover:bg-graphite/[0.03]",
  ghost: "bg-transparent text-slate hover:text-graphite hover:bg-graphite/[0.04]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variantClasses[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  children,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={clsx(base, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
