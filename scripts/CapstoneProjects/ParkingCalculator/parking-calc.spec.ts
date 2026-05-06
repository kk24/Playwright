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
    console.log('================================================\n');
});

// ✅ Hook 2 — beforeEach
// beforeEach hook runs before each test in the suite
parkingPageTest.beforeEach(async ({parkingCostCalculator}) => {
    parkingCostCalculator.goto(); // Ensure we start from the login page before each test
    await expect(parkingCostCalculator.page).toHaveURL(/\/parkcalc/); // Verify we are on the parking cost calculator page
    console.log('Parking Cost Calculator page is loaded\n');
});

// ✅ Hook 3 — afterEach
// afterEach hook runs after each test in the suite
parkingPageTest.afterEach(async ({parkingCostCalculator}) => {
    await parkingCostCalculator.page.reload(); // Reload the page before each test
    console.log('Parking Cost Calculator page is reloaded for the next test\n');
});

// ✅ Hook 4 — afterAll
// afterAll hook runs once after all tests in the suite
parkingPageTest.afterAll(async () => {
    console.log('================================================');
    console.log('Parking Cost Calculator Test Suite Completed');
    console.log('================================================\n');
    if (sharedPage) {
        await sharedPage.close(); // Close the page after all tests are done
    }
});

// =============================================================================================
// Current / Current + 1   Date - Utility Function
// =============================================================================================
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formattedDate = [
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
  today.getFullYear()
].join("/");

const formattedTomorrow = [
  String(tomorrow.getMonth() + 1).padStart(2, "0"),
  String(tomorrow.getDate()).padStart(2, "0"),
  tomorrow.getFullYear()
].join("/");


// =============================================================================================
// Test Scenarios
// =============================================================================================


// Scenario 1: Valet Parking (less than 5 hours)
parkingPageTest('Scenario 1: Valet Parking (less than 5 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 1: Valet Parking (less than 5 hours) | Entry Time: 09:00 AM | Exit Time: 12:00 PM | Expected Cost: $12.00 \n');
    await parkingCostCalculator.calculateParkingCost('Valet Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedDate, '12:00', 'PM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 12.00');
});

// Scenario 2: Valet Parking (more than 5 hours)
parkingPageTest('Scenario 2: Valet Parking (more than 5 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 2: Valet Parking (more than 5 hours) | Entry Time: 09:00 AM | Exit Time: 03:00 PM | Expected Cost: $18.00 \n');
    await parkingCostCalculator.calculateParkingCost('Valet Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedDate, '03:00', 'PM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 18.00');
});

// Scenario 3: Valet Parking (Overnight)
parkingPageTest('Scenario 3: Valet Parking (Overnight)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 3: Valet Parking (Overnight) | Entry Time: 10:00 PM | Exit Time: 08:00 AM (next day) | Expected Cost: $18.00 \n');
    await parkingCostCalculator.calculateParkingCost('Valet Parking', 
                                                     formattedDate, '10:00', 'PM',
                                                     formattedTomorrow, '08:00', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 18.00');
});

// Scenario 4: Valet Parking - Invalid Input (Exit Before Entry)
parkingPageTest('Scenario 4: Valet Parking - Invalid Input (Exit Before Entry)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 4: Valet Parking - Invalid Input (Exit Before Entry) | Entry Time: 05:00 PM | Exit Time: 02:00 PM | Expected Cost: $0.00 \n');
    await parkingCostCalculator.calculateParkingCost('Valet Parking', 
                                                     formattedDate, '05:00', 'PM',
                                                     formattedDate, '02:00', 'PM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 0.00');
});

// Scenario 5: Short-term Parking (1 hour)
parkingPageTest('Scenario 5: Short-term Parking (1 hour)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 5: Short-term Parking (1 hour) | Entry Time: 09:00 AM | Exit Time: 10:00 AM | Expected Cost: $2.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedDate, '10:00', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 2.00');
});

// Scenario 6: Short-term Parking (1.5 hours)
parkingPageTest('Scenario 6: Short-term Parking (1.5 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 6: Short-term Parking (1.5 hours) | Entry Time: 09:00 AM | Exit Time: 10:30 AM | Expected Cost: $3.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedDate, '10:30', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 3.00');
});

// Scenario 7: Short-term Parking (2 hours)
parkingPageTest('Scenario 7: Short-term Parking (2 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 7: Short-term Parking (2 hours) | Entry Time: 09:00 AM | Exit Time: 11:00 AM | Expected Cost: $4.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedDate, '11:00', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 4.00');
});

// Scenario 8: Short-term Parking (Overnight but < 24 hours)
parkingPageTest('Scenario 8: Short-term Parking (Overnight but < 24 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 8: Short-term Parking (Overnight but < 24 hours) | Entry Time: 10:00 PM | Exit Time: 08:00 AM | Expected Cost: $20.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '10:00', 'PM',
                                                     formattedTomorrow, '08:00', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 20.00');
});

// Scenario 9: Short-term Parking (Overnight but = 24 hours)
parkingPageTest('Scenario 9: Short-term Parking (Overnight but = 24 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 9: Short-term Parking (Overnight but = 24 hours) | Entry Time: 09:00 AM | Exit Time: 09:00 AM | Expected Cost: $24.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedTomorrow, '09:00', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 24.00');
});

// Scenario 10: Short-term Parking (Overnight but > 24 hours ~ 25.5 hours)
parkingPageTest('Scenario 10: Short-term Parking (Overnight but > 24 hours ~ 25.5 hours)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 10: Short-term Parking (Overnight but > 24 hours ~ 25.5 hours) | Entry Time: 09:00 AM | Exit Time: 10:30 AM | Expected Cost: $27.00 \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '09:00', 'AM',
                                                     formattedTomorrow, '10:30', 'AM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText('$ 27.00');
});

// Scenario 11: Invalid Input (Exit Before Entry)
parkingPageTest('Scenario 11: Invalid Input (Exit Before Entry)', async ({ parkingCostCalculator }) => {
    //await parkingCostCalculator.goto();
    console.log('Scenario 11: Invalid Input (Exit Before Entry) | Entry Time: 05:00 PM | Exit Time: 02:00 PM | Expected Cost: ERROR! \n');
    await parkingCostCalculator.calculateParkingCost('Short-Term Parking', 
                                                     formattedDate, '05:00', 'PM',
                                                     formattedDate, '02:00', 'PM');
    await expect(parkingCostCalculator.resultLabel).toBeVisible();
    await expect(parkingCostCalculator.resultLabel).toHaveText(/ERROR!/);
});


}); // End of test suite