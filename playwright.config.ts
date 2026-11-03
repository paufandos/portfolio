import { defineConfig, devices } from "@playwright/test";

// Every page is checked on the screens recruiters actually use:
// a large and a small desktop, an iPad, an iPhone, a small iPhone and an Android phone.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" },
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "laptop-1280", use: { ...devices["Desktop Safari"], viewport: { width: 1280, height: 800 } } },
    { name: "ipad", use: { ...devices["iPad (gen 7)"] } },
    { name: "iphone-15", use: { ...devices["iPhone 15"] } },
    { name: "iphone-se", use: { ...devices["iPhone SE"] } },
    { name: "pixel-7", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node tests/server.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
