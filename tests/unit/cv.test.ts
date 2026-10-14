import { describe, expect, it } from "vitest";

import { cv, cvFileName } from "@/lib/cv";

describe("CV metadata", () => {
  it("uses a minor version and an ISO date", () => {
    expect(cv.version).toMatch(/^\d+\.\d+$/);
    expect(cv.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(cv.date))).toBe(false);
  });

  it("keeps the download filename stable and version-free", () => {
    expect(cvFileName).toBe("Ahmed Alhibshi - CV - Full-Stack Software Engineer.pdf");
    expect(cvFileName).not.toContain(cv.date);
  });
});
