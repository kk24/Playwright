/*
* 
* This file is used to define the fixtures that will be used in the tests.
* Fixtures are a way to set up and tear down test environments, and they can be used to share common setup code across multiple tests.
* In this file, I will define a fixture for various Page Object Models.
*/

import { test as base, expect, Page } from '@playwright/test';
import { BankLoginPage } from '../pages/BankLoginPage_DemoLearn';
import { ParkingCostCalculatorPage } from '../pages/CalcPage_ParkingCostCalculator';
import { HomePage, RoomPage, ContactPage } from '../pages/RestfulBooker';


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


//
// Fixture for ParkingCostCalculatorPage
//
type ParkingCostCalculatorPageFixture = {
    parkingCostCalculator: ParkingCostCalculatorPage;
};

export const parkingPageTest = base.extend<ParkingCostCalculatorPageFixture>({
    parkingCostCalculator: async ({ page }, use) => {
        const parkingCostCalculator = new ParkingCostCalculatorPage(page);
        await parkingCostCalculator.goto();
        await use(parkingCostCalculator);

        // tear down code 
        //await page.close();
    }
});


//
// Fixture for Restful Booker E2E
//
type RestfulBookerE2EFixture = {
    homePage: HomePage;
    roomPage: RoomPage;
    contactPage: ContactPage;
};

export const restfulBookerE2ETest = base.extend<RestfulBookerE2EFixture>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
        // tear down code 
        //await page.close();
    },
    roomPage: async ({ page }, use) => {
        const roomPage = new RoomPage(page);
        // await roomPage.goto();  // No need to navigate to the room page directly, as it will be navigated to from the home page during the test flow
        await use(roomPage);

        // tear down code 
        //await page.close();
    },
    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        // await contactPage.goto();  // No need to navigate to the contact page directly, as it will be navigated to from the home page during the test flow
        await use(contactPage);

        // tear down code 
        //await page.close();
    },
});




// Re-export expect so test files only need one import --> keep this at the end of the file
export { expect };  // ✅ export expect 
export type {Page}; // ✅ export Page type