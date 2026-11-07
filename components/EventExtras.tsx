import Image from "next/image";
import Link from "next/link";
import { Check, Store } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import StatsCounter from "./StatsCounter";
import LogoStrip from "./LogoStrip";
import {
  boothLegend,
  eventImage,
  impactStats,
  lineup,
  raceDayTimeline,
  raceKit,
  type EventType,
} from "@/lib/events";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

/* Running ------------------------------------------------------------- */

function RunningExtras({ e }: { e: EventType }) {
  return (
    <>
      <section className={`${wrap} py-20 sm:py-28`}>
        <SectionHeading
          eyebrow="Race day"
          title="From flag-off to prize giving"
          subtitle="A typical half-marathon morning. Every race gets its own minute-by-minute plan."
          className="mb-12"
        />
        <ol className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-(--accent)/30 lg:block" />
          {raceDayTimeline.map((step, i) => (
            <Reveal as="li" key={step.time} delay={i * 0.07} className="relative flex gap-4 lg:block">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-(--accent) font-display text-sm font-extrabold text-(--accent-on) ring-4 ring-canvas">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <p className="text-sm font-semibold text-(--accent-ink)">{step.time}</p>
                  <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-tint py-20 sm:py-28">
        <div className={wrap}>
          <SectionHeading
            eyebrow="Race kit"
            title="Medals and kits runners keep"
            subtitle="Custom-designed for every race. Swap these placeholders for real product shots."
            className="mb-12"
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {raceKit.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <figure className="group overflow-hidden rounded-3xl bg-white ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,26,18,0.3)]">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={eventImage(e, 600, 600, `${item} Placeholder`)}
                      alt={`${item} placeholder`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-4 font-display font-bold text-ink">{item}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* Bazaar@Buffet ------------------------------------------------------- */

function BazaarExtras({ e }: { e: EventType }) {
  return (
    <>
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-line">
              <Image
                src={eventImage(e, 1200, 750, "Booth Layout Illustration")}
                alt="Booth layout illustration placeholder"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Site layout"
              title="Every booth, aisle and bin, planned"
              subtitle="We draw the site to scale before a single canopy goes up, so crowds move and every vendor gets seen."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {boothLegend.map((b, i) => (
                <Reveal as="li" key={b.label} delay={i * 0.06} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                    <span className="mt-1 size-3 shrink-0 rounded-sm bg-(--accent)" style={{ opacity: 1 - i * 0.2 }} />
                    <span>
                      <span className="block font-semibold text-ink">{b.label}</span>
                      <span className="block text-sm text-muted">{b.desc}</span>
                    </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-20 sm:pb-28`}>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-80 rounded-full bg-(--accent)/30 blur-3xl" />
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl bg-(--accent) text-ink">
                  <Store className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                  Sell at our next bazaar
                </h2>
                <p className="mt-4 max-w-lg text-white/70">
                  We&apos;re always looking for good food and friendly vendors. Tell us what you sell and we&apos;ll let
                  you know when slots open.
                </p>
              </div>
              <div>
                <ul className="space-y-3 text-white/80">
                  {["Ready-built canopy, table and power", "Promotion on our socials", "Cleaning and waste handled"].map(
                    (x) => (
                      <li key={x} className="flex items-center gap-3">
                        <Check className="size-5 text-(--accent)" />
                        {x}
                      </li>
                    ),
                  )}
                </ul>
                <Link
                  href={`/?type=${e.slug}&enquiry=vendor#contact`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-(--accent-btn) px-7 py-4 font-semibold text-(--accent-on) transition hover:-translate-y-0.5 sm:w-auto"
                >
                  Become a Vendor
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* Charity ------------------------------------------------------------- */

function CharityExtras() {
  return (
    <>
      <section
        style={{ "--accent-ink": "#FDA4AF" } as React.CSSProperties}
        className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28"
      >
        <div aria-hidden className="absolute -bottom-32 -left-20 -z-10 size-96 rounded-full bg-(--accent)/25 blur-3xl" />
        <div className={wrap}>
          <SectionHeading
            dark
            eyebrow="Our impact"
            title="What our charity events have raised so far"
            subtitle="Placeholder figures. Replace with your verified totals."
            className="mb-14"
          />
          <StatsCounter dark stats={impactStats} />
        </div>
      </section>
      <section className="border-b border-line bg-white py-14">
        <LogoStrip label="NGOs and foundations we've worked with" prefix="Partner NGO" count={7} />
      </section>
    </>
  );
}

/* Concerts ------------------------------------------------------------ */

function ConcertExtras() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/15 blur-3xl" />
      <div className={wrap}>
        <SectionHeading dark eyebrow="Past lineups" title="Who's played our stages" subtitle="Placeholder artist names." align="center" className="mb-14" />
        <Reveal>
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur sm:p-14">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {lineup.headliners.map((n) => (
                <li
                  key={n}
                  className="bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text font-display text-4xl font-extrabold tracking-tight text-transparent uppercase sm:text-6xl lg:text-7xl"
                >
                  {n}
                </li>
              ))}
            </ul>
            <div className="mx-auto my-8 h-px w-24 bg-(--accent)" />
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {lineup.main.map((n) => (
                <li key={n} className="font-display text-2xl font-bold tracking-tight text-white/90 uppercase sm:text-3xl">
                  {n}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm font-semibold tracking-[0.12em] text-white/60 uppercase sm:text-base">
              {lineup.support.map((n, i) => (
                <li key={n} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-(--accent)" />}
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function EventExtras({ e }: { e: EventType }) {
  switch (e.slug) {
    case "running":
      return <RunningExtras e={e} />;
    case "bazaar-buffet":
      return <BazaarExtras e={e} />;
    case "charity":
      return <CharityExtras />;
    case "concerts":
      return <ConcertExtras />;
  }
}
