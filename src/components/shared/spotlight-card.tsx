"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

// A soft brand-coloured glow that follows the pointer. Pure CSS variables, so no re-renders.
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={cn("group/spot bg-background relative isolate", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--brand) 9%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
