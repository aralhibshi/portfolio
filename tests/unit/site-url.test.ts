import { afterEach, describe, expect, it, vi } from "vitest";

// siteUrl is read once at import time, so each case re-imports the module with a fresh environment.
async function loadSiteUrl(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  return (await import("@/lib/site-url")).siteUrl;
}

describe("siteUrl", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("uses the production domain on Vercel", async () => {
    expect(await loadSiteUrl({ VERCEL: "1", NEXT_PUBLIC_SITE_URL: undefined })).toBe("https://ahmedalhibshi.dev");
  });

  it("uses localhost for local builds", async () => {
    expect(await loadSiteUrl({ VERCEL: undefined, NEXT_PUBLIC_SITE_URL: undefined })).toBe("http://localhost:3000");
  });

  it("lets NEXT_PUBLIC_SITE_URL override both", async () => {
    expect(await loadSiteUrl({ VERCEL: "1", NEXT_PUBLIC_SITE_URL: "https://example.com" })).toBe("https://example.com");
  });
});
