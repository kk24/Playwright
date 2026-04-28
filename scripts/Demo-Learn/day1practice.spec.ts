/**
 * Day 1 Practice — TypeScript version
 * Run: npx ts-node day1_practice.ts
 *
 */

// Import the test and expect functions from Playwright's test module
import { test, expect } from '@playwright/test';

// Describe groups related tests under a named suite
test.describe('Day 01 – Playwright Basics', () => {

  /* 
  *  Desc - Test to check the page title of the base URL
  *  Assertion - The page title should contain the word "QA Playground"
  * 
  */
  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/QA Playground/);
  });


  /* 
  *  Desc - Test to check navigation to the Practie page
  *  Assertion - The URL should change to the docs path
  * 
  */
  test('navigation to Practice page works', async ({ page }) => {
    await page.goto('/practice');
    await expect(page).toHaveURL(/\/practice/);
  });

});

