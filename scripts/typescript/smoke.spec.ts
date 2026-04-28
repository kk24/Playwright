import { test, expect, chromium} from '@playwright/test';

test('Check Example Page (manual)', async () => {
    
    // define browswer context and page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // deubgging
    page.on('console', (msg) => {
    console.log(`Browser console [${msg.type()}]: ${msg.text()}`); // type() and text() are methods
    });

    // Navigate to a simple site
    await page.goto('https://playwright.dev/');

    // Check the title
    await expect(page).toHaveTitle(/Playwright/);

    // Check that the heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Trigger a console message from inside the browser 
    await page.evaluate(() => { console.log("Hello from inside the browser!"); });

    // Close the browser
    await browser.close();
});
