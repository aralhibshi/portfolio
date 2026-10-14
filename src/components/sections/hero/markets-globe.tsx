"use client";

import { useMemo } from "react";

import { homeMarket, markets } from "@/content/site";
import type { Market } from "@/content/types";
import { useCobeGlobe } from "@/components/sections/hero/use-cobe-globe";
import { cn } from "@/lib/utils";

type MarketsGlobeProps = {
  active: Market | null;
  onSelect: (code: string) => void;
  className?: string;
};

export function MarketsGlobe({ active, onSelect, className }: MarketsGlobeProps) {
  const options = useMemo(() => ({ markets, home: homeMarket, active }), [active]);
  const { containerRef, markerRef, dragHandlers, ready } = useCobeGlobe(options);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
      {...dragHandlers}
    >
      {/* Mouse shortcut only; the market buttons under the globe are the accessible controls. */}
      <div data-markers="true" aria-hidden className="pointer-events-none absolute inset-0">
        {markets.map((market) => {
          const isActive = active?.code === market.code;
          const isDimmed = active !== null && !isActive;
          const pulses = isActive || (!active && market.code === homeMarket.code);
          return (
            <button
              key={market.code}
              ref={markerRef(market.code)}
              type="button"
              tabIndex={-1}
              onClick={() => onSelect(market.code)}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 opacity-0 transition-opacity duration-300"
            >
              <span className="relative flex size-3 items-center justify-center">
                {pulses && (
                  <span className="bg-brand/40 absolute inline-flex size-full animate-ping rounded-full motion-reduce:animate-none" />
                )}
                <span
                  className={cn(
                    "ring-background relative rounded-full ring-2 transition-[width,height,background-color] duration-300",
                    isActive ? "bg-brand size-3" : isDimmed ? "bg-muted-foreground/60 size-2" : "bg-brand size-2.5"
                  )}
                />
              </span>
              {isActive && (
                <span className="bg-foreground text-background absolute bottom-full left-1/2 mb-1 -translate-x-1/2 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap">
                  {market.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
