import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Ticket } from "lucide-react";
import { accentVars, getEvent } from "@/lib/events";
import { ctaLabel, fromPrice, rm, type Listing } from "@/lib/listings";
import { photos } from "@/lib/photos";

/** Card for one upcoming event with tickets on sale. */
export default function TicketCard({
  listing: l,
  priority,
}: {
  listing: Listing;
  priority?: boolean;
}) {
  const e = getEvent(l.type)!;
  const soldOut = l.tiers.every((t) => t.soldOut);

  return (
    <Link
      href={`/events/${l.id}`}
      style={accentVars(e)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,26,18,0.28)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photos[l.photo].src}
          alt={photos[l.photo].alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Date chip */}
        <div className="absolute top-3 left-3 grid min-w-14 place-items-center rounded-2xl bg-white/85 px-2.5 py-1.5 text-center shadow-sm ring-1 ring-black/5 backdrop-blur">
          <span className="text-[11px] font-bold tracking-wider text-(--accent-ink) uppercase">
            {l.month}
          </span>
          <span className="font-display text-xl leading-none font-extrabold text-ink">
            {l.day}
          </span>
        </div>
        {l.badge && !soldOut && (
          <span className="absolute top-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {l.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-ink)">
          <e.icon className="size-3.5" />
          {e.name}
        </span>
        <h3 className="mt-2 font-display text-lg leading-snug font-extrabold tracking-tight text-ink">
          {l.title}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted">
          <p className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span className="truncate">
              {l.date} · {l.time}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">
              {l.venue}, {l.city}
            </span>
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs text-muted">From</p>
            <p className="font-display text-xl font-extrabold text-ink">
              {rm(fromPrice(l))}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              soldOut
                ? "bg-line text-muted"
                : "bg-(--accent-btn) text-(--accent-on) group-hover:shadow-lg group-hover:shadow-(--accent)/30"
            }`}
          >
            <Ticket className="size-4" />
            {soldOut ? "Sold out" : ctaLabel(l)}
          </span>
        </div>
      </div>
    </Link>
  );
}
