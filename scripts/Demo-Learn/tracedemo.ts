import { chromium } from 'playwright';

async function tracingExample(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // tracing.start() is async — await it
  // Options are an object with camelCase keys
  await context.tracing.start({
    screenshots: true,  // Capture screenshots at each step
    snapshots: true,    // Capture DOM snapshots
    sources: true,      // Include source files in trace
  });

  const page = await context.newPage();
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();

  // tracing.stop() is async — save to a zip file
  await context.tracing.stop({ path: 'trace.zip' });

  await browser.close();
}

tracingExample().catch(console.error);
// View the trace: npx playwright show-trace trace.zip