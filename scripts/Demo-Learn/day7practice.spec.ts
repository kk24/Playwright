/**
 * Day 7 Practice — Visual & Screenshot Testing
 * Run: npx playwright test day7practice.spec.ts --reporter=list
 *
 */

import { test, expect } from '@playwright/test';

test.describe('Day 07 – Visual Testing', () => {

  test('full-page visual snapshot', async ({ page }) => {
    await page.goto('/');

    // First run creates the baseline snapshot file
    // Subsequent runs compare against it
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,   // allow up to 100 pixels to differ
    });
  });

  test('element-level snapshot', async ({ page }) => {
    await page.goto('/');

    // Capture only the navigation component
    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('nav.png');
  });

  test('mask dynamic content (timestamps, ads)', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot('masked.png', {
      // Mask locators that change between runs (e.g. "Last updated" labels)
      mask: [page.locator('.dynamic-content')],
      maskColor: '#ff00ff',   // bright pink overlay so it's obvious in diffs
    });
  });

  test('save screenshot as file artifact', async ({ page }, testInfo) => {
    await page.goto('/');

    // Attach screenshot to test report
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('homepage-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

});