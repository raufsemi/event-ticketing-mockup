import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronRight, MapPin, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import EventExtras from "@/components/EventExtras";
import TicketCard from "@/components/TicketCard";
import { listings } from "@/lib/listings";
import { accentVars, eventSlugs, getEvent } from "@/lib/events";
import { photos, photosByType } from "@/lib/photos";

type Props = { params: Promise<{ event: string }> };

export function generateStaticParams() {
  return eventSlugs.map((event) => ({ event }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEvent((await params).event);
  return e ? { title: `${e.name} Events`, description: e.summary } : {};
}

// URL-independent shell renders instantly; the param read streams in behind Suspense.
export default function EventPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EventPageContent params={params} />
    </Suspense>
  );
}

async function EventPageContent({ params }: Props) {
  const e = getEvent((await params).event);
  // Only the 4 event types exist; anything else is a 404.
  if (!e) notFound();

  const dark = !!e.dark;
  const quoteHref = `/?type=${e.slug}#contact`;
  const upcoming = listings.filter((l) => l.type === e.slug);
  // On the dark concerts page, accent text needs a lighter tint to stay readable.
  const vars = { ...accentVars(e), ...(dark ? { "--accent-ink": "#C4B5FD" } : {}) } as React.CSSProperties;

  const t = {
    page: dark ? "bg-night text-white" : "",
    heading: dark ? "text-white" : "text-ink",
    body: dark ? "text-white/70" : "text-muted",
    card: dark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]" : "border-line bg-white",
    altBg: dark ? "bg-white/[0.02]" : "bg-tint",
  };

  return (
    <div style={vars} className={t.page}>
      {/* Hero */}
      <section className={`relative isolate overflow-hidden ${dark ? "" : "bg-(--accent)/8"}`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className={`absolute -top-40 -right-32 size-[32rem] rounded-full bg-(--accent) blur-3xl ${dark ? "opacity-35" : "opacity-20"}`} />
          {dark && <div className="absolute -bottom-40 -left-20 size-[26rem] rounded-full bg-[#EC4899]/20 blur-3xl" />}
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24 lg:grid-cols-2 lg:px-8">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${t.body}`}>
                <Link href="/#events" className="hover:underline">Event Types</Link>
                <ChevronRight className="size-4" />
                <span className={t.heading}>{e.name}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="mt-8 inline-grid size-14 place-items-center rounded-2xl bg-(--accent) text-(--accent-on) shadow-lg shadow-(--accent)/30">
                <e.icon className="size-7" />
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-sm font-semibold tracking-[0.14em] text-(--accent-ink) uppercase">{e.name} Events</p>
              <h1 className={`mt-3 font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl ${t.heading}`}>
                {e.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className={`mt-6 max-w-xl text-lg leading-relaxed ${t.body}`}>{e.summary}</p>
            </Reveal>
            <Reveal delay={0.24} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={quoteHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-(--accent-btn) px-7 py-4 font-semibold text-(--accent-on) transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-(--accent)/30"
              >
                Get a Quote
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              {e.slug === "bazaar-buffet" ? (
                <Link
                  href={`/?type=${e.slug}&enquiry=vendor#contact`}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-ink ring-1 ring-line transition hover:ring-ink/30"
                >
                  Become a Vendor
                </Link>
              ) : (
                <a
                  href="#provide"
                  className={`inline-flex items-center justify-center rounded-full px-7 py-4 font-semibold ring-1 transition ${
                    dark ? "text-white ring-white/20 hover:bg-white/10" : "bg-white text-ink ring-line hover:ring-ink/30"
                  }`}
                >
                  What We Provide
                </a>
              )}
            </Reveal>
          </div>
          <Reveal from="right" delay={0.1}>
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ${dark ? "ring-white/10" : "ring-black/5"} shadow-2xl shadow-(--accent)/20`}>
              <Image
                src={photos[e.photo].src}
                alt={photos[e.photo].alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading dark={dark} eyebrow="About" title={`${e.name} events, done properly`} />
          <Reveal delay={0.1}>
            <p className={`text-lg leading-relaxed text-pretty ${t.body}`}>{e.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {e.examples.map((x) => (
                <li key={x} className="rounded-full bg-(--accent)/12 px-3.5 py-1.5 text-sm font-semibold text-(--accent-ink)">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* What we provide */}
      <section id="provide" className={`${t.altBg} py-20 sm:py-28`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading dark={dark} eyebrow="What we provide" title="Everything on the checklist" className="mb-12" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {e.provides.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.06}>
                <div className={`group h-full rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] ${t.card}`}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-(--accent)/15 text-(--accent-ink) transition group-hover:bg-(--accent) group-hover:text-(--accent-on)">
                    <p.icon className="size-6" />
                  </span>
                  <h3 className={`mt-5 font-display text-lg font-bold tracking-tight ${t.heading}`}>{p.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${t.body}`}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Page-specific sections */}
      <EventExtras e={e} />

      {/* Upcoming events of this type */}
      {upcoming.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading dark={dark} eyebrow="Tickets on sale" title={`Upcoming ${e.name.toLowerCase()} events`} />
            <Link
              href="/events"
              className={`shrink-0 self-start text-sm font-semibold hover:underline sm:self-auto ${dark ? "text-white" : "text-ink"}`}
            >
              See all events →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((l, i) => (
              <Reveal key={l.id} delay={i * 0.08}>
                <TicketCard listing={l} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading dark={dark} eyebrow="Gallery" title="Moments from past events" subtitle="Photo placeholders. Each is labelled with the shot that should go there." className="mb-12" />
        <GalleryGrid dark={dark} items={e.gallery.map((label, i) => {
            const pool = photosByType[e.slug];
            return { slug: e.slug, label, image: photos[pool[i % pool.length]] };
          })} />
      </section>

      {/* Past events */}
      <section className={`${t.altBg} py-20 sm:py-28`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading dark={dark} eyebrow="Track record" title={`Past ${e.name.toLowerCase()} events`} className="mb-10" />
          <ul className={`divide-y overflow-hidden rounded-3xl border ${dark ? "divide-white/10 border-white/10" : "divide-line border-line bg-white"}`}>
            {e.pastEvents.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 0.06}
                className={`grid gap-3 p-5 transition sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:items-center sm:p-6 ${dark ? "hover:bg-white/[0.03]" : "hover:bg-tint/60"}`}
              >
                  <p className={`font-display font-bold ${t.heading}`}>{p.name}</p>
                  <p className={`flex items-center gap-2 text-sm ${t.body}`}>
                    <CalendarDays className="size-4 text-(--accent-ink)" /> {p.date}
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${t.body}`}>
                    <MapPin className="size-4 text-(--accent-ink)" /> {p.venue}
                  </p>
                  <p className={`flex items-center gap-2 text-sm font-semibold ${t.heading}`}>
                    <Users className="size-4 text-(--accent-ink)" /> {p.pax}
                  </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div
            className={`relative isolate overflow-hidden rounded-[2rem] p-8 text-center sm:p-16 ${
              dark ? "bg-gradient-to-br from-[#2E1065] to-night ring-1 ring-white/10" : "bg-ink text-white"
            }`}
          >
            <div aria-hidden className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-(--accent)/30 blur-3xl" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
              Planning a {e.name.toLowerCase()} event?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Send us the basics. We&apos;ll reply with ideas and a rough budget within one working day.
            </p>
            <Link
              href={quoteHref}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-(--accent-btn) px-8 py-4 font-semibold text-(--accent-on) transition hover:-translate-y-0.5"
            >
              Get a Quote
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
