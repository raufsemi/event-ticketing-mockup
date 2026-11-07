"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { accentVars, getEvent, type EventSlug } from "@/lib/events";
import { photos } from "@/lib/photos";

type EventCardProps = {
  slug: EventSlug;
  index?: number;
};

/** Homepage card for one event type. Takes a slug so it can be used from server components. */
export default function EventCard({ slug, index = 0 }: EventCardProps) {
  const e = getEvent(slug);
  const reduceMotion = useReducedMotion();

  if (!e) return null;

  const Icon = e.icon;
  const examples = e.examples.slice(0, 3);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={accentVars(e)}
      className="h-full"
    >
      <Link
        href={`/${e.slug}`}
        className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-2 transition-colors duration-300 hover:border-(--accent)/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
      >
        {/* Image sits inset inside the card frame */}
        <div className="relative aspect-4/3 overflow-hidden rounded-[1.25rem] bg-(--accent)/10">
          <Image
            src={photos[e.photo].src}
            alt={photos[e.photo].alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-1 flex-col px-4 pt-5 pb-3">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Icon
                aria-hidden
                className="size-4.5 shrink-0 text-(--accent-ink)"
              />
              <h3 className="font-display text-lg font-bold tracking-tight text-balance text-ink">
                {e.name}
              </h3>
            </div>

            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-pretty text-muted">
            {e.summary}
          </p>

          {/* Examples as quiet rows instead of chips */}
          {examples.length > 0 && (
            <div className="mt-auto pt-6">
              <ul className="divide-y divide-line border-t border-line">
                {examples.map((x) => (
                  <li key={x} className="py-2.5 text-sm text-ink/75">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
