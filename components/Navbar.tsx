"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Compass,
  Home,
  LogOut,
  Menu,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { events, accentVars } from "@/lib/events";
import { site } from "@/lib/site";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/events", label: "Browse tickets" },
  { href: "/#why", label: "For organisers" },
];

export type NavUser = { name: string; email: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const themes = {
  light: {
    bar: "bg-canvas/90 text-ink",
    border: "border-line",
    divide: "divide-line",
    link: "text-muted hover:text-ink",
    current: "text-ink",
    panel: "border-line bg-white text-ink",
    hover: "hover:bg-tint",
    sub: "text-muted",
    skeleton: "bg-line",
    outline: "border-line",
    solid: "bg-ink text-white hover:bg-ink-soft",
  },
  dark: {
    bar: "bg-night/85 text-white",
    border: "border-white/10",
    divide: "divide-white/10",
    link: "text-white/65 hover:text-white",
    current: "text-white",
    panel: "border-white/10 bg-ink-soft text-white",
    hover: "hover:bg-white/5",
    sub: "text-white/55",
    skeleton: "bg-white/10",
    outline: "border-white/15",
    solid: "bg-white text-ink hover:bg-white/90",
  },
};

/**
 * `user` is undefined while the session is still streaming in, null when
 * signed out, and the user when signed in.
 */
export default function Navbar({ user }: { user?: NavUser | null }) {
  const pathname = usePathname();
  const t = pathname === "/concerts" ? themes.dark : themes.light;
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false); // mobile menu
  const [eventsOpen, setEventsOpen] = useState(false); // desktop event types
  const [accountOpen, setAccountOpen] = useState(false); // desktop account menu
  const [scrolled, setScrolled] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (adjusting state during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setEventsOpen(false);
    setAccountOpen(false);
  }

  // Close menus on outside click and Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!eventsRef.current?.contains(target)) setEventsOpen(false);
      if (!accountRef.current?.contains(target)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setEventsOpen(false);
      setAccountOpen(false);
      setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pop = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
      };

  const navLink = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === href ? t.current : t.link}`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${t.bar} ${
          scrolled || open ? t.border : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          {/* Wordmark */}
          <Link
            href="/"
            className="min-w-0 truncate font-display text-lg font-extrabold tracking-tight"
            aria-label={`${site.name} home`}
          >
            {site.name}
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            <div
              ref={eventsRef}
              className="relative"
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={() => setEventsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={eventsOpen}
                aria-controls="nav-events"
                onClick={() => setEventsOpen((v) => !v)}
                className={`flex items-center gap-1 ${navLink("")}`}
              >
                Event types
                <ChevronDown
                  aria-hidden
                  className={`size-3.5 transition-transform ${eventsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {eventsOpen && (
                  <motion.div
                    id="nav-events"
                    {...pop}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 pt-2"
                  >
                    <div
                      className={`rounded-2xl border p-2 shadow-xl shadow-black/5 ${t.panel}`}
                    >
                      <ul>
                        {events.map((e) => (
                          <li key={e.slug}>
                            <Link
                              href={`/${e.slug}`}
                              style={accentVars(e)}
                              className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${t.hover}`}
                            >
                              <e.icon
                                aria-hidden
                                className="mt-0.5 size-4 shrink-0 text-(--accent)"
                              />
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold">
                                  {e.name}
                                </span>
                                <span
                                  className={`mt-0.5 line-clamp-1 block text-xs ${t.sub}`}
                                >
                                  {e.summary}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div
                        className={`mt-2 border-t px-3 pt-3 pb-1.5 ${t.border}`}
                      >
                        <Link
                          href="/events"
                          className="text-sm font-semibold underline-offset-4 hover:underline"
                        >
                          See all events
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={navLink(l.href)}
              >
                {l.label}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-2">
              {user === undefined ? (
                <span
                  aria-hidden
                  className={`h-9 w-36 animate-pulse rounded-full motion-reduce:animate-none ${t.skeleton}`}
                />
              ) : user ? (
                <>
                  <Link
                    href="/dashboard#tickets-h"
                    className={navLink("/dashboard")}
                    aria-current={
                      pathname === "/dashboard" ? "page" : undefined
                    }
                  >
                    My tickets
                  </Link>

                  <div ref={accountRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={accountOpen}
                      aria-controls="nav-account"
                      aria-label={`Account menu for ${user.name}`}
                      onClick={() => setAccountOpen((v) => !v)}
                      className="grid size-9 place-items-center rounded-full bg-brand font-display text-xs font-extrabold text-ink transition hover:brightness-95"
                    >
                      {initials(user.name)}
                    </button>

                    <AnimatePresence>
                      {accountOpen && (
                        <motion.div
                          id="nav-account"
                          {...pop}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full right-0 mt-2 w-64 rounded-2xl border p-2 shadow-xl shadow-black/5 ${t.panel}`}
                        >
                          <div
                            className={`border-b px-3 pt-2 pb-3 ${t.border}`}
                          >
                            <p className="truncate text-sm font-semibold">
                              {user.name}
                            </p>
                            <p className={`truncate text-xs ${t.sub}`}>
                              {user.email}
                            </p>
                          </div>
                          <ul className="pt-1">
                            <li>
                              <Link
                                href="/dashboard"
                                onClick={() => setAccountOpen(false)}
                                className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${t.hover}`}
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/dashboard#tickets-h"
                                onClick={() => setAccountOpen(false)}
                                className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${t.hover}`}
                              >
                                My tickets
                              </Link>
                            </li>
                            <li>
                              <form action={logout}>
                                <button
                                  type="submit"
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${t.hover}`}
                                >
                                  Log out
                                  <LogOut
                                    aria-hidden
                                    className={`size-4 ${t.sub}`}
                                  />
                                </button>
                              </form>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className={navLink("/login")}>
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${t.solid}`}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`-mr-2 grid size-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden ${t.hover}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="nav-mobile"
              initial={
                reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
              }
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto overscroll-contain px-5 pt-4 pb-8 sm:px-6">
                <p className={`text-sm ${t.sub}`}>Event types</p>
                <ul
                  className={`mt-2 divide-y border-y ${t.border} ${t.divide}`}
                >
                  {events.map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/${e.slug}`}
                        style={accentVars(e)}
                        className="flex items-center gap-3 py-3.5 text-base font-semibold"
                      >
                        <e.icon
                          aria-hidden
                          className="size-5 shrink-0 text-(--accent)"
                        />
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 space-y-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 text-base font-medium"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className={`mt-6 border-t pt-6 ${t.border}`}>
                  {user ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-extrabold text-ink">
                          {initials(user.name)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            {user.name}
                          </span>
                          <span className={`block truncate text-xs ${t.sub}`}>
                            {user.email}
                          </span>
                        </span>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className={`rounded-full px-5 py-3.5 text-center text-base font-semibold ${t.solid}`}
                        >
                          Dashboard
                        </Link>
                        <form action={logout}>
                          <button
                            type="submit"
                            className={`w-full rounded-full border px-5 py-3.5 text-base font-semibold ${t.outline}`}
                          >
                            Log out
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className={`rounded-full border px-5 py-3.5 text-center text-base font-semibold ${t.outline}`}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className={`rounded-full px-5 py-3.5 text-center text-base font-semibold ${t.solid}`}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Event pages have their own sticky checkout bar on mobile. */}
      {!pathname.startsWith("/events/") && (
        <TabBar pathname={pathname} user={user} />
      )}
    </>
  );
}

/** App-style bottom navigation on phones and small tablets. */
function TabBar({
  pathname,
  user,
}: {
  pathname: string;
  user?: NavUser | null;
}) {
  const signedIn = !!user;
  const tabs = [
    { href: "/", label: "Home", icon: Home, active: pathname === "/" },
    {
      href: "/events",
      label: "Explore",
      icon: Compass,
      active: pathname === "/events",
    },
    {
      href: signedIn ? "/dashboard#tickets-h" : "/login?next=%2Fdashboard",
      label: "Tickets",
      icon: Ticket,
      active: false,
    },
    {
      href: signedIn ? "/dashboard" : "/login",
      label: signedIn ? "Account" : "Log in",
      icon: UserRound,
      active:
        pathname === "/dashboard" ||
        pathname === "/login" ||
        pathname === "/register",
    },
  ];

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-xl grid-cols-4">
        {tabs.map((tab) => (
          <li key={tab.label}>
            <Link
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                tab.active ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {tab.active && (
                <span
                  aria-hidden
                  className="absolute top-0 h-0.5 w-8 rounded-full bg-ink"
                />
              )}
              <tab.icon
                aria-hidden
                className="size-5"
                strokeWidth={tab.active ? 2.25 : 1.75}
              />
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
