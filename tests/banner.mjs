// Renders the LinkedIn and X banners from tests/banner.html: node tests/banner.mjs <out-dir>
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const out = process.argv[2];
const page = await (await chromium.launch()).newPage();
await page.goto(new URL("./banner.html", import.meta.url).href);
await page.evaluate(() => document.fonts.ready);
for (const [name, w, h, fs, pad] of [["linkedin-banner", 1584, 396, 112, 96], ["x-header", 1500, 500, 120, 90]]) {
  await page.setViewportSize({ width: w, height: h });
  await page.evaluate(([w, h, fs, pad]) => {
    const b = document.getElementById("b");
    b.style.setProperty("--w", `${w}px`); b.style.setProperty("--h", `${h}px`);
    b.style.setProperty("--fs", `${fs}px`); b.style.setProperty("--pad", `${pad}px`);
  }, [w, h, fs, pad]);
  await page.locator("#b").screenshot({ path: `${out}/${name}.png` });
}
process.exit(0);
