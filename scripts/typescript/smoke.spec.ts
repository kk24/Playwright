import { test, expect, chromium} from '@playwright/test';

test('Check Example Page (manual)', async () => {
    
    // define browswer context and page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to a simple site
    await page.goto('https://example.com');

    // Check the title
    await expect(page).toHaveTitle(/Example/);

    // Check that the heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Close the browser
    await browser.close();
});
