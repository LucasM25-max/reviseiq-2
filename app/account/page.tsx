"use client";

import React from "react";
import { useState } from "react";
import { User, Lock, Palette, Eye, Check } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { useBrain } from "@/lib/store";
import type { TextScale, Theme } from "@/lib/types";
import clsx from "clsx";

export default function AccountPage() {
  const { state, updateProfile, updatePreferences } = useBrain();

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 md:px-10 py-10">
        <h1 className="font-display text-2xl font-semibold text-graphite dark:text-paper mb-1.5">
          Account
        </h1>
        <p className="text-sm text-slate mb-10">
          Manage your profile, password, and how ReviseIQ looks and reads.
        </p>

        <div className="flex flex-col gap-6">
          <ProfileSection
            username={state.user?.username ?? ""}
            school={state.user?.school ?? ""}
            onSave={updateProfile}
          />
          <PasswordSection />
          <AppearanceSection theme={state.preferences.theme} onChange={(theme) => updatePreferences({ theme })} />
          <AccessibilitySection
            dyslexiaFont={state.preferences.dyslexiaFont}
            textScale={state.preferences.textScale}
            colorBlindSafe={state.preferences.colorBlindSafe}
            onChange={updatePreferences}
          />
        </div>
      </div>
    </AppShell>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-cobalt-light text-cobalt-dark dark:bg-cobalt/25 dark:text-white">
        {icon}
      </div>
      <div>
        <h2 className="font-display text-base font-semibold text-graphite dark:text-paper">{title}</h2>
        <p className="text-xs text-slate mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function ProfileSection({
  username,
  school,
  onSave,
}: {
  username: string;
  school: string;
  onSave: (username: string, school: string | null) => void;
}) {
  const [name, setName] = useState(username);
  const [schoolName, setSchoolName] = useState(school);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (name.trim().length < 3) return;
    onSave(name.trim(), schoolName.trim() || null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="p-6">
      <SectionHeader
        icon={<User size={16} />}
        title="Profile"
        description="Your username and school."
      />
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <FormField label="Username">
          <input className={inputClasses} value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField label="School" hint="Optional">
          <input
            className={inputClasses}
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </FormField>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={handleSave}>
          Save changes
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-xs text-signal">
            <Check size={14} /> Saved
          </span>
        )}
      </div>
    </Card>
  );
}

function PasswordSection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (next.length < 8) {
      setError("New password needs to be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New passwords don't match.");
      return;
    }
    setError(null);
    setCurrent("");
    setNext("");
    setConfirm("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="p-6">
      <SectionHeader
        icon={<Lock size={16} />}
        title="Password"
        description="Change the password on this account."
      />
      <p className="text-xs text-amber bg-amber-light dark:bg-amber/15 rounded-sm px-3 py-2 mb-5">
        This app doesn't have a backend yet, so passwords aren't stored
        anywhere — this form is wired up and validates correctly, but
        nothing is actually saved until real authentication is added.
      </p>
      <div className="flex flex-col gap-5 mb-5 max-w-sm">
        <FormField label="Current password">
          <input
            type="password"
            className={inputClasses}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </FormField>
        <FormField label="New password" hint="At least 8 characters.">
          <input
            type="password"
            className={inputClasses}
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </FormField>
        <FormField label="Confirm new password">
          <input
            type="password"
            className={inputClasses}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormField>
      </div>
      {error && (
        <p className="text-sm text-danger bg-danger-light dark:bg-danger/15 rounded-sm px-3 py-2 mb-4 max-w-sm">{error}</p>
      )}
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={handleSave}>
          Update password
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-xs text-signal">
            <Check size={14} /> Validated
          </span>
        )}
      </div>
    </Card>
  );
}

function AppearanceSection({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={<Palette size={16} />}
        title="Appearance"
        description="Choose how ReviseIQ looks."
      />
      <div className="flex gap-2">
        <PillOption active={theme === "light"} onClick={() => onChange("light")}>
          Light
        </PillOption>
        <PillOption active={theme === "dark"} onClick={() => onChange("dark")}>
          Dark
        </PillOption>
      </div>
    </Card>
  );
}

function AccessibilitySection({
  dyslexiaFont,
  textScale,
  colorBlindSafe,
  onChange,
}: {
  dyslexiaFont: boolean;
  textScale: TextScale;
  colorBlindSafe: boolean;
  onChange: (partial: { dyslexiaFont?: boolean; textScale?: TextScale; colorBlindSafe?: boolean }) => void;
}) {
  return (
    <Card className="p-6">
      <SectionHeader
        icon={<Eye size={16} />}
        title="Accessibility"
        description="Adjust text and colour to suit how you read best."
      />

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-graphite dark:text-paper mb-2.5">Text size</p>
          <div className="flex gap-2">
            {(["normal", "large", "xl"] as TextScale[]).map((scale) => (
              <PillOption
                key={scale}
                active={textScale === scale}
                onClick={() => onChange({ textScale: scale })}
              >
                {scale === "normal" ? "Normal" : scale === "large" ? "Large" : "Extra large"}
              </PillOption>
            ))}
          </div>
        </div>

        <ToggleRow
          label="Dyslexia-friendly font"
          description="Switches body text to Atkinson Hyperlegible, designed for reading clarity."
          checked={dyslexiaFont}
          onChange={(v) => onChange({ dyslexiaFont: v })}
        />

        <ToggleRow
          label="Colour-blind-safe topic colours"
          description="Swaps the 7 Biology topic colours for a palette distinguishable under common colour vision deficiencies."
          checked={colorBlindSafe}
          onChange={(v) => onChange({ colorBlindSafe: v })}
        />
      </div>
    </Card>
  );
}

function PillOption({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-sm border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-cobalt bg-cobalt-light text-cobalt-dark dark:bg-cobalt/25 dark:text-white"
          : "border-graphite/15 text-slate hover:border-graphite/30 dark:border-white/15 dark:hover:border-white/30"
      )}
    >
      {children}
    </button>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-graphite dark:text-paper">{label}</p>
        <p className="text-xs text-slate mt-0.5 max-w-sm">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-cobalt" : "bg-graphite/15 dark:bg-white/15"
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-card transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
