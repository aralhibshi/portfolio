"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { COBEOptions, Globe } from "cobe";

import type { Market } from "@/content/types";
import { brand } from "@/lib/brand";
import { angleDelta, anglesFor, project } from "@/lib/globe";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

type Rgb = [number, number, number];
type Palette = Pick<COBEOptions, "dark" | "baseColor" | "glowColor" | "mapBrightness"> & { accent: Rgb; muted: Rgb };

const palettes: Record<"light" | "dark", Palette> = {
  light: {
    dark: 0,
    baseColor: [1, 1, 1],
    glowColor: [0.96, 0.95, 0.93],
    mapBrightness: 6,
    accent: [...brand.light.rgb],
    muted: [0.72, 0.72, 0.76],
  },
  dark: {
    // Dimmer land dots in dark mode so the markers and arcs stand out.
    dark: 1,
    baseColor: [0.22, 0.22, 0.26],
    glowColor: [0.12, 0.12, 0.15],
    mapBrightness: 3.2,
    accent: [...brand.dark.rgb],
    muted: [0.4, 0.4, 0.46],
  },
};

// Frame the globe between the UK and the Gulf so every market is on the visible side.
const HOME_VIEW = anglesFor([33, 28]);
const SWAY = 0.25;
const EASE = 0.08;
export const MARKER_ELEVATION = 0.01;

type GlobeOptions = {
  markets: readonly Market[];
  home: Market;
  /** The market to centre on, or null for the default swaying view. */
  active: Market | null;
};

function arcsFor({ markets, home, active }: GlobeOptions, palette: Palette) {
  return markets
    .filter((market) => market.code !== home.code)
    .map((market) => ({
      from: home.location,
      to: market.location,
      color: !active || active.code === home.code || active.code === market.code ? palette.accent : palette.muted,
    }));
}

/** Runs `task` once the page has loaded and the browser is idle. Returns a function that cancels it. */
function whenIdleAfterLoad(task: () => void) {
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(task, { timeout: 1500 });
    else timeoutId = setTimeout(task, 200); // Safari has no requestIdleCallback
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}

/**
 * Drives a cobe WebGL globe: lazy-loads the library, eases the camera towards the active market, keeps
 * HTML markers projected onto it, supports dragging, and pauses whenever it's off-screen.
 * Attach `containerRef` and `dragHandlers` to the wrapper, and register markers through `markerRef`.
 */
export function useCobeGlobe(options: GlobeOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Record<string, HTMLElement | null>>({});
  const optionsRef = useRef(options);
  const dragRef = useRef<{ startX: number; offset: number } | null>(null);
  const offsetRef = useRef(0);
  const playRef = useRef<() => void>(() => {});
  const updateArcsRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const { isDark } = useThemeToggle();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    optionsRef.current = options;
    updateArcsRef.current();
    playRef.current();
  }, [options]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // cobe wraps its canvas in a div of its own, so the canvas is created here rather than by React.
    const canvas = document.createElement("canvas");
    canvas.className = "size-full";
    container.prepend(canvas);

    const palette = palettes[isDark ? "dark" : "light"];
    const view = { ...HOME_VIEW };
    let globe: Globe | undefined;
    let frame = 0;
    let visible = false;
    let cancelled = false;
    const started = performance.now();

    const positionMarkers = () => {
      for (const market of optionsRef.current.markets) {
        const el = markerRefs.current[market.code];
        if (!el) continue;
        const point = project(market.location, view.phi, view.theta, MARKER_ELEVATION);
        el.style.left = `${point.x * 100}%`;
        el.style.top = `${point.y * 100}%`;
        el.style.opacity = point.visible ? "1" : "0";
        el.style.pointerEvents = point.visible ? "auto" : "none";
      }
    };

    const render = (now: number) => {
      if (!globe) return;
      const current = optionsRef.current.active;
      const target = current ? anglesFor(current.location) : HOME_VIEW;
      const sway = current || reduceMotion ? 0 : Math.sin((now - started) / 4000) * SWAY;
      if (!dragRef.current) offsetRef.current *= 0.94; // ease back after a drag

      const goalPhi = target.phi + sway + offsetRef.current;
      const ease = reduceMotion ? 1 : EASE;
      view.phi += angleDelta(view.phi, goalPhi) * ease;
      view.theta += (target.theta - view.theta) * ease;
      globe.update({ phi: view.phi, theta: view.theta });
      positionMarkers();

      const settling =
        dragRef.current !== null ||
        Math.abs(offsetRef.current) > 0.001 ||
        Math.abs(angleDelta(view.phi, goalPhi)) > 0.001 ||
        Math.abs(target.theta - view.theta) > 0.001;
      if (visible && (!reduceMotion || settling)) frame = requestAnimationFrame(render);
    };

    const play = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    playRef.current = play;
    updateArcsRef.current = () => globe?.update({ arcs: arcsFor(optionsRef.current, palette) });

    // Creating the globe compiles WebGL shaders and builds the dot map: one long task. Wait until the page
    // has loaded and the browser is idle, so it never competes with hydration or the first interactions.
    const createWhenIdle = async () => {
      const { default: createGlobe } = await import("cobe");
      if (cancelled) return;
      const size = container.offsetWidth; // CSS pixels; cobe applies devicePixelRatio itself
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size,
        height: size,
        phi: view.phi,
        theta: view.theta,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: palette.mapBrightness,
        mapBaseBrightness: isDark ? 0 : 0.05,
        scale: 1,
        dark: palette.dark,
        baseColor: palette.baseColor,
        glowColor: palette.glowColor,
        // Markers are drawn as crisp HTML dots on top, so the WebGL ones stay empty.
        markers: [],
        markerColor: palette.accent,
        markerElevation: MARKER_ELEVATION,
        arcs: arcsFor(optionsRef.current, palette),
        arcColor: palette.accent,
        arcWidth: 0.8,
        arcHeight: 0.25,
      });
      setReady(true);
      play();
    };
    const cancelStart = whenIdleAfterLoad(createWhenIdle);

    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) play();
      else cancelAnimationFrame(frame);
    });
    observer.observe(container);

    const resize = new ResizeObserver(() => {
      const size = container.offsetWidth;
      globe?.update({ width: size, height: size });
      play();
    });
    resize.observe(container);

    return () => {
      cancelled = true;
      cancelStart();
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      globe?.destroy();
      // Remove the canvas and cobe's wrapper, leaving React's marker layer in place.
      for (const child of [...container.children]) {
        if (!(child instanceof HTMLElement && child.dataset.markers)) child.remove();
      }
    };
  }, [isDark, reduceMotion]);

  const dragHandlers = {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if (event.target instanceof Element && event.target.closest("button")) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = { startX: event.clientX, offset: offsetRef.current };
      playRef.current();
    },
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      offsetRef.current = drag.offset + (event.clientX - drag.startX) / 200;
    },
    onPointerUp: () => {
      dragRef.current = null;
    },
    onPointerCancel: () => {
      dragRef.current = null;
    },
  };

  /** Callback ref for a marker element, keyed by market code. */
  const markerRef = (code: string) => (el: HTMLElement | null) => {
    markerRefs.current[code] = el;
  };

  return { containerRef, markerRef, dragHandlers, ready };
}
