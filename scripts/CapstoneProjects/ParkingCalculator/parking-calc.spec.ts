/**
 * Parking Cost Calculator Test Suite
 * Run: npx playwright test parking-calc.spec.ts --reporter=list
 *
 */

import {parkingPageTest, expect, Page} from '../../../fixtures'; // Importing the custom fixtures defined in the fixtures file



// Describe groups related tests under a named suite
parkingPageTest.describe('Parking Cost Calculator Test Suite', () => { 


// =============================================================================================
// Hooks
// =============================================================================================

// Shared variable to hold the page instance across hooks
let sharedPage: Page | undefined; // Initialize as undefined

// ✅ Hook 1 — beforeAll
// beforeAll hook runs once before all tests in the suite
parkingPageTest.beforeAll(async () => {
    console.log('================================================');
    console.log('Parking Cost Calculator Test Suite');
    console.log('================================================');
});

// ✅ Hook 2 — beforeEach
// beforeEach hook runs before each test in the suite
parkingPageTest.beforeEach(async ({parkingCostCalculator}) => {
    parkingCostCalculator.goto(); // Ensure we start from the login page before each test
    await expect(parkingCostCalculator.page).toHaveURL(/\/parkcalc/); // Verify we are on the parking cost calculator page
    console.log('Parking Cost Calculator page is loaded');
});

// ✅ Hook 3 — afterEach
// afterEach hook runs after each test in the suite
parkingPageTest.afterEach(async ({parkingCostCalculator}) => {
    await parkingCostCalculator.page.reload(); // Reload the page before each test
    console.log('Parking Cost Calculator page is reloaded for the next test');
});

// ✅ Hook 4 — afterAll
// afterAll hook runs once after all tests in the suite
parkingPageTest.afterAll(async () => {
    console.log('================================================');
    console.log('Parking Cost Calculator Test Suite Completed');
    console.log('================================================');
    if (sharedPage) {
        await sharedPage.close(); // Close the page after all tests are done
    }
});


// =============================================================================================
// Tests
// =============================================================================================


// Test#1 - Empty Credentials (Username only)
parkingPageTest('Scenario 1: Valet Parking (less than 5 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Entry Time: 09:00 AM | Exit Time: 12:00 PM | Expected Cost: $12.00 ($12 for five hours or less)');
    await parkingCostCalculator.calculateParkingCost('Valet Parking', 
                                                     '05/06/2026', '09:00', 'AM',
                                                     '05/06/2026', '12:00', 'PM');
    await expect(parkingCostCalculator.estimatedCostLabel).toBeVisible();
    await expect(parkingCostCalculator.estimatedCostLabel).toHaveText('$ 12.00');
});







}); // End of test suite