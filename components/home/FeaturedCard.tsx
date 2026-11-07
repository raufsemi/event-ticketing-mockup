import Image from "next/image";
import Link from "next/link";
import { MapPin, Ticket } from "lucide-react";
import { accentVars, getEvent } from "@/lib/events";
import { ctaLabel, fromPrice, rm, type Listing } from "@/lib/listings";
import { photos } from "@/lib/photos";

/** Tall poster card for the hero carousel. */
export default function FeaturedCard({ listing: l, priority }: { listing: Listing; priority?: boolean }) {
  const e = getEvent(l.type)!;
  return (
    <Link
      href={`/events/${l.id}`}
      style={accentVars(e)}
      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-ink-soft ring-1 ring-white/10"
    >
      <Image
        src={photos[l.photo].src}
        alt={photos[l.photo].alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 55vw, 82vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute top-3 left-3 grid min-w-14 place-items-center rounded-2xl bg-white/90 px-2.5 py-1.5 text-center backdrop-blur">
        <span className="text-[11px] font-bold tracking-wider text-(--accent-ink) uppercase">{l.month}</span>
        <span className="font-display text-xl leading-none font-extrabold text-ink">{l.day}</span>
      </div>
      {l.badge && (
        <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {l.badge}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          <e.icon className="size-3.5 text-(--accent)" />
          {e.name}
        </span>
        <h3 className="mt-2.5 font-display text-2xl leading-tight font-extrabold tracking-tight text-balance">{l.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/75">
          <MapPin className="size-4 shrink-0" />
          <span className="truncate">
            {l.venue}, {l.city}
          </span>
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-white/75">
            From <span className="font-display text-lg font-extrabold text-white">{rm(fromPrice(l))}</span>
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--accent-btn) px-4 py-2.5 text-sm font-semibold text-(--accent-on)">
            <Ticket className="size-4" />
            {ctaLabel(l)}
          </span>
        </div>
      </div>
    </Link>
  );
}
