"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BrainState, SubjectConfig, UserProfile } from "./types";

const STORAGE_KEY = "reviseiq.brain.v1";

const emptyState: BrainState = {
  user: null,
  subjects: [],
  onboarded: false,
};

interface BrainContextValue {
  state: BrainState;
  hydrated: boolean;
  signUp: (username: string, school: string | null) => void;
  logIn: (username: string) => boolean;
  logOut: () => void;
  upsertSubject: (subject: SubjectConfig) => void;
  completeOnboarding: () => void;
}

const BrainContext = createContext<BrainContextValue | null>(null);

/**
 * NOTE ON AUTH: this is a local-only, single-device mock so the onboarding
 * and product flow can be tested end to end without a backend. Passwords
 * are validated on the form but deliberately never persisted anywhere --
 * there is nothing here safe to call "real" auth. Before any real user
 * data is involved, replace this with a proper backend (hashed credentials,
 * a database, session handling -- e.g. NextAuth, Supabase Auth, or a
 * custom API).
 */
export function BrainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BrainState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
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
      logOut: () => setState(emptyState),
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
