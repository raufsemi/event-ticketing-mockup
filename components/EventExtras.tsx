import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
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

const wrap = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";

const and = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

function Heading({
  title,
  description,
  dark,
  className = "mb-10 sm:mb-14",
}: {
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
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
  );
}

/* Running ------------------------------------------------------------- */

function RunningExtras({ e }: { e: EventType }) {
  return (
    <>
      <section className={`${wrap} py-20 sm:py-28`}>
        <Heading
          title="From flag-off to prize giving"
          description="A typical half-marathon morning. Every race gets its own minute-by-minute plan."
        />

        {/* The clock is the structure: each step hangs off its time */}
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6">
          {raceDayTimeline.map((step) => (
            <li key={step.time} className="border-t-2 border-(--accent) pt-5">
              <p className="font-display text-2xl font-extrabold tracking-tight text-ink tabular-nums">
                {step.time}
              </p>
              <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm/relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-tint py-20 sm:py-28">
        <div className={wrap}>
          <Heading
            title="Medals and kits runners keep"
            description="Custom-designed for every race. Swap these placeholders for real product shots."
          />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {raceKit.map((item) => (
              <li key={item}>
                <figure>
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={eventImage(e, 600, 600, `${item} Placeholder`)}
                      alt={item}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm font-semibold text-ink sm:text-base">
                    {item}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* Bazaar@Buffet ------------------------------------------------------- */

const vendorPerks = [
  "Ready-built canopy, table and power",
  "Promotion on our socials",
  "Cleaning and waste handled",
];

function BazaarExtras({ e }: { e: EventType }) {
  return (
    <>
      <section className={`${wrap} py-20 sm:py-28`}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-canvas ring-1 ring-line">
            <Image
              src={eventImage(e, 1200, 750, "Booth Layout Illustration")}
              alt="Site plan showing booth zones, aisles and facilities"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <Heading
              title="Every booth, aisle and bin, planned"
              description="We draw the site to scale before a single canopy goes up, so crowds move and every vendor gets seen."
              className="mb-8"
            />
            {/* Map key: swatch shades match the zones on the plan */}
            <ul className="divide-y divide-line border-y border-line">
              {boothLegend.map((b, i) => (
                <li key={b.label} className="flex items-start gap-4 py-4">
                  <span
                    aria-hidden
                    className="mt-1.5 size-3 shrink-0 rounded-[3px] bg-(--accent)"
                    style={{ opacity: 1 - i * 0.2 }}
                  />
                  <span>
                    <span className="block font-semibold text-ink">
                      {b.label}
                    </span>
                    <span className="mt-0.5 block text-sm/relaxed text-muted">
                      {b.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-20 sm:pb-28`}>
        <div className="grid gap-10 rounded-3xl bg-ink px-6 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16">
          <div>
            <h2 className="font-display text-3xl/tight font-extrabold tracking-tight text-balance sm:text-4xl/tight">
              Sell at our next bazaar
            </h2>
            <p className="mt-4 max-w-md text-base/relaxed text-white/65">
              We’re always looking for good food and friendly vendors. Tell us
              what you sell and we’ll let you know when slots open.
            </p>
          </div>

          <div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {vendorPerks.map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-3 py-3.5 text-white/85"
                >
                  <Check
                    aria-hidden
                    className="size-4 shrink-0 text-(--accent)"
                  />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              href={`/?type=${e.slug}&enquiry=vendor#contact`}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-(--accent-btn) px-7 py-4 font-semibold text-(--accent-on) transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent) sm:w-auto"
            >
              Become a vendor
            </Link>
          </div>
        </div>
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
        className="bg-ink py-20 text-white sm:py-28"
      >
        <div className={wrap}>
          <Heading
            dark
            title="What our charity events have raised so far"
            description="Placeholder figures. Replace with your verified totals."
          />
          <div className="border-t border-white/10 pt-10 sm:pt-12">
            <StatsCounter dark stats={impactStats} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-14 sm:py-16">
        <LogoStrip
          label="NGOs and foundations we’ve worked with"
          prefix="Partner NGO"
          count={7}
        />
      </section>
    </>
  );
}

/* Concerts ------------------------------------------------------------ */

function ConcertExtras() {
  return (
    <section className="bg-night py-20 text-white sm:py-28">
      <div className={wrap}>
        <Heading
          dark
          title="Who’s played our stages"
          description="A few of the acts from past shows. Placeholder names for now."
        />

        {/* Billed like a gig poster: size tells you who headlined */}
        <div className="border-t-2 border-(--accent) pt-10 sm:pt-14">
          <ul className="space-y-1 sm:space-y-2">
            {lineup.headliners.map((n) => (
              <li
                key={n}
                className="font-display text-5xl/[0.95] font-extrabold tracking-tight break-words text-white uppercase sm:text-7xl/[0.95] lg:text-8xl/[0.92]"
              >
                {n}
              </li>
            ))}
          </ul>

          <ul className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-white/10 pt-8 sm:mt-14 sm:gap-x-5 sm:pt-10">
            {lineup.main.map((n, i) => (
              <li
                key={n}
                className="flex items-baseline gap-x-4 font-display text-2xl font-bold tracking-tight text-white/80 uppercase sm:gap-x-5 sm:text-4xl"
              >
                {i > 0 && (
                  <span aria-hidden className="font-normal text-(--accent)">
                    /
                  </span>
                )}
                {n}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-3xl text-base/relaxed text-pretty text-white/55 sm:text-lg/relaxed">
            With {and.format(lineup.support)}.
          </p>
        </div>
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
    default:
      return null;
  }
}
