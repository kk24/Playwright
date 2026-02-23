/**
 * Day 1 Practice — TypeScript version
 * Run: npx ts-node day1_practice.ts
 *
 * Key differences from Python:
 *   - Everything is async/await
 *   - camelCase method names (goBack, newPage, etc.)
 *   - Option objects instead of keyword args
 *   - Regex literals instead of re.compile()
 *   - No `with` statement — use try/finally
 */

import { test, expect, chromium } from '@playwright/test';

test('Check Example Page (manual)', async () => {

  const browser = await chromium.launch();
  /*const browser = await chromium.launch({ headless: true }); */
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
    console.log('✅ Title assertion passed');

    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/.*\/docs\/intro/);
    console.log('✅ URL assertion passed');

    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    console.log('✅ Heading visible assertion passed');

    await page.goBack();
    await expect(page).toHaveURL('https://playwright.dev/');
    console.log('✅ Navigation back passed');

  } finally {
    await browser.close();
  }
  console.log('\n🎉 Day 1 practice complete!');

});

