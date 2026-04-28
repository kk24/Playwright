/**
 * Day 3 Practice — Assertions & Expect API
 * Run: npx playwright test day3_practice.spec.ts --reporter=list
 *
 */

// Import the test and expect functions from Playwright's test module
import { test, expect } from '@playwright/test';

// Describe groups related tests under a named suite
test.describe('Day 03 – Assertions & Expect API', () => { 

    test('common web-first assertions', async ({ page }) => { 

        await page.goto('/practice/input-fields');

        // Assert that the page title contains "Input Fields Practice"  
        await expect(page).toHaveTitle(/Input Field Automation Practice/);

        // Assert that the page URL contains "input-fields"
        await expect(page).toHaveURL(/input-fields/);

        // Assert that the page contains "Beginner" badge
        await expect(page.locator('xpath=//*[@id="main-content"]/div/div/div/div/section[1]/div/div[1]/div/span[1]')).toHaveText(/Beginner/);
        
        // Assert that the page contains "Input Fields" form
        await expect(page.locator('xpath=//*[@id="main-content"]/div/div/div/div/section[1]/div/div[2]/section/div/div')).toBeVisible();

    });


    test('soft assertions collect all failures', async ({ page }) => {

        await page.goto('/practice/input-fields');

        // Soft assertion: Check if the page title contains "Input Fields Practice"
        await expect.soft(page.locator('h1')).toHaveText("Input Field Automation Practice");
        
        // Soft assertion: Check if the "Disabled Input" field is enabled    
        // await expect.soft(page.locator('[id="disabledInput"]')).not.toBeEnabled();
        await expect.soft(page.locator('[id="disabledInput"]')).not.toBeEnabled();    

        // Soft assertion: Check if the "Readonly Input" field is editable
        await expect.soft(page.locator('[id="readonlyInput"]')).toBeEditable();

    });
















});