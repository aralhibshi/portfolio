"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { careerStages } from "@/content/site";
import { formatDuration, toMonths } from "@/lib/career";
import { cn, defined } from "@/lib/utils";

const first = toMonths(careerStages[0].start);
const last = toMonths(defined(careerStages.at(-1), "latest career stage").end);
const total = last - first;
const CURRENT = careerStages.length - 1;

const stages = careerStages.map((stage, i) => ({
  ...stage,
  months: toMonths(stage.end) - toMonths(stage.start),
  // Each step up the ladder is taller than the last.
  height: 28 + (72 * i) / (careerStages.length - 1),
}));

const years = Array.from(
  { length: Math.floor((last - 1) / 12) - Math.floor(first / 12) + 1 },
  (_, i) => Math.floor(first / 12) + i
);

export function CareerLadder() {
  // Tap or click pins a stage; mouse hover previews one. With neither, the current role leads.
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const focus = hovered ?? pinned ?? CURRENT;
  const focused = defined(stages[focus], "focused career stage");

  const toggle = (i: number) => setPinned((current) => (current === i ? null : i));
  const hoverProps = (i: number) => ({
    onPointerEnter: (event: React.PointerEvent) => event.pointerType === "mouse" && setHovered(i),
    onPointerLeave: () => setHovered(null),
  });

  return (
    <figure className="bg-background border p-5 md:p-8">
      <figcaption className="text-muted-foreground mb-6 flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
        <span>Career ladder · {formatDuration(total)}</span>
        <span>Width = time in role · height = level</span>
      </figcaption>

      <div className="flex h-40 items-end gap-1 border-b">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.title}
            className="relative h-full origin-bottom"
            style={{ flexGrow: stage.months, flexBasis: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* The whole column is the hit area, so even the thin bars are easy to tap. */}
            <button
              type="button"
              aria-pressed={pinned === i}
              aria-label={`${stage.title}, ${stage.org}, ${stage.period}, ${formatDuration(stage.months)}`}
              onClick={() => toggle(i)}
              {...hoverProps(i)}
              className="group focus-visible:ring-ring/50 absolute inset-0 outline-none focus-visible:ring-2"
            >
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 transition-colors duration-300",
                  focus === i ? "bg-brand" : "bg-brand/15 border-brand/40 group-hover:bg-brand/25 border-t"
                )}
                style={{ height: `${stage.height}%` }}
              />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="text-muted-foreground relative mt-2 h-4 font-mono text-[11px]" aria-hidden>
        {years.map((year) => {
          const offset = Math.max(0, (year * 12 - first) / total) * 100;
          return (
            <span key={year} className="absolute" style={{ left: `${offset}%` }}>
              {year}
            </span>
          );
        })}
      </div>

      {/* The focused stage in full: what a bar means without hunting through the legend. */}
      {/* Fixed shape so switching roles never shifts the layout: two lines on small screens (the legend
          below already shows the company), one line from md up, where it always fits. */}
      <p aria-live="polite" className="mt-5 flex flex-col gap-1 text-sm md:flex-row md:items-baseline md:gap-2">
        <span className="font-medium whitespace-nowrap">{focused.title}</span>
        <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
          <span className="sr-only md:not-sr-only">{focused.org} · </span>
          {focused.period} · {formatDuration(focused.months)}
        </span>
      </p>

      <ol className="mt-5 grid gap-1 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => (
          <li key={stage.title}>
            <button
              type="button"
              aria-pressed={pinned === i}
              onClick={() => toggle(i)}
              {...hoverProps(i)}
              className={cn(
                "focus-visible:ring-ring/50 flex w-full gap-3 px-2 py-1.5 text-left transition-colors outline-none focus-visible:ring-2",
                focus === i ? "bg-muted/60" : "hover:bg-muted/40"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-1.5 size-2.5 shrink-0 transition-colors",
                  focus === i ? "bg-brand" : "bg-brand/25 border-brand/50 border"
                )}
              />
              <span>
                <span className={cn("block text-sm font-medium", focus !== i && "text-muted-foreground")}>
                  {stage.short}
                </span>
                <span className="text-muted-foreground block font-mono text-[11px]">
                  {stage.org} · {formatDuration(stage.months)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}
