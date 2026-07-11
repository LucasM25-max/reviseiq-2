import clsx from "clsx";
import React from "react";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-md border border-graphite/[0.06] bg-paper-surface shadow-card dark:border-white/10 dark:bg-graphite-soft dark:shadow-none",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
