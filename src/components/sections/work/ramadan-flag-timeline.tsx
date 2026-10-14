"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

// Timeline runs early Feb → mid Apr; Ramadan 2026 fell roughly mid-Feb to mid-Mar.
const WINDOW = { start: 0.25, end: 0.67 };
const MONTHS = [
  { label: "Feb", at: 0 },
  { label: "Mar", at: 0.41 },
  { label: "Apr", at: 0.85 },
];
const LOOP_SECONDS = 7;

// The date-range automation behind the Ramadan onboarding: as "today" moves through the season the
// flag switches itself on, then off again, with no deploy or app release in between.
export function RamadanFlagTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 0.45 : 0.08);
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const [isOn, setIsOn] = useState(false);

  useMotionValueEvent(progress, "change", (p) => {
    const next = p >= WINDOW.start && p <= WINDOW.end;
    setIsOn((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (reduceMotion) {
      progress.set(0.45);
      return;
    }
    if (!inView) return;
    const controls = animate(progress, [0.08, 0.92], {
      duration: LOOP_SECONDS,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 0.6,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, progress]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Timeline: the Ramadan onboarding feature flag turns on automatically when the season starts and off when it ends, with no backend deploy or app release."
      className="font-mono text-[10px]"
    >
      <div className="text-muted-foreground relative mb-1.5 h-3.5">
        {MONTHS.map((month) => (
          <span key={month.label} className="absolute" style={{ left: `${month.at * 100}%` }}>
            {month.label}
          </span>
        ))}
      </div>

      <div className="relative h-8 border-y">
        <div
          className="bg-brand/12 border-brand/40 absolute inset-y-0 flex items-center justify-center border-x"
          style={{ left: `${WINDOW.start * 100}%`, right: `${(1 - WINDOW.end) * 100}%` }}
        >
          <span className="text-brand">☾ Ramadan</span>
        </div>
        <motion.div className="absolute inset-y-[-6px] w-px" style={{ left }}>
          <span className="bg-foreground absolute inset-y-0 w-px" />
          <span className="bg-foreground absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45" />
        </motion.div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-muted-foreground">ramadan_onboarding</span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 border px-1.5 py-0.5 transition-colors duration-300",
            isOn ? "border-brand bg-brand text-brand-foreground" : "text-muted-foreground"
          )}
        >
          <span className={cn("size-1.5 rounded-full", isOn ? "bg-brand-foreground" : "bg-muted-foreground/60")} />
          {isOn ? "ON" : "OFF"}
        </span>
        <span className="text-muted-foreground">auto by date range · no deploy or release</span>
      </div>
    </div>
  );
}
