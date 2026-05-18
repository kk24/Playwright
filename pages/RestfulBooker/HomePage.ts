/**
 * Restful Booker — HomePage - Page Object Model - Class 
 * Import: import { RestfulBookerPage } from './RestfulBookerPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class RestfulBookerHomePage {

    // Typed locator properties – defined once, reused everywhere

    // check-in , check-out & search locators
    readonly checkInDateInput: Locator;
    readonly checkOutDateInput: Locator;
    readonly checkAvailabilityButton: Locator;

    // room card locators
    readonly roomCards: Locator;
    readonly roomName: Locator;
    readonly roomPrice: Locator;
    //readonly roomAmenities: Locator;
    //readonly roomImage: Locator;
    readonly bookThisRoomButton: Locator;

    // no rooms available message locator
    readonly noRoomsAvailableMessage: Locator;


    // Initialize locators in the constructor
    constructor(public readonly page: Page) {

        // check-in , check-out & search locators
        this.checkInDateInput = page.locator('#booking .react-datepicker__input-container input').nth(0);
        this.checkOutDateInput = page.locator('#booking .react-datepicker__input-container input').nth(1);
        this.checkAvailabilityButton = page.locator('#booking').getByRole('button', { name: 'Check Availability' });

        // room card locators
        this.roomCards = page.locator('.room-card');
        this.roomName = page.locator('.room-name .card-text');
        this.roomPrice = page.locator('.room-price .fw-bold');
        //this.roomAmenities = page.locator('.room-amenities .badge');
        //this.roomImage = page.locator('.room-image .card-img-top');
        this.bookThisRoomButton = page.locator('.room-card .btn-primary');

        // no rooms available message locator
        this.noRoomsAvailableMessage = page.locator('.no-rooms-message');
    }

    async goto(): Promise<void> {  
        await this.page.goto('./'); // Navigates to the baseURL defined in the config
    }

    async selectDates(checkIn: string, checkOut: string) {
        await this.checkInDateInput.fill(checkIn);
        await this.checkOutDateInput.fill(checkOut);
        await this.checkAvailabilityButton.click();
    }

    async getRoomCount() {
        return await this.roomCards.count(); // Returns the number of room cards displayed
    }
    
    async clickBookNow(index: number) {
        await this.roomCards.nth(index).locator('.btn-primary').click(); // Clicks the "Book This Room" button on the specified room card
    }

    async getRoomName(index: number) {
        return await this.roomCards.nth(index).locator('.card-title').innerText(); // Returns the name of the room from the specified room card
    }

    async getRoomPrice(index: number) {
        return await this.roomCards.nth(index).locator('.fw-bold').innerText(); // Returns the price of the room from the specified room card
    }
  


}