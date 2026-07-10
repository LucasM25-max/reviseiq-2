"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBrain } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { FormField, inputClasses } from "@/components/ui/FormField";

export default function LoginPage() {
  const router = useRouter();
  const { logIn, state } = useBrain();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      setError("Enter your password.");
      return;
    }
    const success = logIn(username.trim());
    if (!success) {
      setError("No local account matches that username on this device.");
      return;
    }
    setError(null);
    router.push(state.onboarded ? "/dashboard" : "/onboarding/subjects");
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <span className="h-6 w-6 rounded-sm bg-cobalt" aria-hidden />
          <span className="font-display text-base font-semibold text-graphite">ReviseIQ</span>
        </Link>

        <h1 className="font-display text-2xl font-semibold text-graphite text-center mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-slate text-center mb-8">Log in to continue revising.</p>

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

          <FormField label="Password">
            <input
              type="password"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </FormField>

          {error && (
            <p className="text-sm text-danger bg-danger-light rounded-sm px-3 py-2">{error}</p>
          )}

          <Button type="submit" className="w-full mt-2">
            Log in
          </Button>
        </form>

        <p className="text-sm text-slate text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cobalt font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
