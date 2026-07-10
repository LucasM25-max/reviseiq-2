import clsx from "clsx";

interface StepperProps {
  steps: string[];
  current: number; // 0-indexed
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center gap-0 w-full max-w-xl">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-start gap-2">
            <span
              className={clsx(
                "font-mono text-xs",
                i === current ? "text-cobalt" : i < current ? "text-signal" : "text-slate-light"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={clsx(
                "text-sm font-medium",
                i === current ? "text-graphite" : i < current ? "text-graphite/70" : "text-slate-light"
              )}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={clsx(
                "h-px flex-1 mx-4 mt-[-20px]",
                i < current ? "bg-signal" : "bg-graphite/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
