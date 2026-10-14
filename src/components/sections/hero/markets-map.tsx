"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

import { MarketsGlobe } from "@/components/sections/hero/markets-globe";
import { markets } from "@/content/site";
import { cn } from "@/lib/utils";

// How long a pinned market stays focused, untouched, before the globe drifts back on its own.
const AUTO_RESUME_MS = 8000;
// Grace period when the pointer leaves the legend, so brushing past an edge doesn't snap the globe away.
const LEAVE_DELAY_MS = 300;

// Globe plus its market legend. Hovering a market previews it; clicking pins it.
export function MarketsMap() {
  const [pinned, setPinned] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeCode = preview ?? pinned;
  const active = markets.find((market) => market.code === activeCode) ?? null;

  const togglePin = (code: string) => setPinned((current) => (current === code ? null : code));

  const showPreview = (code: string) => {
    clearTimeout(leaveTimer.current);
    setPreview(code);
  };

  const endPreview = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setPreview(null), LEAVE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  // A pinned market releases itself once it's been left alone for a while...
  useEffect(() => {
    if (!pinned || preview) return;
    const timer = setTimeout(() => setPinned(null), AUTO_RESUME_MS);
    return () => clearTimeout(timer);
  }, [pinned, preview]);

  // ...or straight away on Escape.
  useEffect(() => {
    if (!pinned) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(null);
      setPreview(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pinned]);

  return (
    <div>
      <MarketsGlobe active={active} onSelect={togglePin} />

      <div className="mt-2 flex flex-col items-center gap-3">
        <ul
          aria-label="Markets"
          className="flex flex-wrap justify-center gap-1.5"
          onPointerLeave={endPreview}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) endPreview();
          }}
        >
          {markets.map((market) => {
            const isActive = activeCode === market.code;
            return (
              <li key={market.code}>
                <button
                  type="button"
                  aria-pressed={pinned === market.code}
                  aria-label={`${market.name}: ${market.scope}`}
                  onClick={() => togglePin(market.code)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && showPreview(market.code)}
                  // Keyboard focus only: a mouse click also focuses, which would stop a pinned market unpinning.
                  onFocus={(event) => event.currentTarget.matches(":focus-visible") && showPreview(market.code)}
                  className={cn(
                    "hover:border-brand hover:text-foreground focus-visible:ring-ring/50 border px-2 py-1 font-mono text-[11px] transition-colors outline-none focus-visible:ring-2",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground hover:text-brand-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {market.code}
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="text-muted-foreground flex h-5 items-center gap-2 font-mono text-[11px]">
          {active ? (
            <p>
              <span className="text-foreground">{active.name}</span> · {active.scope}
            </p>
          ) : (
            <p>Hover or tap a market</p>
          )}
          {pinned && !preview && (
            <button
              type="button"
              onClick={() => setPinned(null)}
              className="hover:text-foreground inline-flex items-center gap-1 underline-offset-4 transition-colors hover:underline"
            >
              <ArrowCounterClockwiseIcon className="size-3" />
              Reset view
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
