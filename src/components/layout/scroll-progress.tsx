"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Page-wide reading progress for small screens. On desktop the active nav link shows per-section progress instead.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="bg-brand absolute inset-x-0 -bottom-px h-px origin-left lg:hidden"
      style={{ scaleX }}
    />
  );
}
