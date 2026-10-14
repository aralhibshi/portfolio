"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDownIcon, ArrowsLeftRightIcon } from "@phosphor-icons/react";

import { cn, defined } from "@/lib/utils";

// The Calo Kids revamp as a before/after: every meal sized from one profile, versus meals portioned per
// age range with every component customisable. Portion widths are relative and illustrative only.
const AGE_RANGES = ["2–4", "5–8", "9–12"] as const;
const COMPONENTS = [
  { name: "protein", portions: [38, 62, 88] },
  { name: "carbs", portions: [34, 56, 80] },
  { name: "fats", portions: [26, 40, 56] },
  { name: "sauce", portions: [22, 34, 46] },
];
// Uneven on purpose: portions came from one profile's measurements, not the child eating the meal.
const BEFORE_PORTIONS = [64, 42, 58, 30];
const CYCLE_MS = 2600;
const EASE = [0.22, 1, 0.36, 1] as const;

function PortionRow({
  label,
  width,
  muted = false,
  highlighted = false,
  customisable = false,
}: {
  label: string;
  width: number;
  muted?: boolean;
  highlighted?: boolean;
  customisable?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
      <span className={cn("flex items-center gap-1", highlighted ? "text-foreground" : "text-muted-foreground")}>
        {label}
        {customisable && (
          <ArrowsLeftRightIcon
            aria-hidden
            className={cn("size-3 transition-colors", highlighted ? "text-brand" : "text-brand/40")}
          />
        )}
      </span>
      <span className={cn("bg-muted/60 relative h-2.5 transition-shadow", highlighted && "ring-brand/40 ring-1")}>
        <motion.span
          className={cn("absolute inset-y-0 left-0", muted ? "bg-muted-foreground/35" : "bg-brand")}
          initial={false}
          animate={{ width: `${width}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        />
      </span>
    </div>
  );
}

export function MealSizing({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const [age, setAge] = useState(1);
  const [tick, setTick] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const autoplay = inView && !reduceMotion && !interacted;

  // Cycles through the age ranges until a visitor picks one; each step highlights the next
  // component as customisable, so it's clear every category can be swapped.
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => {
      setAge((current) => (current + 1) % AGE_RANGES.length);
      setTick((current) => current + 1);
    }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [autoplay, age]);

  const highlighted = tick % COMPONENTS.length;

  return (
    <div ref={ref} className={cn("space-y-2 font-mono text-[11px]", className)}>
      {/* Before */}
      <section aria-label="Before the revamp" className="bg-background border p-4">
        <p className="text-muted-foreground">Before</p>
        <p className="mt-1 font-sans text-sm font-medium">Kids package &amp; add-on</p>
        <p className="text-muted-foreground mt-0.5 text-[10px]">
          Every meal sized from one profile · same portions at any age
        </p>
        <div className="mt-4 space-y-2.5">
          {COMPONENTS.map((component, i) => (
            <PortionRow
              key={component.name}
              label={component.name}
              width={defined(BEFORE_PORTIONS[i], "before portion")}
              muted
            />
          ))}
        </div>
      </section>

      <p className="text-brand flex items-center justify-center gap-1.5 py-1 text-[10px]" aria-hidden>
        <ArrowDownIcon className="size-3" />
        revamped
      </p>

      {/* After */}
      <section aria-label="After the revamp" className="bg-background border-brand/50 border p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-brand">After · my revamp</p>
            <p className="mt-1 font-sans text-sm font-medium">Sized for each child</p>
          </div>
          {/* No colour transition on these: a fade leaves the old and new range both lit for a moment,
              which reads as the selection jumping back and forth. */}
          <div role="radiogroup" aria-label="Age range" className="inline-flex border">
            {AGE_RANGES.map((range, i) => (
              <button
                key={range}
                type="button"
                role="radio"
                aria-checked={age === i}
                onClick={() => {
                  setInteracted(true);
                  setAge(i);
                }}
                className={cn(
                  "focus-visible:ring-ring/50 px-2.5 py-1 outline-none focus-visible:ring-2",
                  i > 0 && "border-l",
                  age === i ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
                <span className="sr-only"> years</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2.5" aria-live="polite">
          <span className="sr-only">Portions sized for ages {AGE_RANGES[age]}.</span>
          {COMPONENTS.map((component, i) => (
            <PortionRow
              key={component.name}
              label={component.name}
              width={defined(component.portions[age], "portion for age range")}
              customisable
              highlighted={!reduceMotion && !interacted && i === highlighted}
            />
          ))}
        </div>

        <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-[10px]">
          <ArrowsLeftRightIcon aria-hidden className="text-brand size-3 shrink-0" />
          Every component customisable, with options and allergens per age range
        </p>
      </section>
    </div>
  );
}
