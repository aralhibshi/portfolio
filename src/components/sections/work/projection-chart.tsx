"use client";

import { motion } from "motion/react";

// The shape of the personalised weight-projection graph: a dashed projected curve down to the goal,
// and the user's actual progress drawn alongside it. Illustrative only, no real data.
const PROJECTED = "M14 22 C 70 30, 120 52, 170 66 S 250 84, 286 88";
const ACTUAL = "M14 22 L 40 30 L 62 29 L 86 40 L 108 44 L 130 53 L 152 56 L 176 66";
const EASE = [0.65, 0, 0.35, 1] as const;

export function ProjectionChart() {
  return (
    <motion.svg
      viewBox="0 0 300 112"
      role="img"
      aria-label="Illustrative weight-projection chart: a dashed projected line trends down to a goal, with the user's actual progress tracking just below it."
      className="w-full overflow-visible font-mono text-[9px]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
    >
      {/* Axes */}
      <g className="stroke-border" strokeWidth={1}>
        <path d="M14 8 V100 H292" fill="none" />
        {[34, 56, 78].map((y) => (
          <path key={y} d={`M14 ${y} H292`} strokeDasharray="2 4" />
        ))}
      </g>
      <text x={18} y={12} className="fill-muted-foreground text-[8px]">
        weight
      </text>
      <text x={292} y={110} textAnchor="end" className="fill-muted-foreground text-[8px]">
        weeks
      </text>

      {/* Projection */}
      <motion.path
        d={PROJECTED}
        fill="none"
        className="stroke-brand/60"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Goal */}
      <motion.g
        variants={{ hidden: { opacity: 0, scale: 0.6 }, shown: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{ transformOrigin: "286px 88px" }}
      >
        <circle cx={286} cy={88} r={6} className="fill-brand/15 stroke-brand/60" />
        <circle cx={286} cy={88} r={2} className="fill-brand" />
        <text x={286} y={76} textAnchor="middle" className="fill-brand">
          goal
        </text>
      </motion.g>

      {/* Actual progress */}
      <motion.path
        d={ACTUAL}
        fill="none"
        className="stroke-foreground"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
        transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
      />
      <motion.circle
        cx={176}
        cy={66}
        r={3.5}
        className="fill-background stroke-foreground"
        strokeWidth={2}
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.2, delay: 1.9 }}
      />
      <motion.text
        x={176}
        y={56}
        textAnchor="middle"
        className="fill-foreground"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.3, delay: 2 }}
      >
        today
      </motion.text>

      {/* Legend */}
      <g className="fill-muted-foreground text-[8px]">
        <path d="M150 104 h12" className="stroke-foreground" strokeWidth={2} />
        <text x={166} y={107}>
          actual
        </text>
        <path d="M200 104 h12" className="stroke-brand/60" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={216} y={107}>
          projected
        </text>
      </g>
    </motion.svg>
  );
}
