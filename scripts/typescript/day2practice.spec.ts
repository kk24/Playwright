/**
 * Day 2 Practice — TypeScript version
 * Run: npx playwright test day2_practice.spec.ts --reporter=list
 *
 * Key points vs Python:
 *   - `page` fixture injected automatically — no browser.launch() or browser.close()
 *   - Each test() gets a completely fresh page — no state leaks between tests
 *   - selectOption() vs Python's select_option()
 *   - screenshot() takes an options object: { path: '...' }
 *   - Dialog handler registered with page.on() BEFORE the action that triggers it
 *   - Screenshots on failure are handled automatically via playwright.config.ts
 */

import { test, expect, chromium } from '@playwright/test';

test.describe('Day 2 Practice', () => { 

  // --- Test 1: Login form + Screenshot ---
  // Each test gets a fresh `page` — equivalent to Python's `page` fixture
  test('login form interaction and screenshot', async ({ page }) => {
    console.log('Testing login form...');
    await page.goto('https://the-internet.herokuapp.com/login');

    // fill() is async — must await
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');

    // getByRole() with option object vs Python's get_by_role("button", name="Login")
    await page.getByRole('button', { name: 'Login' }).click();

    // toBeVisible() — camelCase: to_be_visible → toBeVisible
    await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    console.log('✅ Login form passed');

    // screenshot() takes an options object — { path, fullPage }
    // Note: playwright.config.ts can also auto-capture screenshots on failure
    await page.screenshot({ path: 'day2_success.png' });
    console.log('✅ Screenshot saved: day2_success.png');
  });

  // --- Test 2: Dropdown ---
  test('dropdown selection', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // selectOption() — camelCase: select_option → selectOption
    await page.locator('#dropdown').selectOption('Option 1');

    // toHaveValue() — camelCase: to_have_value → toHaveValue
    await expect(page.locator('#dropdown')).toHaveValue('1');
    console.log('✅ Dropdown interaction passed');
  });

  // --- Test 3: Alert / Dialog handling ---
  test('alert dialog handling', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // IMPORTANT: Register the dialog handler BEFORE the action that triggers it
    // Handler is an async arrow function — dialog.accept() must be awaited
    page.on('dialog', async (dialog) => {
      console.log(`  Dialog type: ${dialog.type()}`);    // type() is a method, not a property
      console.log(`  Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // toContainText() — camelCase: to_contain_text → toContainText
    await expect(page.locator('#result')).toContainText('You successfuly clicked an alert');
    console.log('✅ Alert handling passed');
  });

  // --- Test 4: Auto-wait demonstration ---
  test('auto-wait in action', async ({ page }) => {
    // Navigate to a page with dynamic content
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Click "Start" — this triggers a loading spinner
    await page.getByRole('button', { name: 'Start' }).click();

    // Playwright automatically waits for the text to appear — no setTimeout needed!
    // toBeVisible() will keep retrying until visible (up to 30s default timeout)
    await expect(page.locator('#finish')).toBeVisible();
    await expect(page.locator('#finish')).toContainText('Hello World!');
    console.log('✅ Auto-wait demonstration passed');
  });

});