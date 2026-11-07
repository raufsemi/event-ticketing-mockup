"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TicketCard from "@/components/TicketCard";
import type { listings } from "@/lib/listings";

type Listing = (typeof listings)[number];

type Props = {
  title: string;
  description?: string;
  href?: string;
  items: Listing[];
  /** How many of the first cards load their image eagerly. */
  priorityCount?: number;
  /** "lg" for homepage sections, "md" for stacked rows like the /events page. */
  size?: "lg" | "md";
};

/**
 * Horizontal event row, Eventbrite-style.
 * Phones swipe (last card peeks), larger screens get prev/next buttons.
 * Cards keep the same width rules at every size, so the row never turns into a grid.
 */
export default function EventCarousel({
  title,
  description,
  href,
  items,
  priorityCount = 0,
  size = "lg",
}: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [items]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: dir * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const hasOverflow = canPrev || canNext;

  return (
    <section aria-roledescription="carousel" aria-label={title}>
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10 ${
          size === "lg" ? "mb-10 sm:mb-12" : "mb-6 sm:mb-8"
        }`}
      >
        <div className="max-w-xl">
          <h2
            className={`font-display font-extrabold tracking-tight text-balance text-ink ${
              size === "lg"
                ? "text-3xl/tight sm:text-4xl/tight"
                : "text-2xl/tight sm:text-3xl/tight"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base/relaxed text-pretty text-muted">
              {description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-6">
          {href && (
            <Link
              href={href}
              className="text-sm font-semibold text-ink underline decoration-line decoration-1 underline-offset-[6px] transition hover:decoration-ink"
            >
              See all events
            </Link>
          )}

          {hasOverflow && (
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={!canPrev}
                aria-label={`Previous ${title.toLowerCase()} events`}
                className="grid size-10 place-items-center rounded-full border border-line text-ink transition enabled:hover:border-ink disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <ChevronLeft aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={!canNext}
                aria-label={`Next ${title.toLowerCase()} events`}
                className="grid size-10 place-items-center rounded-full border border-line text-ink transition enabled:hover:border-ink disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <ChevronRight aria-hidden className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((l, i) => (
          <li
            key={l.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="flex w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-1.125rem)]"
          >
            <div className="w-full">
              <TicketCard listing={l} priority={i < priorityCount} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
