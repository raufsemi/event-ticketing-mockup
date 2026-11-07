import Image from "next/image";
import Link from "next/link";
import { listings } from "@/lib/listings";
import { stateOf, states } from "@/state";

/**
 * Every Malaysian state with its flag and how many events are on sale there.
 * Phones: two rows that swipe sideways. Tablet and up: a plain grid.
 */
export default function StateGrid() {
  const counts = new Map<string, number>();
  for (const l of listings) {
    const s = stateOf(l.city);
    if (s) counts.set(s.slug, (counts.get(s.slug) ?? 0) + 1);
  }

  return (
    <ul className="-mx-5 grid snap-x snap-mandatory scroll-px-5 auto-cols-[78%] grid-flow-col grid-rows-2 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:grid-rows-none sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {states.map((s) => {
        const n = counts.get(s.slug) ?? 0;
        const flag = (
          <Image
            src={s.flag}
            alt=""
            width={48}
            height={24}
            unoptimized
            className="h-6 w-12 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
          />
        );
        const text = (
          <span className="min-w-0">
            <span className="block truncate font-semibold text-ink">
              {s.name}
            </span>
            <span className="block text-sm text-muted">
              {n === 0
                ? "No events yet"
                : `${n} ${n === 1 ? "event" : "events"}`}
            </span>
          </span>
        );

        return (
          <li key={s.slug} className="snap-start">
            {n > 0 ? (
              <Link
                href={`/events?state=${s.slug}`}
                className="flex h-full items-center gap-4 rounded-2xl border border-line bg-white px-4 py-4 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {flag}
                {text}
              </Link>
            ) : (
              <div className="flex h-full items-center gap-4 rounded-2xl border border-line px-4 py-4 opacity-55">
                {flag}
                {text}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
