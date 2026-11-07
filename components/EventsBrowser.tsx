"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { events } from "@/lib/events";
import { listings } from "@/lib/listings";
import EventCarousel from "./EventCarousel";

type Listing = (typeof listings)[number];

const isHot = (l: Listing) =>
  l.badge === "Selling fast" ||
  l.badge === "Few seats left" ||
  l.tiers.some((t) => t.left);

/** /events: a search box, jump links, and one swipeable row per event type. */
export default function EventsBrowser() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const rows = useMemo(() => {
    const matches = (l: Listing) =>
      !q || `${l.title} ${l.city} ${l.venue}`.toLowerCase().includes(q);

    const byType = events
      .map((e) => ({
        id: e.slug,
        title: e.name,
        description: e.summary as string | undefined,
        items: listings.filter((l) => l.type === e.slug && matches(l)),
      }))
      .filter((r) => r.items.length > 0);

    const hot = listings.filter(isHot);
    const showHot = !q && hot.length > 0;

    return showHot
      ? [
          {
            id: "selling-fast",
            title: "Selling fast",
            description: "Grab these before they’re gone.",
            items: hot,
          },
          ...byType,
        ]
      : byType;
  }, [q]);

  const total = rows
    .filter((r) => r.id !== "selling-fast")
    .reduce((n, r) => n + r.items.length, 0);

  // Home page links to /events?type=runs, so jump to that row on arrival.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type) document.getElementById(type)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-14 flex flex-col gap-6 sm:mb-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <label className="relative block lg:w-96">
          <span className="sr-only">Search events</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event, venue or city"
            className="w-full rounded-full border border-line bg-white py-3.5 pr-11 pl-11 text-base text-ink placeholder:text-muted outline-none transition focus:border-ink [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        <nav
          aria-label="Jump to event type"
          className="-mx-5 flex items-center gap-6 overflow-x-auto px-5 text-sm whitespace-nowrap [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <span className="shrink-0 text-muted">Jump to</span>
          {events.map((e) => {
            const row = rows.find((r) => r.id === e.slug);
            return (
              <a
                key={e.slug}
                href={`#${e.slug}`}
                aria-disabled={!row}
                className={`shrink-0 font-medium underline decoration-transparent underline-offset-[6px] transition ${
                  row
                    ? "text-ink hover:decoration-ink"
                    : "pointer-events-none text-muted/50"
                }`}
              >
                {e.name}
              </a>
            );
          })}
        </nav>
      </div>

      {q && rows.length > 0 && (
        <p className="-mt-8 mb-12 text-sm text-muted sm:-mt-12">
          {total} {total === 1 ? "event matches" : "events match"} “
          {query.trim()}”
        </p>
      )}

      {/* Rows */}
      {rows.length > 0 ? (
        <div className="space-y-20 sm:space-y-24">
          {rows.map((r, i) => (
            <div key={r.id} id={r.id} className="scroll-mt-28">
              <EventCarousel
                size="md"
                title={r.title}
                description={r.description}
                items={r.items}
                priorityCount={i === 0 ? 2 : 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-lg font-semibold text-ink">
            No events match “{query.trim()}”
          </p>
          <p className="mt-2 text-sm text-muted">
            Try an event name, a venue or a city like Penang.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 text-sm font-semibold text-ink underline decoration-line underline-offset-[6px] transition hover:decoration-ink"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
