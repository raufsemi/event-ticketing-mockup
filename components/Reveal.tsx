"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element slides in from. */
  from?: "bottom" | "left" | "right";
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
};

const OFFSET = 28;

/**
 * Fades and slides children in once they scroll into view.
 * `initial` is static so server and client HTML match; reduced motion is
 * handled globally by <MotionProvider>.
 */
export default function Reveal({ children, className, delay = 0, from = "bottom", as = "div" }: Props) {
  const Tag = as === "li" ? motion.li : motion.div;
  const initial =
    from === "left" ? { opacity: 0, x: -OFFSET } : from === "right" ? { opacity: 0, x: OFFSET } : { opacity: 0, y: OFFSET };

  return (
    <Tag
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
