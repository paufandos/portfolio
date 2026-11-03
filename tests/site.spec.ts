import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/", lang: "es", switchTo: "/en/", linkedin: "Escríbeme en LinkedIn" },
  { path: "/en/", lang: "en", switchTo: "/", linkedin: "Message me on LinkedIn" },
];

async function open(page: Page, path: string) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  return errors;
}

for (const p of pages) {
  test.describe(`page ${p.path}`, () => {
    test("loads without errors, with its language and one h1", async ({ page }) => {
      const errors = await open(page, p.path);
      await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText("Pau Fandos");
      expect(errors).toEqual([]);
    });

    test("shows name and the LinkedIn action in the first screen", async ({ page }) => {
      await open(page, p.path);
      await expect(page.locator("h1")).toBeInViewport();
      const cta = page.locator(".hero .btn", { hasText: p.linkedin });
      await expect(cta).toBeInViewport({ ratio: 1 });
      await expect(cta).toHaveAttribute("href", "https://www.linkedin.com/in/paufandos/");
    });

    test("never scrolls sideways", async ({ page }) => {
      await open(page, p.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const offenders = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        return [...document.querySelectorAll("body *")]
          .filter((element) => !element.closest("svg, .hero, .competition, .terminal"))
          .filter((element) => element.getBoundingClientRect().right > width + 1)
          .map((element) => `${element.tagName}.${element.className}`);
      });
      expect(offenders).toEqual([]);
    });

    test("loads every image and font", async ({ page }) => {
      await open(page, p.path);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const broken = await page.evaluate(async () => {
        const images = [...document.images];
        await Promise.all(images.map((image) => (image.complete ? null : image.decode().catch(() => null))));
        return images.filter((image) => image.naturalWidth === 0).map((image) => image.src);
      });
      expect(broken).toEqual([]);
      expect(await page.evaluate(() => document.fonts.check("900 40px Archivo"))).toBe(true);
      for (const image of await page.locator("img").all()) {
        await expect(image).toHaveAttribute("alt", /\S/);
      }
    });

    test("has working in-page anchors and external links", async ({ page }) => {
      await open(page, p.path);
      const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")).filter((href) => href && href.length > 1)
      );
      for (const href of anchors) {
        await expect(page.locator(href!)).toHaveCount(1);
      }
      for (const link of await page.locator('a[target="_blank"]').all()) {
        await expect(link).toHaveAttribute("rel", /noopener/);
        await expect(link).toHaveAttribute("href", /^https:\/\/(www\.linkedin\.com\/in\/paufandos\/|github\.com\/paufandos)$/);
      }
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    });

    test("switches language", async ({ page }) => {
      await open(page, p.path);
      await page.locator(".nav .lang").click();
      await expect(page).toHaveURL(new RegExp(`${p.switchTo.replace(/\//g, "\\/")}$`));
      await expect(page.locator("html")).not.toHaveAttribute("lang", p.lang);
    });

    test("passes automated accessibility checks", async ({ page }) => {
      await open(page, p.path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(" | ")}`)).toEqual([]);
    });

    test("keeps the keyboard focus visible", async ({ page, browserName }) => {
      test.skip(browserName === "webkit", "WebKit does not tab to links by default");
      await open(page, p.path);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip")).toBeFocused();
      await expect(page.locator(".skip")).toBeInViewport();
    });

    test("looks right @visual", async ({ page }) => {
      await open(page, p.path);
      await expect(page).toHaveScreenshot(`${p.lang}.png`, { fullPage: true });
    });
  });
}

test("old /Portfolio/ URL redirects to the home page", async ({ page }) => {
  await page.goto("/Portfolio/");
  await expect(page).toHaveURL(/127\.0\.0\.1:4173\/$/);
  await expect(page.locator("h1")).toHaveText("Pau Fandos");
});
