"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBrain } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { FormField, inputClasses } from "@/components/ui/FormField";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useBrain();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [school, setSchool] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError("Username needs to be at least 3 characters.");
      return;
    }
    if (password.length < 8) {
      setError("Password needs to be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    signUp(username.trim(), school.trim() || null);
    router.push("/onboarding/subjects");
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <span className="h-6 w-6 rounded-sm bg-cobalt" aria-hidden />
          <span className="font-display text-base font-semibold text-graphite">ReviseIQ</span>
        </Link>

        <h1 className="font-display text-2xl font-semibold text-graphite text-center mb-1">
          Create your account
        </h1>
        <p className="text-sm text-slate text-center mb-8">
          Takes about two minutes, then straight into setup.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormField label="Username">
            <input
              className={inputClasses}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </FormField>

          <FormField label="Password" hint="At least 8 characters.">
            <input
              type="password"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </FormField>

          <FormField label="Confirm password">
            <input
              type="password"
              className={inputClasses}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </FormField>

          <FormField label="School" hint="Optional -- you can add this later.">
            <input
              className={inputClasses}
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="e.g. Riverside Academy"
            />
          </FormField>

          {error && (
            <p className="text-sm text-danger bg-danger-light rounded-sm px-3 py-2">{error}</p>
          )}

          <Button type="submit" className="w-full mt-2">
            Create account
          </Button>
        </form>

        <p className="text-sm text-slate text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cobalt font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
