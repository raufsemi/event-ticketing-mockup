"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import TicketCard from "./TicketCard";
import { events, isEventSlug, type EventSlug } from "@/lib/events";
import { listings } from "@/lib/listings";

type Filter = EventSlug | "all";

/** Applies ?q= and ?type= from the home page search. Own boundary so the list prerenders. */
function FiltersFromUrl({ onChange }: { onChange: (q: string, type: Filter) => void }) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const type = params.get("type");
  useEffect(() => {
    onChange(q, isEventSlug(type) ? type : "all");
  }, [q, type, onChange]);
  return null;
}

type Props = {
  /** Show type tabs and search (the /events page). */
  filterable?: boolean;
  /** Only show this event type. */
  type?: EventSlug;
  /** Only featured events, up to this many. */
  limit?: number;
};

const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...events.map((e) => ({ value: e.slug, label: e.name })),
];

export default function UpcomingEvents({ filterable, type, limit }: Props) {
  const [filter, setFilter] = useState<Filter>(type ?? "all");
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = listings.filter((l) => filter === "all" || l.type === filter);
    if (q)
      list = list.filter((l) =>
        `${l.title} ${l.city} ${l.venue}`.toLowerCase().includes(q),
      );
    if (limit)
      list = [...list]
        .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
        .slice(0, limit);
    return list;
  }, [filter, query, limit]);

  const applyUrl = useCallback((q: string, t: Filter) => {
    setQuery(q);
    setFilter(t);
  }, []);

  const reset = () => {
    setFilter("all");
    setQuery("");
  };

  return (
    <div>
      {filterable && (
        <Suspense fallback={null}>
          <FiltersFromUrl onChange={applyUrl} />
        </Suspense>
      )}
      {filterable && (
        <div className="mb-10 flex flex-col-reverse gap-5 border-b border-line lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {/* Type tabs: plain text with a sliding underline */}
          <div
            role="tablist"
            aria-label="Filter by event type"
            className="-mx-4 -mb-px flex gap-7 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t) => {
              const active = filter === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(t.value)}
                  className={`relative shrink-0 pb-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:text-ink focus-visible:outline-none ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="event-tab-underline"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 500, damping: 40 }
                      }
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <label className="relative block shrink-0 lg:mb-3 lg:w-64">
            <span className="sr-only">Search events</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city"
              className="w-full rounded-xl bg-ink/4 py-2.5 pr-9 pl-10 text-sm text-ink placeholder:text-muted outline-none transition focus:bg-white focus:ring-1 focus:ring-line [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </label>
        </div>
      )}

      {shown.length > 0 ? (
        <motion.ul
          layout={!reduceMotion}
          className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((l, i) => (
              <motion.li
                key={l.id}
                layout={!reduceMotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TicketCard listing={l} priority={i < 2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="py-20 text-center">
          <p className="text-base font-medium text-ink">
            No events match your search
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different type or city.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-ink"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
