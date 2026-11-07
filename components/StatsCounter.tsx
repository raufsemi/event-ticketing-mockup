"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { formatNumber } from "@/lib/format";

export type Stat = { value: number; label: string; prefix?: string; suffix?: string; decimals?: number };

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Only used inside the effect (imperative animate() ignores MotionConfig).
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // With reduced motion the count jumps straight to the final value.
    const controls = animate(0, stat.value, { duration: reduce ? 0 : 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  const text = formatNumber(n, stat.decimals ?? 0);

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {text}
      {stat.suffix}
    </span>
  );
}

type Props = {
  stats: Stat[];
  /** Light text on dark backgrounds. */
  dark?: boolean;
};

export default function StatsCounter({ stats, dark }: Props) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col border-l-2 border-(--accent,var(--color-brand)) pl-5">
          <dt className={`order-2 mt-2 text-sm ${dark ? "text-white/65" : "text-muted"}`}>{s.label}</dt>
          <dd className={`order-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>
            <Counter stat={s} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
