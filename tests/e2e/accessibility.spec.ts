import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Sections fade in as they scroll into view, so scroll through the whole page first: axe should check the
// page as visitors see it, not half-transparent content. Instant jumps, since the page itself smooth-scrolls.
async function revealEverything(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });
  await page.waitForTimeout(1500);
}

for (const colorScheme of ["light", "dark"] as const) {
  test(`has no detectable accessibility issues in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await revealEverything(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(violations.map(({ id, help, nodes }) => ({ id, help, targets: nodes.map((node) => node.target) }))).toEqual(
      []
    );
  });
}
