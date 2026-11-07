import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CalendarPlus, LogOut, MessageSquareText, Ticket, UserRound } from "lucide-react";
import TicketCard from "@/components/TicketCard";
import { logout } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";
import { listings } from "@/lib/listings";

export const metadata: Metadata = { title: "Dashboard" };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Fixed format so server and client never disagree (see lib/format.ts).
const memberSince = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const user = await requireUser("/dashboard");
  const firstName = user.name.split(" ")[0];
  const picks = listings.filter((l) => l.featured).slice(0, 3);
  const suggested = picks.length ? picks : listings.slice(0, 3);

  const stats = [
    { icon: Ticket, label: "Tickets", value: 0 },
    { icon: CalendarPlus, label: "Upcoming events", value: 0 },
    { icon: MessageSquareText, label: "Open enquiries", value: 0 },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-20 size-[26rem] rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute -right-24 -bottom-40 size-[24rem] rounded-full bg-[#8B5CF6]/25 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Dashboard</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hi, {firstName}
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-3 max-w-xl text-white/70">Your tickets, bookings and event enquiries live here.</p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-2xl bg-white/6 p-5 ring-1 ring-white/12">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/15 text-brand">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <dt className="text-sm text-white/65">{s.label}</dt>
                  <dd className="font-display text-2xl font-extrabold">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_20rem] lg:px-8">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="tickets-h">
            <h2 id="tickets-h" className="font-display text-2xl font-extrabold tracking-tight text-ink">
              My tickets
            </h2>
            <div className="mt-5 flex flex-col items-center rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-tint text-brand-ink">
                <Ticket className="size-7" />
              </span>
              <p className="mt-4 font-semibold text-ink">No tickets yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted">
                Tickets you buy while logged in show up here, with the QR code you scan at the gate.
              </p>
              <Link
                href="/events"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
              >
                Browse events
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>

          <section aria-labelledby="picks-h">
            <div className="flex items-end justify-between gap-4">
              <h2 id="picks-h" className="font-display text-2xl font-extrabold tracking-tight text-ink">
                On sale now
              </h2>
              <Link href="/events" className="text-sm font-semibold text-brand-ink underline-offset-4 hover:underline">
                See all
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {suggested.map((l) => (
                <TicketCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand font-display font-extrabold text-ink">
                {initials(user.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{user.name}</p>
                <p className="truncate text-sm text-muted">{user.email}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Plan</dt>
                <dd className="font-semibold text-ink">Free</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Member since</dt>
                <dd className="font-semibold text-ink">{memberSince(user.createdAt)}</dd>
              </div>
            </dl>
            <form action={logout} className="mt-5">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-tint"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-tint p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-white text-brand-ink ring-1 ring-line">
              <UserRound className="size-5" />
            </span>
            <p className="mt-4 font-semibold text-ink">Planning your own event?</p>
            <p className="mt-1 text-sm text-muted">Tell us what you have in mind and get a quote within one working day.</p>
            <Link
              href="/#contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
            >
              Start an enquiry <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse motion-reduce:animate-none">
      <div className="bg-ink">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="h-4 w-28 rounded-full bg-white/10" />
          <div className="h-12 w-64 rounded-2xl bg-white/10" />
          <div className="grid gap-3 pt-6 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white/6" />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-64 rounded-3xl bg-tint" />
      </div>
    </div>
  );
}
