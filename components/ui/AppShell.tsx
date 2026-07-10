"use client";
import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
import { LayoutDashboard, FlaskConical, LogOut } from "lucide-react";
import { useBrain } from "@/lib/store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects/biology", label: "Biology", icon: FlaskConical },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, hydrated, logOut } = useBrain();

  useEffect(() => {
    if (hydrated && !state.user) {
      router.replace("/login");
    }
  }, [hydrated, state.user, router]);

  if (!hydrated || !state.user) return null;

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-graphite/[0.06] bg-paper-surface px-5 py-6">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 px-2 mb-10">
            <span className="h-6 w-6 rounded-sm bg-cobalt" aria-hidden />
            <span className="font-display text-base font-semibold text-graphite">
              ReviseIQ
            </span>
          </Link>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-cobalt-light text-cobalt-dark"
                      : "text-slate hover:bg-graphite/[0.04] hover:text-graphite"
                  )}
                >
                  <Icon size={17} strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="px-2">
          <div className="mb-3 border-t border-graphite/[0.06] pt-4">
            <p className="text-sm font-medium text-graphite truncate">
              {state.user?.username ?? "Guest"}
            </p>
            {state.user?.school && (
              <p className="text-xs text-slate truncate">{state.user.school}</p>
            )}
          </div>
          <button
            onClick={() => {
              logOut();
              router.push("/");
            }}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate hover:bg-graphite/[0.04] hover:text-graphite transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
