"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { cn, defined } from "@/lib/utils";

const SLIDE_MS = 2400;
// A washed-out indigo (lower chroma than the brand) so the card sits quietly in the section, while
// staying dark enough for the white text to remain readable (about 4.5:1 or better).
const STORY_BACKGROUND = "linear-gradient(to bottom, oklch(0.57 0.1 285), oklch(0.5 0.09 285))";

// Simplified take on the end-of-challenge recap: story-style slides with segmented progress bars.
// Visuals only, no real figures. Tap to skip, like the real thing.
const slides = [
  {
    title: "Challenge complete",
    body: (
      <span className="block font-sans text-2xl leading-none font-semibold tracking-tight">
        You did
        <br />
        it.
      </span>
    ),
  },
  {
    title: "Days tracked",
    body: (
      <span className="grid grid-cols-7 gap-1" aria-hidden>
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className={cn("aspect-square rounded-[2px]", [9, 17].includes(i) ? "bg-white/25" : "bg-white")}
          />
        ))}
      </span>
    ),
  },
  {
    title: "Your trend",
    body: (
      <svg viewBox="0 0 80 40" className="w-full" aria-hidden>
        <path
          d="M2 6 L14 10 L24 9 L36 18 L48 21 L60 29 L78 34"
          fill="none"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={78} cy={34} r={3} fill="white" />
      </svg>
    ),
  },
  {
    title: "Goal reached",
    body: (
      <span className="grid size-10 place-items-center rounded-full bg-white text-xl font-bold" aria-hidden>
        <svg viewBox="0 0 24 24" className="text-brand size-5" fill="none" stroke="currentColor" strokeWidth={3}>
          <path d="M5 12.5 10 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
];

export function StoryRecap({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const playing = inView && !reduceMotion;

  const next = () => setIndex((current) => (current + 1) % slides.length);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [index, playing]);

  const slide = defined(slides[index], "story slide");

  return (
    <button
      ref={ref}
      type="button"
      onClick={next}
      // A phone screen keeps its own colours, the same in both site themes.
      style={{
        background: STORY_BACKGROUND,
      }}
      className={cn(
        "relative flex aspect-[9/16] w-28 shrink-0 flex-col overflow-hidden rounded-xl p-2.5 text-left text-white shadow-[0_12px_24px_-16px_rgb(0_0_0/0.25)] ring-1 ring-black/10",
        className
      )}
    >
      <span className="sr-only">
        End-of-challenge recap, slide {index + 1} of {slides.length}.
      </span>
      {/* Story progress segments */}
      <span className="flex gap-1" aria-hidden>
        {slides.map((s, i) => (
          <span key={s.title} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
            {i < index && <span className="block h-full w-full bg-white" />}
            {i === index && (
              <motion.span
                key={`${index}-${playing}`}
                className="block h-full bg-white"
                initial={{ width: playing ? "0%" : "100%" }}
                animate={{ width: "100%" }}
                transition={{ duration: playing ? SLIDE_MS / 1000 : 0, ease: "linear" }}
              />
            )}
          </span>
        ))}
      </span>
      <span className="mt-2 font-mono text-[8px] tracking-wide text-white/75 uppercase">Your recap</span>

      <motion.span
        key={index}
        className="mt-auto flex flex-col gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-mono text-[9px] text-white/80">{slide.title}</span>
        {slide.body}
      </motion.span>
      <span className="sr-only">Activate for the next slide.</span>
    </button>
  );
}
