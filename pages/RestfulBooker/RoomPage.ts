/**
 * Restful Booker — RoomPage - Page Object Model - Class 
 * Import: import { RestfulBookerPage } from './RestfulBookerPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class RestfulBookerRoomPage {

    // Typed locator properties – defined once, reused everywhere

    // room details locator
    readonly roomName: Locator;
    readonly roomPrice: Locator;
    readonly totalPrice: Locator;
    readonly openBookingFormButton : Locator;
    // readonly calendarNextButton: Locator;
    // readonly calendarPrevButton: Locator;

    // booking details locators
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly submitBookingButton : Locator;
    readonly cancelButton: Locator;    
    readonly confirmationMessage: Locator;


    // Initialize locators in the constructor
    constructor(public readonly page: Page) {

        // room details locator
        this.roomName = page.locator('h1.fw-bold');
        this.roomPrice = page.locator('span.fs-2.fw-bold');
        this.totalPrice = page.locator('div.fw-bold span').last();
        this.openBookingFormButton = page.getByRole('button', { name: 'Reserve Now' }).nth(0);
        // this.calendarNextButton = page.locator('.react-datepicker__navigation--next');
        // this.calendarPrevButton = page.locator('.react-datepicker__navigation--previous');

        // booking details locators
        this.firstNameInput = page.getByPlaceholder('Firstname');
        this.lastNameInput = page.getByPlaceholder('Lastname');
        this.emailInput = page.getByPlaceholder('Email');
        this.phoneInput = page.getByPlaceholder('Phone');
        this.submitBookingButton = page.getByRole('button', { name: 'Reserve Now' }).nth(1);
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.confirmationMessage = page.locator('div.card-body h2.card-title');
    }

    // async goto(): Promise<void> {  
    //     await this.page.goto('./'); // Navigates to the baseURL defined in the config
    // }

    async openBookingForm() {
        await this.openBookingFormButton.click();  // Clicks the "Reserve Now" button to open the booking form
    }

    async bookRoom(FName: string, LName: string, email: string, phone: string) {
        await this.firstNameInput.fill(FName); // Fills in the first name
        await this.lastNameInput.fill(LName); // Fills in the last name
        await this.emailInput.fill(email); // Fills in the email
        await this.phoneInput.fill(phone); // Fills in the phone number
        await this.submitBookingButton.click(); // Clicks the "Reserve Now" button to submit the booking
    }

}