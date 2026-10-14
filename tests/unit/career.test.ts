import { describe, expect, it } from "vitest";

import { careerStages } from "@/content/site";
import { formatDuration, toMonths } from "@/lib/career";

describe("career date maths", () => {
  it("measures stages in whole months", () => {
    expect(toMonths("2023-10") - toMonths("2023-07")).toBe(3);
    expect(toMonths("2025-09") - toMonths("2023-10")).toBe(23);
  });

  it("formats durations", () => {
    expect(formatDuration(3)).toBe("3 mo");
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(23)).toBe("1 yr 11 mo");
  });

  it("has a gap-free, ordered career history", () => {
    careerStages.forEach((stage, i) => {
      expect(toMonths(stage.end)).toBeGreaterThan(toMonths(stage.start));
      const next = careerStages[i + 1];
      if (next) expect(next.start).toBe(stage.end);
    });
  });
});
