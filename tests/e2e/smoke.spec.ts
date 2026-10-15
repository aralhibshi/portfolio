import { expect, test } from "@playwright/test";

import { cv, cvFileName } from "../../src/lib/cv";

test.describe("portfolio smoke test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero and every section", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("end to end");
    for (const id of ["about", "experience", "work", "references", "skills", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("command menu jumps to a section", async ({ page, isMobile }) => {
    // Phones have no keyboard shortcut, so open it the way a visitor there would.
    if (isMobile) await page.getByRole("button", { name: "Menu", exact: true }).click();
    else await page.keyboard.press("ControlOrMeta+k");
    const menu = page.getByRole("dialog");
    await expect(menu).toBeVisible();
    await menu.getByPlaceholder(/type a command/i).fill("skills");
    await page.keyboard.press("Enter");
    await expect(menu).toBeHidden();
    await expect(page.locator("#skills")).toBeInViewport();
  });

  test("downloads the CV with its proper filename", async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator("#top").getByRole("link", { name: "Download CV" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe(cvFileName);
  });

  // Guards src/lib/cv.ts against drifting from the PDF it describes (e.g. a new PDF without a version bump).
  test("served CV matches its declared version and date", async ({ request }) => {
    const response = await request.get(cv.path);
    expect(response.ok()).toBe(true);
    expect(response.headers()["x-cv-version"]).toBe(`v${cv.version} (${cv.date})`);

    const pdf = (await response.body()).toString("latin1");
    const field = (name: string) => {
      const raw = pdf.match(new RegExp(`/${name}\\s*\\(([^)]*)\\)`))?.[1];
      // PDF string escapes: \ddd octal codes and backslash-escaped characters.
      return raw?.replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8))).replace(/\\(.)/g, "$1");
    };
    expect(field("CV-Version"), "PDF metadata /CV-Version").toBe(`v${cv.version}`);
    expect(field("CV-Date"), "PDF metadata /CV-Date").toBe(cv.date);
  });

  test("copies the email address", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const copy = page.locator("#contact").getByRole("button", { name: /aralhibshi@gmail\.com/ });
    await copy.click();
    await expect(copy).toContainText("Copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("aralhibshi@gmail.com");
  });
});
