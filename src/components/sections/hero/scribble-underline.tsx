"use client";

import { motion } from "motion/react";

// A hand-drawn stroke under a phrase, drawn in once on load.
export function ScribbleUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 240 16"
        preserveAspectRatio="none"
        className="text-brand/45 pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.28em] w-full overflow-visible"
      >
        <motion.path
          d="M3 11 C 45 4, 92 13, 138 8 S 210 3, 237 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          // Opacity hides the round cap's dot before the stroke starts drawing.
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.9, delay: 0.6, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.01, delay: 0.6 },
          }}
        />
      </svg>
    </span>
  );
}
