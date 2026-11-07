import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { accentVars, getEvent } from "@/lib/events";
import { fromPrice, rm, type Listing } from "@/lib/listings";

/** Compact list row: date block, title, place and price. Thumb-friendly on phones. */
export default function EventRow({ listing: l }: { listing: Listing }) {
  const e = getEvent(l.type)!;
  const soldOut = l.tiers.every((t) => t.soldOut);
  return (
    <Link
      href={`/events/${l.id}`}
      style={accentVars(e)}
      className="group flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-line transition hover:ring-(--accent) sm:p-4"
    >
      <div className="grid w-14 shrink-0 place-items-center rounded-xl bg-(--accent)/12 py-2 text-center">
        <span className="text-[11px] font-bold tracking-wider text-(--accent-ink) uppercase">{l.month}</span>
        <span className="font-display text-2xl leading-none font-extrabold text-ink">{l.day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-(--accent-ink)">
          <e.icon className="size-3.5" />
          {e.name}
        </p>
        <h3 className="mt-0.5 truncate font-semibold text-ink">{l.title}</h3>
        <p className="mt-0.5 truncate text-sm text-muted">
          {l.time} · {l.city}
        </p>
      </div>
      <div className="shrink-0 text-right">
        {soldOut ? (
          <span className="text-sm font-semibold text-muted">Sold out</span>
        ) : (
          <>
            <span className="block text-xs text-muted">From</span>
            <span className="font-display font-extrabold text-ink">{rm(fromPrice(l))}</span>
          </>
        )}
      </div>
      <ChevronRight aria-hidden className="hidden size-5 shrink-0 text-muted transition group-hover:translate-x-0.5 sm:block" />
    </Link>
  );
}
