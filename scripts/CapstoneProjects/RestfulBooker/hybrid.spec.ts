  // ------------------------------------------------
    // API + UI Hybrid Scenarios
  // ------------------------------------------------

import {restfulBookerE2ETest, expect, Page} from '../../../fixtures'; // Importing the custom fixtures defined in the fixtures file


restfulBookerE2ETest.describe('Restful Booker - API + UI Hybrid Scenarios', () => {

// =============================================================================================
// Current / Current + 1   Date - Utility Function
// =============================================================================================
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const todayDate = [
  String(today.getDate()).padStart(2, "0"),
  String(today.getMonth() + 1).padStart(2, "0"),
  today.getFullYear()
].join("/");

const tomorrowDate = [
  String(tomorrow.getDate()).padStart(2, "0"),
  String(tomorrow.getMonth() + 1).padStart(2, "0"),
  tomorrow.getFullYear()
].join("/");


// -------------------------------------------------------
// Scenario 5 — Room availability service returns empty results
// -------------------------------------------------------

restfulBookerE2ETest('SCN5: Room availability service returns empty results', async ({ page, homePage }) => {

  // Intercept the rooms API before navigating
  // page.route() must be set up BEFORE the action that triggers the network call
  await page.route('**/api/room/**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ rooms: [] }) // mock empty response
    });
  });

  await homePage.goto();
  await homePage.selectDates(todayDate, tomorrowDate);
  console.log(`Selected Check-in Date: ${todayDate}, Check-out Date: ${tomorrowDate}`);
  const availableRoomsCount = await homePage.getRoomCount();
  expect(availableRoomsCount).toEqual(0); // Assert that at least one room is available
});


// -------------------------------------------------------
// Scenario: 6. Booking conflicts are prevented for already-booked rooms
// -------------------------------------------------------

restfulBookerE2ETest('SCN6: Booking conflicts are prevented for already-booked rooms', async ({ homePage, apiRequest }) => {

  // Step 1 — use API to create a booking, bypassing the UI
  // This is faster and more reliable than clicking through the UI to set up state
  const response = await apiRequest.post('/api/booking', {
    data: {
      roomid: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      phone: '01234567890',
      bookingdates: {
        checkin: todayDate,
        checkout: tomorrowDate
      }
    }
  });

  // Assert API call succeeded before proceeding to UI
  expect(response.status()).toBe(201);

  // Extract booking ID for cleanup later
  const booking = await response.json();
  const bookingId = booking.bookingid;

  // Step 2 — now verify UI reflects the conflict
  await homePage.goto();
  await homePage.selectDates(todayDate, tomorrowDate); // overlapping dates

  const roomCount = await homePage.getRoomCount();
  expect(roomCount).toBe(0);

  // Step 3 — cleanup: delete the booking via API after test
  // Important: always clean up API-created data so tests don't affect each other
  await apiRequest.delete(`/api/booking/${bookingId}`);
});




}); // End of test suite