/*
* 
* This file is used to define the fixtures that will be used in the tests.
* Fixtures are a way to set up and tear down test environments, and they can be used to share common setup code across multiple tests.
* In this file, I will define a fixture for various Page Object Models.
*/

import { test as base, expect, Page } from '@playwright/test';
import { BankLoginPage } from '../pages/BankLoginPage_DemoLearn';


//
// Fixture for BankLoginPage
//
type BankLoginPageFixture = {
    bankLogin: BankLoginPage;
};

export const test = base.extend<BankLoginPageFixture>({
    bankLogin: async ({ page }, use) => {
        const bankLogin = new BankLoginPage(page);
        await bankLogin.goto();
        await use(bankLogin);

        // tear down code 
        await page.close();
    },
});



// Re-export expect so test files only need one import --> keep this at the end of the file
export { expect };  // ✅ export expect 
export type {Page}; // ✅ export Page type