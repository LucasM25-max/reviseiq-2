"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BrainState, Preferences, SubjectConfig, UserProfile } from "./types";
import { defaultPreferences } from "./types";

const STORAGE_KEY = "reviseiq.brain.v1";

const emptyState: BrainState = {
  user: null,
  subjects: [],
  onboarded: false,
  preferences: defaultPreferences,
};

interface BrainContextValue {
  state: BrainState;
  hydrated: boolean;
  signUp: (username: string, school: string | null) => void;
  logIn: (username: string) => boolean;
  logOut: () => void;
  upsertSubject: (subject: SubjectConfig) => void;
  completeOnboarding: () => void;
  updateProfile: (username: string, school: string | null) => void;
  updatePreferences: (partial: Partial<Preferences>) => void;
}

const BrainContext = createContext<BrainContextValue | null>(null);

/**
 * NOTE ON AUTH: this is a local-only, single-device mock so the onboarding
 * and product flow can be tested end to end without a backend. Passwords
 * are validated on forms but deliberately never persisted anywhere — there
 * is nothing here safe to call "real" auth. Before any real user data is
 * involved, replace this with a proper backend (hashed credentials, a
 * database, session handling — e.g. NextAuth, Supabase Auth, or a custom
 * API).
 */
export function BrainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BrainState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // merge defaults so older saved state without `preferences` still works
        setState({ ...emptyState, ...parsed, preferences: { ...defaultPreferences, ...parsed.preferences } });
      }
    } catch {
      // ignore corrupt local storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  // Apply theme, dyslexia-friendly font and text scale to the document as
  // preferences change — these are global visual effects, not scoped to
  // any one component tree.
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", state.preferences.theme === "dark");
    document.body.classList.toggle("dyslexia-font", state.preferences.dyslexiaFont);
    root.classList.remove("text-scale-large", "text-scale-xl");
    if (state.preferences.textScale === "large") root.classList.add("text-scale-large");
    if (state.preferences.textScale === "xl") root.classList.add("text-scale-xl");
  }, [state.preferences, hydrated]);

  const value = useMemo<BrainContextValue>(
    () => ({
      state,
      hydrated,
      signUp: (username, school) => {
        const user: UserProfile = {
          username,
          school: school || null,
          createdAt: new Date().toISOString(),
        };
        setState((s) => ({ ...s, user }));
      },
      logIn: (username) => {
        if (state.user && state.user.username.toLowerCase() === username.toLowerCase()) {
          return true;
        }
        return false;
      },
      logOut: () => setState((s) => ({ ...emptyState, preferences: s.preferences })),
      upsertSubject: (subject) => {
        setState((s) => {
          const exists = s.subjects.some((sub) => sub.id === subject.id);
          const subjects = exists
            ? s.subjects.map((sub) => (sub.id === subject.id ? subject : sub))
            : [...s.subjects, subject];
          return { ...s, subjects };
        });
      },
      completeOnboarding: () => setState((s) => ({ ...s, onboarded: true })),
      updateProfile: (username, school) => {
        setState((s) => (s.user ? { ...s, user: { ...s.user, username, school } } : s));
      },
      updatePreferences: (partial) => {
        setState((s) => ({ ...s, preferences: { ...s.preferences, ...partial } }));
      },
    }),
    [state, hydrated]
  );

  return <BrainContext.Provider value={value}>{children}</BrainContext.Provider>;
}

export function useBrain() {
  const ctx = useContext(BrainContext);
  if (!ctx) throw new Error("useBrain must be used inside BrainProvider");
  return ctx;
}
