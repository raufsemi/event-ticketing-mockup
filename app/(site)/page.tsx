import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import GalleryGrid from "@/components/GalleryGrid";
import StatsCounter from "@/components/StatsCounter";
import LogoStrip from "@/components/LogoStrip";
import EnquiryForm from "@/components/EnquiryForm";
import TicketCard from "@/components/TicketCard";
import HeroSearch from "@/components/home/HeroSearch";
import { accentVars, events, portfolio, stats } from "@/lib/events";
import { listings } from "@/lib/listings";
import { photos } from "@/lib/photos";
import StateGrid from "@/components/StateGrid";

const isHot = (l: (typeof listings)[number]) =>
  l.badge === "Selling fast" ||
  l.badge === "Few seats left" ||
  l.tiers.some((t) => t.left);

// Hot events first, topped up with the rest so the row is always full.
const sellingFast = [
  ...listings.filter(isHot),
  ...listings.filter((l) => !isHot(l)),
].slice(0, 4);

const perks = ["Instant e-tickets", "Secure checkout", "FPX and e-wallets"];

const steps = [
  {
    title: "Pick your event",
    desc: "Browse by date, city or type and choose your ticket.",
  },
  {
    title: "Pay in seconds",
    desc: "FPX, card or e-wallet. No account needed, but it helps.",
  },
  {
    title: "Scan at the gate",
    desc: "Your QR e-ticket lands in your inbox and your account.",
  },
];

const reasons = [
  {
    title: "One team, start to finish",
    desc: "Planning, suppliers, crew and teardown handled in-house.",
  },
  {
    title: "Permits sorted for you",
    desc: "Police, council and agency approvals filed early.",
  },
  {
    title: "Safety built in",
    desc: "Medics, crowd plans and trained marshals at every event.",
  },
  {
    title: "Ticketing included",
    desc: "Sell tickets here, scan them at the gate, see sales live.",
  },
];

const promises = [
  "Free first consultation",
  "Ticketing and gate scanning included",
  "Itemised quote, no hidden fees",
];

const container = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";

/** Horizontal swipe row on phones; the last item peeks so people know to scroll. */
const rail =
  "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden";

function Heading({
  title,
  description,
  href,
  dark,
}: {
  title: string;
  description?: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div className="max-w-xl">
        <h2
          className={`font-display text-3xl/tight font-extrabold tracking-tight text-balance sm:text-4xl/tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-base/relaxed text-pretty ${dark ? "text-white/60" : "text-muted"}`}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={`shrink-0 text-sm font-semibold underline decoration-1 underline-offset-[6px] transition ${
            dark
              ? "text-white decoration-white/30 hover:decoration-white"
              : "text-ink decoration-line hover:decoration-ink"
          }`}
        >
          See all events
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div
          className={`${container} pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28`}
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="max-w-xl">
              <p className="text-sm text-white/55">
                {listings.length} events on sale across Malaysia
              </p>

              <h1 className="mt-5 font-display text-4xl/[1.05] font-extrabold tracking-tight text-balance sm:text-6xl/[1.02]">
                Find your next event. Grab your tickets.
              </h1>

              <p className="mt-6 max-w-md text-base/relaxed text-pretty text-white/65 sm:text-lg/relaxed">
                Runs, food festivals, charity nights and concerts. Pay in
                seconds, scan your e-ticket at the gate.
              </p>

              <div className="mt-10">
                <HeroSearch />
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check aria-hidden className="size-3.5 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden pb-10 lg:block">
              <div className="relative ml-auto aspect-4/5 w-[85%] overflow-hidden rounded-3xl bg-white/5">
                <Image
                  src={photos["midnight-pulse"].src}
                  alt={photos["midnight-pulse"].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 0px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 aspect-square w-[42%] overflow-hidden rounded-2xl bg-white/5 ring-8 ring-ink">
                <Image
                  src={photos["type-bazaar"].src}
                  alt={photos["type-bazaar"].alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 0px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket-buyer sections share one rhythm */}
      <div className={`${container} space-y-24 py-20 sm:space-y-32 sm:py-28`}>
        <section>
          <Heading
            title="Selling fast"
            description="Grab these before they’re gone."
            href="/events"
          />
          <ul className={rail}>
            {sellingFast.map((l, i) => (
              <li
                key={l.id}
                className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
              >
                <TicketCard listing={l} priority={i < 2} />
              </li>
            ))}
          </ul>
        </section>

        <section id="events">
          <Heading title="Browse by type" />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {events.map((e) => {
              const count = listings.filter((l) => l.type === e.slug).length;
              return (
                <li key={e.slug}>
                  <Link
                    href={`/events?type=${e.slug}`}
                    style={accentVars(e)}
                    className="group block border-t-2 border-(--accent) pt-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
                  >
                    <e.icon
                      aria-hidden
                      className="size-5 text-(--accent-ink)"
                    />
                    <span className="mt-4 block font-display text-xl/tight font-bold text-ink underline decoration-transparent decoration-2 underline-offset-4 transition group-hover:decoration-(--accent) sm:text-2xl/tight">
                      {e.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">
                      {count} {count === 1 ? "event" : "events"} on sale
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="states">
          <Heading
            title="Events by state"
            description="From Perlis to Sabah, find what’s on near you."
            href="/events"
          />
          <StateGrid />
        </section>

        <section>
          <Heading title="Tickets in three steps" />
          <ol className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-line pt-6">
                <span className="font-display text-4xl font-extrabold text-brand-ink tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm/relaxed text-muted">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Create a free account
            </Link>
            <p className="text-sm text-muted">
              Keep every ticket in one place and check out faster.
            </p>
          </div>
        </section>
      </div>

      {/* For organisers */}
      <section id="why" className="bg-ink py-20 text-white sm:py-28">
        <div className={container}>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Heading
                dark
                title="Running an event? We sell the tickets and run the day."
                description="350+ events since 2014. Planning, permits, crew and ticketing under one roof."
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 font-semibold text-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  Get a quote
                </Link>
                <Link
                  href="/#work"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/10"
                >
                  See past events
                </Link>
              </div>
            </div>

            <dl className="grid gap-x-10 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="border-t border-white/10 py-6">
                  <dt className="font-semibold">{r.title}</dt>
                  <dd className="mt-2 text-sm/relaxed text-white/60">
                    {r.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-20 border-t border-white/10 pt-12">
            <StatsCounter dark stats={stats} />
          </div>
        </div>
      </section>

      {/* Past events */}
      <section id="work" className="bg-tint py-20 sm:py-28">
        <div className={container}>
          <Heading
            title="Recent work"
            description="A few events from the last two years."
          />
          <GalleryGrid
            filterable
            items={portfolio.map((p) => ({
              slug: p.slug,
              label: `${p.title} Photo`,
              title: p.title,
              meta: p.meta,
              image: photos[p.photo],
            }))}
          />
        </div>
      </section>

      <section className="border-b border-line bg-white py-14 sm:py-16">
        <LogoStrip label="Trusted by brands, councils and NGOs across Malaysia" />
      </section>

      {/* Organiser enquiry */}
      <section id="contact" className="py-20 sm:py-28">
        <div
          className={`${container} grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}
        >
          <div>
            <Heading
              title="Tell us about your event"
              description="Share a few details and we’ll come back with ideas and a rough budget within one working day."
            />
            <ul className="divide-y divide-line border-y border-line">
              {promises.map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-3 py-4 text-sm text-ink"
                >
                  <Check
                    aria-hidden
                    className="size-4 shrink-0 text-brand-ink"
                  />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
