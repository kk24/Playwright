  // ------------------------------------------------
    // Guest User – Positive Scenarios
  // ------------------------------------------------

import {restfulBookerE2ETest, expect, Page} from '../../../fixtures'; // Importing the custom fixtures defined in the fixtures file


restfulBookerE2ETest.describe('Restful Booker - Guest User - Positive Scenarios', () => {

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


// =============================================================================================
// Scenario: 1. Guest views available rooms for selected dates
// =============================================================================================

restfulBookerE2ETest('SCN1: Guest views available rooms for selected dates', async ({ homePage, roomPage }) => {
    
    // Step 1: Search for available rooms
    await homePage.selectDates(todayDate, tomorrowDate); // Select check-in and check-out dates
    console.log(`Selected Check-in Date: ${todayDate}, Check-out Date: ${tomorrowDate}`);

    // Step 2: Get the count of available rooms
    const availableRoomsCount = await homePage.getRoomCount();
    //console.log(`Available rooms count: ${availableRoomsCount}`);

    // for (let i = 0; i < availableRoomsCount; i++) {
    //     const roomName = await homePage.getRoomName(i);
    //     const roomPrice = await homePage.getRoomPrice(i);
    //     console.log(`Name - ${roomName}, Price - ${roomPrice}`);
    // }
    
    // Step 2: Verify that available rooms are displayed
    expect(availableRoomsCount).toBeGreaterThan(0); // Assert that at least one room is available

    // // Step 3: Click on the first available room's "Reserve Now" button to view room details
    // await homePage.bookThisRoomButton.first().click();

    // // Step 4: Verify that the room details page is displayed with correct information
    // await expect(roomPage.roomName).toBeVisible();
    // await expect(roomPage.roomPrice).toBeVisible();
});

// =============================================================================================
// Scenario: 2. Guest completes a successful room booking
// =============================================================================================

restfulBookerE2ETest('SCN2: Guest completes a successful room booking', async ({ homePage, roomPage }) => {
    
    // Step 1: Search for available rooms
    await homePage.selectDates(todayDate, tomorrowDate); // Select check-in and check-out dates
    //console.log(`Selected Check-in Date: ${todayDate}, Check-out Date: ${tomorrowDate}`);

    // Step 2: Get the count of available rooms
    const availableRoomsCount = await homePage.getRoomCount();
        
    // Step 3: Click on the first available room's "Reserve Now" button to view room details
    await homePage.clickBookNow(0);

    // Step 4: Verify that the room details page is displayed with correct information
    await expect(roomPage.roomName).toBeVisible();
    const { roomPrice, totalPrice } = await roomPage.getRoomPrices();
    const roomPriceValue = roomPrice.replace('£', '').trim();
    const totalPriceValue = totalPrice.replace('£', '').trim();
    //console.log(`Room Name: ${await roomPage.getRoomName()} with Room Price: ${roomPrice}, Total Price: ${totalPrice} is visible`);

    expect(roomPriceValue).toBe('100');
    expect(totalPriceValue).toBe('140');

    // Step 5: Open the booking form and fill in the details
    await roomPage.openBookingForm();

    // Step 6: Submit the booking form with valid details
    await roomPage.bookRoom('Jane', 'Doe', 'jane.doe@example.com', '123456789991');

    // Step 7: Verify that the booking confirmation message is displayed
    await expect(roomPage.confirmationMessage).toBeVisible();
    await expect(roomPage.confirmationMessage).toHaveText('Booking Confirmed!');


});



}); // End of test suite