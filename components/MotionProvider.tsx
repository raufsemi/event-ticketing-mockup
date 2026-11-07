"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global reduced-motion handling. With reducedMotion="user", Framer Motion skips
 * transform/layout animations for visitors who prefer reduced motion, while every
 * component keeps the same `initial` on server and client (no hydration mismatch).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
