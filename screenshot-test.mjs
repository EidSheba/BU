import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Arabic - ArchitectSection copy reveal area (12500-14000)
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.locator('.hero-lang').click();
await page.waitForTimeout(1500);
for (const pos of [12200, 12500, 13000, 13200]) {
  await page.evaluate((y) => window.scrollTo(0, y), pos);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `copy-ar-${pos}.png` });
}

// English same
await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
for (const pos of [12500, 13000]) {
  await page.evaluate((y) => window.scrollTo(0, y), pos);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `copy-en-${pos}.png` });
}

await browser.close();
console.log("Done!");
