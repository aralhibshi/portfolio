"use client";

import { useEffect, useState } from "react";
import { motionValue } from "motion/react";

import { navItems } from "@/content/site";

// One scroll-driven source of truth for the nav: how far through each section you've read
// (0–1, measured against a line 40% down the viewport), and which section that line is in.
export function useSectionProgress() {
  const [active, setActive] = useState<string | null>(null);
  // One value per section, created once; they're updated every frame without re-rendering.
  const [fills] = useState(() => navItems.map(() => motionValue(0)));

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      // The last section can't scroll past the line, so reaching the page bottom completes it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;

      navItems.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) current = item.id;
        const isLast = i === navItems.length - 1;
        fills[i]?.set(atBottom && isLast ? 1 : Math.min(1, Math.max(0, (line - rect.top) / rect.height)));
      });

      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [fills]);

  return { active, fills };
}
