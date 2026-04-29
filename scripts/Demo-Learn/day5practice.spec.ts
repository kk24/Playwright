/**
 * Day 5 Practice — Fixtures and Test Hooks
 * Run: npx playwright test day5practice.spec.ts --reporter=list
 *
 */

// Import the test and expect functions from Playwright's test module
import { test, expect } from '@playwright/test';
import { BankLoginPage } from './BankLoginPage';



// Describe groups related tests under a named suite
test.describe('Day 04 – Page Object Model', () => { 

    // Test#1 - Empty Credentials (Username only)
    test('should display error for empty username', async ({ page }) => {
        const bankLoginPage = new BankLoginPage(page);

        await bankLoginPage.goto();
        await bankLoginPage.login('', 'viewer123');
        await expect(bankLoginPage.userNameErrorMessage).toBeVisible();
        await expect(bankLoginPage.userNameErrorMessage).toHaveText('Username is required');
    });

    // Test#2 - Empty Credentials (Password only)
    test('should display error for empty password', async ({ page }) => {
        const bankLoginPage = new BankLoginPage(page);

        await bankLoginPage.goto();
        await bankLoginPage.login('viewer', '');
        await expect(bankLoginPage.passwordErrorMessage).toBeVisible();
        await expect(bankLoginPage.passwordErrorMessage).toHaveText('Password is required');
    });

    // Test#3 - Empty Credentials (Both fields empty)
    test('should display errors for empty username and password', async ({ page }) => {
        const bankLoginPage = new BankLoginPage(page);

        await bankLoginPage.goto();
        await bankLoginPage.login('', '');
        await expect(bankLoginPage.userNameErrorMessage).toBeVisible();
        await expect(bankLoginPage.userNameErrorMessage).toHaveText('Username is required');
        await expect(bankLoginPage.passwordErrorMessage).toBeVisible();
        await expect(bankLoginPage.passwordErrorMessage).toHaveText('Password is required');
    });

    // Test#4 - Invalid Credentials
    test('should display alert for invalid credentials', async ({ page }) => {
        const bankLoginPage = new BankLoginPage(page);

        await bankLoginPage.goto();
        await bankLoginPage.login('viewer', 'viewer1234');  // invalid password
        await expect(bankLoginPage.alertMessage).toBeVisible();
        await expect(bankLoginPage.alertMessage).toHaveText(/Invalid username or password/);
    });

    // Test#5 - Valid Credentials
    test('should login successfully with valid credentials & display dashboard', async ({ page }) => {
        const bankLoginPage = new BankLoginPage(page);

        await bankLoginPage.goto();
        await bankLoginPage.login('viewer', 'viewer123');  // valid credentials
        await expect(page).toHaveURL(/dashboard/);
  
    });


});