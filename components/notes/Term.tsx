"use client";
import React from "react";

import { useState } from "react";

/**
 * Inline key-term highlight with a click-to-reveal definition — the
 * lightweight "linked to the glossary" behaviour promised in the note
 * formatting legend. Deliberately inline + click-to-expand rather than a
 * hover tooltip, so it works the same on touch devices.
 */
export function Term({
  children,
  definition,
}: {
  children: React.ReactNode;
  definition: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="inline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="font-semibold text-signal underline decoration-dotted decoration-2 underline-offset-2 hover:decoration-solid focus-visible:outline-2"
      >
        {children}
      </button>
      {open && (
        <span className="block mt-1.5 mb-1 rounded-xs bg-signal-light dark:bg-signal/15 px-3 py-2 text-xs text-graphite dark:text-paper leading-relaxed max-w-md">
          {definition}
        </span>
      )}
    </span>
  );
}
