// Soft glows drifting behind the page like a very blurred lava lamp, quieter behind the central
// reading column. Dark mode only. Colours and overall strength are
// theme tokens (--aurora-*) in globals.css.
// Pure CSS; the drift stops for reduced-motion users.

// An eased falloff instead of a linear fade: many small alpha steps blended in oklab avoid the visible
// rings ("banding") a two-stop transparent gradient produces over a large area.
const FALLOFF = [1, 0.92, 0.78, 0.6, 0.42, 0.27, 0.15, 0.07, 0.02, 0];

function easedGlow(color: string, strength: number) {
  const stops = FALLOFF.map(
    (alpha, i) => `color-mix(in oklab, ${color} ${(strength * alpha).toFixed(1)}%, transparent) ${i * 7.5}%`
  );
  return `radial-gradient(circle in oklab, ${stops.join(", ")})`;
}

const glows = [
  {
    className: "-top-[20vh] -left-[15vw] size-[75vw] [animation:aurora-drift-a_15s_ease-in-out_infinite]",
    background: easedGlow("var(--aurora-1)", 55),
  },
  {
    className: "top-[20vh] -right-[20vw] size-[70vw] [animation:aurora-drift-b_19s_ease-in-out_infinite]",
    background: easedGlow("var(--aurora-2)", 45),
  },
  {
    className: "-bottom-[30vh] left-[5vw] size-[65vw] [animation:aurora-drift-c_23s_ease-in-out_infinite]",
    background: easedGlow("var(--aurora-3)", 40),
  },
  {
    className: "top-[5vh] left-[35vw] size-[45vw] [animation:aurora-drift-d_13s_ease-in-out_infinite]",
    background: easedGlow("var(--aurora-4)", 35),
  },
];

// Fine noise over the glows dithers away any remaining gradient steps.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Full strength at the sides, eased down to about half across the reading column, so the colour is
// still there behind text but quiet enough not to fight it. No hard edges anywhere.
const READING_MASK =
  "linear-gradient(to right, black, rgb(0 0 0 / 0.8) 18%, rgb(0 0 0 / 0.5) 32%, rgb(0 0 0 / 0.5) 68%, rgb(0 0 0 / 0.8) 82%, black)";

// Sized to the *large* viewport (100lvh) rather than inset-0: on iOS Safari the visible area grows as the
// toolbar collapses while scrolling, and an inset-0 layer would leave an uncovered band at the bottom.
export function AmbientAurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 hidden h-lvh overflow-hidden dark:block"
      style={{ opacity: "var(--aurora-opacity)", maskImage: READING_MASK, WebkitMaskImage: READING_MASK }}
    >
      {glows.map((glow, i) => (
        <span
          key={i}
          className={`absolute rounded-full will-change-transform motion-reduce:animate-none ${glow.className}`}
          style={{ background: glow.background }}
        />
      ))}
      <span className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
    </div>
  );
}
