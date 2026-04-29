/**
 * Day 5 Practice — Fixtures and Test Hooks
 * Run: npx playwright test day5practice.spec.ts --reporter=list
 *
 */

// Import the test and expect functions from Playwright's test module
// import { test, expect } from '@playwright/test';

import {test, expect, Page} from '../../fixtures'; // Importing the custom fixtures defined in the fixtures file


// Describe groups related tests under a named suite
test.describe('Day 05 – Fixtures and Test Hooks', () => { 


// =============================================================================================
// Hooks
// =============================================================================================

// Shared variable to hold the page instance across hooks
let sharedPage: Page | undefined; // Initialize as undefined

// ✅ Hook 1 — beforeAll
// beforeAll hook runs once before all tests in the suite
test.beforeAll(async () => {
    console.log('================================================');
    console.log('Before All Hook - Bank Login Test Suite');
    console.log('================================================');
});

// ✅ Hook 2 — beforeEach
// beforeEach hook runs before each test in the suite
test.beforeEach(async ({bankLogin}) => {
    bankLogin.goto(); // Ensure we start from the login page before each test
    await expect(bankLogin.page).toHaveURL(/\/bank/); // Verify we are on the bank login page
    console.log('Before Each Hook - Bank Login page is loaded');
});

// ✅ Hook 3 — afterEach
// afterEach hook runs after each test in the suite
test.afterEach(async ({bankLogin}) => {
    await bankLogin.clearFields(); // Clear any pre-filled data before each test
    console.log('After Each Hook - Fields & alert messages cleared');
});

// ✅ Hook 4 — afterAll
// afterAll hook runs once after all tests in the suite
test.afterAll(async () => {
    console.log('================================================');
    console.log('After All Hook - Bank Login Test Suite Completed');
    console.log('================================================');
    if (sharedPage) {
        await sharedPage.close(); // Close the page after all tests are done
    }
});


// =============================================================================================
// Tests
// =============================================================================================


// Test#1 - Empty Credentials (Username only)
test('should display error for empty username', async ({ bankLogin }) => {
    //await bankLogin.goto();
    console.log('Executing Test: should display error for empty username');
    await bankLogin.login('', 'viewer123');
    await expect(bankLogin.userNameErrorMessage).toBeVisible();
    await expect(bankLogin.userNameErrorMessage).toHaveText('Username is required');
});


// Test#2 - Empty Credentials (Password only)
test('should display error for empty password', async ({ bankLogin }) => {
    //await bankLogin.goto();
    console.log('Executing Test: should display error for empty password');
    await bankLogin.login('viewer', '');
    await expect(bankLogin.passwordErrorMessage).toBeVisible();
    await expect(bankLogin.passwordErrorMessage).toHaveText('Password is required');
});

// Test#3 - Empty Credentials (Both fields empty)
test('should display errors for empty username and password', async ({ bankLogin }) => {
    //await bankLogin.goto();
    console.log('Executing Test: should display errors for empty username and password');
    await bankLogin.login('', '');
    await expect(bankLogin.userNameErrorMessage).toBeVisible();
    await expect(bankLogin.userNameErrorMessage).toHaveText('Username is required');
    await expect(bankLogin.passwordErrorMessage).toBeVisible();
    await expect(bankLogin.passwordErrorMessage).toHaveText('Password is required');
});

// Test#4 - Invalid Credentials
test('should display alert for invalid credentials', async ({ bankLogin }) => {
    //await bankLogin.goto();
    console.log('Executing Test: should display alert for invalid credentials');
    await bankLogin.login('viewer', 'viewer1234');  // invalid password
    await expect(bankLogin.alertMessage).toBeVisible();
    await expect(bankLogin.alertMessage).toHaveText(/Invalid username or password/);
});


}); // End of test suite