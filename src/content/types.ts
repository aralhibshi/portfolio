// Shapes of the portfolio content. The data itself lives in site.ts.

export type Market = {
  code: string;
  name: string;
  location: [lat: number, lng: number];
  scope: string;
};

// Icon keys are mapped to actual icons in the Work section, keeping this file plain data.
export type ProjectIcon = "kids" | "weight" | "pipeline" | "onboarding" | "planner";

/** Card-specific illustration, mapped to a component in the Work section. */
export type ProjectVisual = "migration-pipeline" | "weight-projection" | "ramadan-flag";

export type Project = {
  name: string;
  icon: ProjectIcon;
  kicker: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  /** The "why" behind the build: one short sentence each. */
  decisions?: string[];
  /** A small, card-specific illustration of how the thing worked. */
  visual?: ProjectVisual;
};

export type Testimonial = {
  quote: string;
  /** Exact substring of `quote` to mark with the highlighter. */
  highlight?: string;
  more?: string;
  name: string;
  title: string;
  relation: string;
};

/** Heading block for a page section: the small mono label, the headline, and an optional intro. */
export type SectionCopy = {
  label: string;
  title: string;
  intro?: string;
};
