import React from "react";
import { ArrowRight, Target, Microscope, Repeat } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ProgressDial } from "@/components/ui/ProgressDial";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-sm bg-cobalt" aria-hidden />
            <span className="font-display text-base font-semibold text-graphite">
              ReviseIQ
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <LinkButton href="/login" variant="ghost">
              Log in
            </LinkButton>
            <LinkButton href="/signup" variant="primary">
              Get started
            </LinkButton>
          </nav>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
          <div>
            <span className="tick-rule w-16 block mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-graphite leading-[1.08] tracking-tight">
              GCSE revision, measured precisely.
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate leading-relaxed max-w-md">
              ReviseIQ builds a live model of exactly what each student knows,
              topic by topic, then decides what they should revise next. No
              guessing which chapter to open. No revising what's already
              secure.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <LinkButton href="/signup" variant="primary" className="text-base px-6 py-3.5">
                Start onboarding
                <ArrowRight size={16} />
              </LinkButton>
              <LinkButton href="/login" variant="secondary" className="text-base px-6 py-3.5">
                I have an account
              </LinkButton>
            </div>
            <p className="mt-6 text-xs text-slate-light">
              Currently supports AQA Biology. Built to expand to every GCSE
              subject and exam board.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="flex flex-col items-center gap-6 px-10 py-12">
              <ProgressDial
                value={62}
                size={200}
                strokeColor="#23897E"
                centerText="62%"
                centerSub="4.5 Homeostasis"
                label="Example topic mastery"
              />
              <p className="text-xs text-slate-light text-center max-w-[220px]">
                Every note read, flashcard answered and question attempted
                moves this number -- for real students, this starts at zero.
              </p>
            </Card>
          </div>
        </section>

        <section className="grid sm:grid-cols-3 gap-5 pb-24">
          <FeatureCard
            icon={<Microscope size={18} />}
            title="Mapped to the spec"
            description="Every topic, paper and required practical follows the AQA Biology specification exactly -- nothing invented, nothing missed."
          />
          <FeatureCard
            icon={<Repeat size={18} />}
            title="Spaced, not static"
            description="Flashcards and questions resurface on a schedule built from what each student forgets, not a fixed weekly plan."
          />
          <FeatureCard
            icon={<Target size={18} />}
            title="Built around the target grade"
            description="Current grade, target grade and exam date all shape how hard the app pushes on each topic."
          />
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-cobalt-light text-cobalt-dark mb-4">
        {icon}
      </div>
      <h3 className="font-display text-sm font-semibold text-graphite mb-1.5">{title}</h3>
      <p className="text-sm text-slate leading-relaxed">{description}</p>
    </Card>
  );
}
