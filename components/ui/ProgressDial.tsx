"use client";

import React from "react";

interface ProgressDialProps {
  /** 0-100 */
  value: number;
  size?: number;
  strokeColor?: string; // hex
  label?: string;
  centerText: string;
  centerSub?: string;
  ticks?: number;
}

/**
 * The recurring "instrument dial" motif: a tick-marked ring (like a lab
 * gauge or protractor) with a progress arc inside it. Used for the exam
 * countdown on the dashboard and for every topic mastery indicator, so the
 * same visual language means "measurement" everywhere it appears.
 */
export function ProgressDial({
  value,
  size = 160,
  strokeColor = "#2954A5",
  label,
  centerText,
  centerSub,
  ticks = 40,
}: ProgressDialProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = size / 2;
  const tickInner = radius - 8;
  const tickOuter = radius - 2;
  const arcRadius = radius - 20;
  const circumference = 2 * Math.PI * arcRadius;
  const offset = circumference - (clamped / 100) * circumference;

  const tickMarks = Array.from({ length: ticks }).map((_, i) => {
    const angle = (i / ticks) * 2 * Math.PI;
    const x1 = radius + tickInner * Math.sin(angle);
    const y1 = radius - tickInner * Math.cos(angle);
    const x2 = radius + tickOuter * Math.sin(angle);
    const y2 = radius - tickOuter * Math.cos(angle);
    const major = i % 5 === 0;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={major ? 1.6 : 0.8}
        className="dial-track"
      />
    );
  });

  return (
    <div className="inline-flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g>{tickMarks}</g>
        <circle
          cx={radius}
          cy={radius}
          r={arcRadius}
          fill="none"
          strokeWidth={3}
          className="dial-track"
        />
        <circle
          cx={radius}
          cy={radius}
          r={arcRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${radius} ${radius})`}
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="numeric fill-graphite dark:fill-paper font-mono font-medium"
          style={{ fontSize: size * 0.16 }}
        >
          {centerText}
        </text>
        {centerSub && (
          <text
            x="50%"
            y="50%"
            dy={size * 0.16}
            dominantBaseline="central"
            textAnchor="middle"
            className="fill-slate font-sans"
            style={{ fontSize: size * 0.068 }}
          >
            {centerSub}
          </text>
        )}
      </svg>
      {label && <span className="text-xs uppercase tracking-wide text-slate">{label}</span>}
    </div>
  );
}
