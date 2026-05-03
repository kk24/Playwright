/**
 * Network Interception & Mocking in Playwright
 * Using JSONPlaceholder — https://jsonplaceholder.typicode.com
 * Run: npx playwright test networkInterception.spec.ts --reporter=list
 */

import { test, expect } from '@playwright/test';

test.describe('Network Interception & Mocking', () => {

  /**
   * Test 1 — Mock a GET response
   */
  test('mock a GET API response', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
      const mockResponse = [
        { id: 1, name: 'Mocked User One', email: 'mockone@test.com' },
        { id: 2, name: 'Mocked User Two', email: 'mocktwo@test.com' },
      ];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/users');
    await expect(page.getByText('Mocked User One')).toBeVisible();
    await expect(page.getByText('Mocked User Two')).toBeVisible();
  });


  /**
   * Test 2 — Mock an ERROR response
   * ✅ Fixed — use page.goto() instead of page.request.get()
   */
  test('mock a failed API response', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // ✅ Navigate via browser — page.route() intercepts this
    await page.goto('https://jsonplaceholder.typicode.com/posts');

    // ✅ Verify mocked error body is shown on page
    await expect(page.getByText('Internal Server Error')).toBeVisible();
  });


  /**
   * Test 3 — Mock an EMPTY response
   * ✅ Fixed — use page.goto() instead of page.request.get()
   */
  test('mock an empty API response', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    // ✅ Navigate via browser — triggers interception
    await page.goto('https://jsonplaceholder.typicode.com/posts');

    // ✅ Verify empty array is shown on page
    await expect(page.getByText('[]')).toBeVisible();
  });


  /**
   * Test 4 — ABORT a request
   */
    test('abort a network request', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
        await route.abort('failed');
    });

    // ✅ Capture the error and assert it contains expected message
    let errorMessage = '';
    await page.goto('https://jsonplaceholder.typicode.com/users')
        .catch(error => {
        errorMessage = error.message;
        });

    // ✅ Assert the request was aborted
    expect(errorMessage).toContain('ERR_FAILED');
    console.log('✅ Request aborted as expected:', errorMessage);
    });


  /**
   * Test 5 — MODIFY a real API response
   */
  test('modify a real API response', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
      const response = await route.fetch();
      const realBody = await response.json();
      realBody[0].name = 'Modified User Name';
      await route.fulfill({
        response,
        body: JSON.stringify(realBody),
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/users');
    await expect(page.getByText('Modified User Name')).toBeVisible();
  });


  /**
   * Test 6 — Verify POST request payload
   * ✅ Fixed — use page.evaluate() to make POST from BROWSER context
   * so page.route() can intercept it
   */
  test('verify POST request payload', async ({ page }) => {

    let interceptedPayload: any;

    // ✅ Navigate first so page context exists
    await page.goto('https://jsonplaceholder.typicode.com');

    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      // ✅ Capture intercepted payload
      interceptedPayload = JSON.parse(route.request().postData() || '{}');

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 101, ...interceptedPayload }),
      });
    });

    // ✅ Make POST from WITHIN browser context — page.route() intercepts this
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Post',
          body: 'Test Body',
          userId: 1,
        }),
      });
      return { status: res.status, data: await res.json() };
    });

    // ✅ Assert correct payload was intercepted
    expect(interceptedPayload.title).toBe('Test Post');
    expect(interceptedPayload.body).toBe('Test Body');
    expect(interceptedPayload.userId).toBe(1);
    expect(response.status).toBe(201);
  });


  /**
   * Test 7 — Mock with DELAY
   * ✅ Fixed — use page.goto() so route intercepts the request
   */
  test('mock a slow API response', async ({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {

      // ✅ 3 second delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 1, name: 'Slow Response User' }]),
      });
    });

    // ✅ Navigate via browser — triggers interception with delay
    await page.goto('https://jsonplaceholder.typicode.com/users');

    // ✅ Assert mocked data is shown after delay
    await expect(page.getByText('Slow Response User')).toBeVisible();
  });

});