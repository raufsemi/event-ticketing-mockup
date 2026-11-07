"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { accentVars, eventImage, events, getEvent, type EventSlug } from "@/lib/events";

export type GalleryItem = {
  slug: EventSlug;
  label: string;
  title?: string;
  meta?: string;
  /** Real photo; falls back to a labelled placeholder. */
  image?: { src: string; alt: string };
};

type Props = {
  items: GalleryItem[];
  /** Show the event-type filter chips (homepage portfolio). */
  filterable?: boolean;
  dark?: boolean;
};

export default function GalleryGrid({ items, filterable, dark }: Props) {
  const [filter, setFilter] = useState<EventSlug | "all">("all");
  const shown = filter === "all" ? items : items.filter((i) => i.slug === filter);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
      active
        ? dark
          ? "bg-white text-night"
          : "bg-ink text-white"
        : dark
          ? "bg-white/5 text-white/75 ring-1 ring-white/10 hover:bg-white/10"
          : "bg-white text-muted ring-1 ring-line hover:text-ink"
    }`;

  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Filter by event type" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip(filter === "all")}>
            All
          </button>
          {events.map((e) => (
            <button
              key={e.slug}
              type="button"
              aria-pressed={filter === e.slug}
              onClick={() => setFilter(e.slug)}
              className={`${chip(filter === e.slug)} inline-flex items-center gap-2`}
              style={accentVars(e)}
            >
              <span className="size-2 rounded-full bg-(--accent)" />
              {e.name}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {shown.map((item, i) => {
            const e = getEvent(item.slug)!;
            // Every 4th tile is wide on large screens for a less uniform grid.
            const wide = filterable && filter === "all" && i % 4 === 0;
            return (
              <motion.figure
                key={`${item.slug}-${item.label}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                style={accentVars(e)}
                className={`group relative overflow-hidden rounded-3xl ${wide ? "lg:col-span-2" : ""}`}
              >
                <div className={`relative ${wide ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-72" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.image?.src ?? eventImage(e, wide ? 1200 : 800, wide ? 675 : 600, item.label)}
                    alt={item.image?.alt ?? `${item.label} placeholder`}
                    fill
                    sizes={wide ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                {item.title && (
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/75 p-4 ring-1 ring-white/40 backdrop-blur-md transition duration-300 group-hover:bg-white/90">
                    <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-(--accent-ink)">
                      <span className="size-1.5 rounded-full bg-(--accent)" />
                      {e.name}
                    </span>
                    <p className="font-display font-bold text-ink">{item.title}</p>
                    {item.meta && <p className="text-xs text-muted">{item.meta}</p>}
                  </figcaption>
                )}
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
