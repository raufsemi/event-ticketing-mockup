"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ph } from "@/lib/site";

type Testimonial = { quote: string; name: string; role: string };

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  // Only read inside the autoplay effect below, never in rendered output.
  const reduce = useReducedMotion();

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + items.length) % items.length, step]),
    [items.length],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  const t = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-line sm:min-h-[18rem] sm:p-12">
        <Quote className="absolute top-8 right-8 size-16 text-brand/15 sm:size-24" aria-hidden />
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <blockquote className="relative max-w-3xl font-display text-xl leading-snug font-semibold tracking-tight text-ink text-pretty sm:text-2xl lg:text-3xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Image
                src={ph(96, 96, "Photo")}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full ring-2 ring-white"
              />
              <div>
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="grid h-11 place-items-center"
            >
              <span className={`block h-2 rounded-full transition-all ${i === index ? "w-8 bg-ink" : "w-2 bg-ink/20"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-line transition hover:bg-ink hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-line transition hover:bg-ink hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
