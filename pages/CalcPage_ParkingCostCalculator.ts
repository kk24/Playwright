/**
 * Parking Cost Calculator — Page Object Model - Class 
 * Import: import { ParkingCostCalculatorPage } from './ParkingCostCalculatorPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class ParkingCostCalculatorPage {

    // Typed locator properties – defined once, reused everywhere
    readonly parkingLotDropDown: Locator;
    
    // entry date and time locators
    readonly entryDateInput: Locator;
    readonly entryTimeInput: Locator;
    readonly entryAMRadioBtn: Locator;
    readonly entryPMRadioBtn: Locator;

    // leaving date and time locators
    readonly leavingDateInput: Locator;
    readonly leavingTimeInput: Locator;
    readonly leavingAMRadioBtn: Locator;
    readonly leavingPMRadioBtn: Locator;

    
    // estimated parking cost locator
    readonly estimatedCostLabel: Locator;

    // calculate button locator
    readonly calculateButton: Locator;

    // error message locators
    readonly errorMessage: Locator


    constructor(public readonly page: Page) {
        this.parkingLotDropDown = page.locator('[id="ParkingLot"]');
        
        this.entryDateInput = page.locator('[id="StartingDate"]');
        this.entryTimeInput = page.locator('[id="StartingTime"]');
        this.entryAMRadioBtn = page.locator('input[name="StartingTimeAMPM"][value="AM"]');
        this.entryPMRadioBtn = page.locator('input[name="StartingTimeAMPM"][value="PM"]');

        this.leavingDateInput = page.locator('[id="leaving-date"]');
        this.leavingTimeInput = page.locator('[id="leaving-time"]');
        this.leavingAMRadioBtn = page.locator('input[name="LeavingTimeAMPM"][value="AM"]');
        this.leavingPMRadioBtn = page.locator('input[name="LeavingTimeAMPM"][value="PM"]');
        
        this.estimatedCostLabel = page.locator('[id="estimated-cost"]');
        this.calculateButton = page.locator('[id="calculate-btn"]');
        this.errorMessage = page.locator('[id="error-message"]');



    }

    async goto(): Promise<void> {  
        await this.page.goto('/'); // Navigates to the baseURL defined in the config
    }

    // Method to perform login action
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Method to clear the input fields
    async clearFields() {
        await this.clearButton.click();
    }

}