import { describe, expect, it } from "vitest";

import { angleDelta, anglesFor, project } from "@/lib/globe";

describe("globe projection", () => {
  it("centres a location when the camera targets it", () => {
    for (const location of [
      [26.07, 50.55],
      [51.51, -0.13],
      [-33.9, 18.4],
    ] as const) {
      const { phi, theta } = anglesFor(location);
      const point = project(location, phi, theta);
      expect(point.x).toBeCloseTo(0.5, 6);
      expect(point.y).toBeCloseTo(0.5, 6);
      expect(point.visible).toBe(true);
    }
  });

  it("hides points on the far side of the globe", () => {
    const { phi, theta } = anglesFor([0, 0]);
    expect(project([0, 180], phi, theta).visible).toBe(false);
  });
});

describe("angleDelta", () => {
  it("takes the short way round", () => {
    expect(angleDelta(0, Math.PI / 2)).toBeCloseTo(Math.PI / 2);
    expect(angleDelta(0, (3 * Math.PI) / 2)).toBeCloseTo(-Math.PI / 2);
  });

  it("wraps across full turns", () => {
    expect(angleDelta(0, 2 * Math.PI)).toBeCloseTo(0);
    expect(angleDelta(10 * Math.PI, 10 * Math.PI + 0.1)).toBeCloseTo(0.1);
  });
});
