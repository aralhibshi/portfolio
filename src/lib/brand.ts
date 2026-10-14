// Brand accent for places that can't read CSS variables (WebGL globe, generated OG image).
// Keep in sync with --brand in src/app/globals.css and the accent square in src/app/icon.svg.
export const brand = {
  light: { hex: "#543fe0", rgb: [0.33, 0.248, 0.878] },
  dark: { hex: "#9f98ff", rgb: [0.623, 0.597, 1] },
} as const satisfies Record<"light" | "dark", { hex: string; rgb: readonly [number, number, number] }>;
