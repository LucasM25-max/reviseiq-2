"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
import { LayoutDashboard, FlaskConical, CalendarClock, Settings, LogOut } from "lucide-react";
import { useBrain } from "@/lib/store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/timetable", label: "Timetable", icon: CalendarClock },
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

  const accountActive = pathname?.startsWith("/account");

  return (
    <div className="min-h-screen bg-paper dark:bg-graphite flex">
      <aside className="hidden md:flex md:h-screen md:sticky md:top-0 w-60 shrink-0 flex-col justify-between overflow-y-auto border-r border-graphite/[0.06] dark:border-white/10 bg-paper-surface dark:bg-graphite-soft px-4 py-5">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 px-1.5 mb-6">
            <span className="h-5 w-5 rounded-sm bg-cobalt" aria-hidden />
            <span className="font-display text-sm font-semibold text-graphite dark:text-paper">
              ReviseIQ
            </span>
          </Link>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-cobalt-light text-cobalt-dark dark:bg-cobalt/25 dark:text-white"
                      : "text-slate hover:bg-graphite/[0.04] hover:text-graphite dark:hover:bg-white/[0.06] dark:hover:text-paper"
                  )}
                >
                  <Icon size={16} strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-1.5">
          <div className="mb-2.5 border-t border-graphite/[0.06] dark:border-white/10 pt-3">
            <p className="text-sm font-medium text-graphite dark:text-paper truncate">
              {state.user?.username ?? "Guest"}
            </p>
            {state.user?.school && (
              <p className="text-xs text-slate truncate">{state.user.school}</p>
            )}
          </div>
          <Link
            href="/account"
            className={clsx(
              "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm font-medium transition-colors",
              accountActive
                ? "bg-cobalt-light text-cobalt-dark dark:bg-cobalt/25 dark:text-white"
                : "text-slate hover:bg-graphite/[0.04] hover:text-graphite dark:hover:bg-white/[0.06] dark:hover:text-paper"
            )}
          >
            <Settings size={16} />
            Account
          </Link>
          <button
            onClick={() => {
              logOut();
              router.push("/");
            }}
            className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-slate hover:bg-graphite/[0.04] hover:text-graphite dark:hover:bg-white/[0.06] dark:hover:text-paper transition-colors"
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
