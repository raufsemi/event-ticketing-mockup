import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, ChevronRight, Clock, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import TicketSelector from "@/components/TicketSelector";
import TicketCard from "@/components/TicketCard";
import { accentVars, eventImage, getEvent } from "@/lib/events";
import { getListing, listings } from "@/lib/listings";
import { photos } from "@/lib/photos";
import VenueMap from "@/components/Venuemap";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getListing((await params).id);
  return l ? { title: `${l.title} Tickets`, description: l.description } : {};
}

// URL-independent shell renders instantly; the param read streams in behind Suspense.
export default function ListingPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ListingPageContent params={params} />
    </Suspense>
  );
}

async function ListingPageContent({ params }: Props) {
  const l = getListing((await params).id);
  if (!l) notFound();
  const e = getEvent(l.type)!;
  const more = listings
    .filter((x) => x.id !== l.id && x.type === l.type)
    .concat(listings.filter((x) => x.type !== l.type))
    .slice(0, 4);

  return (
    <div style={accentVars(e)}>
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-(--accent)/8">
        <div
          aria-hidden
          className="absolute -top-40 -right-32 -z-10 size-[30rem] rounded-full bg-(--accent) opacity-20 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-sm text-muted"
          >
            <Link href="/events" className="hover:underline">
              Events
            </Link>
            <ChevronRight className="size-4" />
            <Link href={`/${e.slug}`} className="hover:underline">
              {e.name}
            </Link>
            <ChevronRight className="size-4" />
            <span className="truncate text-ink">{l.title}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl shadow-(--accent)/20 ring-1 ring-black/5">
                <Image
                  src={photos[l.photo].src}
                  alt={photos[l.photo].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-(--accent-ink) ring-1 ring-line">
                <e.icon className="size-4" /> {e.name}
              </span>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
                {l.title}
              </h1>
              <dl className="mt-6 space-y-3 text-ink">
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Date</dt>
                  <CalendarDays className="size-5 shrink-0 text-(--accent-ink)" />
                  <dd className="font-medium">{l.date}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Time</dt>
                  <Clock className="size-5 shrink-0 text-(--accent-ink)" />
                  <dd className="font-medium">{l.time}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Venue</dt>
                  <MapPin className="size-5 shrink-0 text-(--accent-ink)" />
                  <dd className="font-medium">
                    {l.venue}, {l.city}
                  </dd>
                </div>
              </dl>
              <a
                href="#tickets"
                className="mt-7 inline-flex rounded-full bg-(--accent-btn) px-7 py-4 font-semibold text-(--accent-on) transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-(--accent)/30 lg:hidden"
              >
                {l.type === "running" ? "Choose category" : "Choose tickets"}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details + tickets */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:px-8">
        <div className="space-y-12">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              About this event
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">
              {l.description}
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Highlights
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {l.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-(--accent)/15 text-(--accent-ink)">
                    <Check className="size-4" />
                  </span>
                  <span className="text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Venue
            </h2>
            <div className="mt-5">
              <VenueMap
                venue={l.venue}
                city={l.city}
                lat={l.lat}
                lng={l.lng}
                color={e.colors.accent}
              />
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <TicketSelector listingId={l.id} />
        </aside>
      </section>

      {/* More events */}
      <section className="bg-tint py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              You might also like
            </h2>
            <Link
              href="/events"
              className="shrink-0 text-sm font-semibold text-brand-ink hover:underline"
            >
              All events
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((x) => (
              <TicketCard key={x.id} listing={x} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
