"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

// A highlighter swipe behind a phrase, drawn in on first view. A background (not an SVG stroke),
// so it follows the text when the phrase wraps across lines.
export function MarkerHighlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.span
      ref={ref}
      className="[box-decoration-break:clone] bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(color-mix(in oklab, var(--brand) 22%, transparent), color-mix(in oklab, var(--brand) 22%, transparent))",
        backgroundPosition: "0 88%",
      }}
      initial={{ backgroundSize: "0% 42%" }}
      animate={inView ? { backgroundSize: "100% 42%" } : undefined}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  );
}
