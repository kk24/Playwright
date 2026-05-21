  // ------------------------------------------------
    // Negative Scenarios (Guest)
  // ------------------------------------------------

import {restfulBookerE2ETest, expect, Page} from '../../../fixtures'; // Importing the custom fixtures defined in the fixtures file


restfulBookerE2ETest.describe('Restful Booker - Negative Scenarios (Guest)', () => {

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
// Scenario: 7. Guest cannot book a room with invalid or missing details
// =============================================================================================

const invalidBookingData = [
  { firstname: '',     lastname: 'Doe',   email: 'john@example.com', phone: '01234567890', missingField: 'firstname' },
  { firstname: 'John', lastname: '',      email: 'john@example.com', phone: '01234567890', missingField: 'lastname'  },
  { firstname: 'John', lastname: 'Doe',   email: '',                 phone: '01234567890', missingField: 'email'     },
  { firstname: 'John', lastname: 'Doe',   email: 'john@example.com', phone: '',            missingField: 'phone'     },
];

invalidBookingData.forEach(({ firstname, lastname, email, phone, missingField }) => {
  restfulBookerE2ETest(`SCN7: Guest cannot book a room with missing ${missingField} details` , 
    async ({ homePage, roomPage }) => {
      await homePage.goto();
      await homePage.clickBookNow(0);
      await expect(roomPage.roomName).toBeVisible();
      const { roomPrice, totalPrice } = await roomPage.getRoomPrices();
      const roomPriceValue = roomPrice.replace('£', '').trim();
      const totalPriceValue = totalPrice.replace('£', '').trim();

      expect(roomPriceValue).toBe('100');
      expect(totalPriceValue).toBe('140');

      await roomPage.openBookingForm();

      await roomPage.bookRoom(firstname, lastname, email, phone);
      await expect(roomPage.validationMessage).toBeVisible();
  });
});


// =============================================================================================
// Scenario: 8. Guest cannot search with an invalid date range
// =============================================================================================

restfulBookerE2ETest('SCN8: Guest cannot search with an invalid date range', async ({ homePage }) => {
    
    // Step 1: Search for available rooms (invalid date range)
    await homePage.selectDates(tomorrowDate, todayDate); // Select check-in and check-out dates
    console.log(`Selected Check-in Date: ${tomorrowDate}, Check-out Date: ${todayDate}`);

    // Step 2: Get the count of available rooms
    const availableRoomsCount = await homePage.getRoomCount();
    //console.log(`Available rooms count: ${availableRoomsCount}`);

    // Step 2: Verify that available rooms are displayed
    expect(availableRoomsCount).toBe(0); // Assert that no rooms are available

});


// =============================================================================================
// Scenario: 9. Guest cannot submit a contact form with missing required fields
// =============================================================================================

const invalidContactData = [
  { name: '',     email: 'john@example.com', phone: '01234567890', subject: 'Test Subject',  message: 'This is a test message.', missingField: 'firstname'  },
  { name: 'John', email: '',                 phone: '01234567890', subject: 'Test Subject',  message: 'This is a test message.', missingField: 'email'      },
  { name: 'John', email: 'john@example.com', phone: '',            subject: 'Test Subject',  message: 'This is a test message.', missingField: 'phone'      },
  { name: 'John', email: 'john@example.com', phone: '01234567890', subject: '',              message: 'This is a test message.', missingField: 'subject'    },
  { name: 'John', email: 'john@example.com', phone: '01234567890', subject: 'Test Subject',  message: '',                        missingField: 'message'    },
];

invalidContactData.forEach(({ name, email, phone, subject, message, missingField }) => {
  restfulBookerE2ETest(`SCN9: Guest cannot submit a contact form with missing ${missingField} details`, async ({ homePage, contactPage }) => {
    
    // Step 1: navigate to the contact section and submit a valid message
    await homePage.goToContactSection();

    // Step 2: verify the contact form is visible and submit with valid details
    await expect(contactPage.contactFormTitle).toBeVisible();
    
    // Step 3: Submit the contact form with valid details
    await contactPage.submitContactForm(name, email, phone, subject, message);

    // Step 4: Verify that the validation message is displayed
    await expect(contactPage.contactValidationMessage).toBeVisible();

  });

});






}); // End of test suite