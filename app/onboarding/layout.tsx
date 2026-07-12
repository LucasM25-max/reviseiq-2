"use client";

import { usePathname } from "next/navigation";
import { Stepper } from "@/components/ui/Stepper";

const steps = ["Subjects", "Grades", "Exam dates"];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const current = pathname?.includes("grades")
    ? 1
    : pathname?.includes("exam-dates")
    ? 2
    : 0;

  return (
    <main className="min-h-screen bg-paper dark:bg-graphite">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="flex items-center gap-2 mb-10">
          <span className="h-5 w-5 rounded-sm bg-cobalt" aria-hidden />
          <span className="font-display text-sm font-semibold text-graphite dark:text-paper">ReviseIQ setup</span>
        </div>
        <Stepper steps={steps} current={current} />
        <div className="mt-12">{children}</div>
      </div>
    </main>
  );
}
