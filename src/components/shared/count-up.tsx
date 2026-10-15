"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { interpolateNumbers } from "@/lib/count-up";

// Ticks every number inside a label (e.g. "~5,000", "~12", "~3 yrs") up from zero, once, on first view.
// The final value is what's rendered on the server, so no-JS visitors always get it; once JavaScript runs,
// the number waits at zero until it's in view, so the final value never shows before the count.
// Screen readers always get the final value from the hidden copy.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const render = (progress: number) => {
      el.textContent = interpolateNumbers(value, progress);
    };

    render(0);
    if (!inView) return;

    const controls = animate(0, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: render });
    return () => {
      controls.stop();
      el.textContent = value;
    };
  }, [inView, reduceMotion, value]);

  return (
    <span className="tabular-nums">
      <span ref={ref} aria-hidden>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
