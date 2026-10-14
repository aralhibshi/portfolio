import { describe, expect, it } from "vitest";

import { interpolateNumbers } from "@/lib/count-up";

describe("interpolateNumbers", () => {
  it("keeps surrounding text and thousands separators", () => {
    expect(interpolateNumbers("~5,000", 0.5)).toBe("~2,500");
    expect(interpolateNumbers("~3 yrs", 1)).toBe("~3 yrs");
  });

  it("scales every number in a range", () => {
    expect(interpolateNumbers("6–8", 0.5)).toBe("3–4");
  });

  it("starts from zero", () => {
    expect(interpolateNumbers("~12", 0)).toBe("~0");
  });
});
