/**
 * Parking Cost Calculator — Page Object Model - Class 
 * Import: import { ParkingCostCalculatorPage } from './ParkingCostCalculatorPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class ParkingCostCalculatorPage {

    // Typed locator properties – defined once, reused everywhere

    // parking lot dropdown locator
    readonly parkingLotDropDown: Locator;
    
    // entry date and time locators
    readonly entryDateInput: Locator;
    readonly entryTimeInput: Locator;
    readonly entryAmPmRadioBtn  : (amPm: 'AM' | 'PM') => Locator;

    // leaving date and time locators
    readonly leavingDateInput: Locator;
    readonly leavingTimeInput: Locator;
    readonly leavingAmPmRadioBtn  : (amPm: 'AM' | 'PM') => Locator;
    
    // result label locator
    readonly resultLabel: Locator;

    // calculate button locator
    readonly calculateButton: Locator;




    // Initialize locators in the constructor
    constructor(public readonly page: Page) {

        // parking lot dropdown locator
        this.parkingLotDropDown = page.locator('#ParkingLot') 
          
        // entry date, time & AM/PM locators
        this.entryDateInput = page.locator('#StartingDate');
        this.entryTimeInput = page.locator('#StartingTime');
        this.entryAmPmRadioBtn = (amPm) => page.locator(`input[name="StartingTimeAMPM"][value="${amPm}"]`);

        // leaving date and time locators
        this.leavingDateInput = page.locator('#LeavingDate');
        this.leavingTimeInput = page.locator('#LeavingTime');
        this.leavingAmPmRadioBtn = (amPm) => page.locator(`input[name="LeavingTimeAMPM"][value="${amPm}"]`);
        
        // estimated parking cost, calculate button and error message locators
        this.calculateButton = page.getByRole('button', { name: 'Calculate' });
        this.resultLabel = page.locator('td.SubHead b');
        //this.errorMessage = page.locator('[xpath="/html/body/form/table/tbody/tr[4]/td[2]/b"]');

    }

    async goto(): Promise<void> {  
        await this.page.goto('/parkcalc/'); // Navigates to the baseURL defined in the config
    }

    // Method to perform calculation action
    async calculateParkingCost(parkingLot: string, 
                entryDate: string,  // format: MM/DD/YYYY
                entryTime: string,  // format: HH:MM
                entryAmPm: 'AM' | 'PM',
                leavingDate: string,  // format: MM/DD/YYYY
                leavingTime: string,  // format: HH:MM
                leavingAmPm: 'AM' | 'PM'
            ): Promise<void> {
        
        await this.parkingLotDropDown.selectOption(parkingLot);
        await this.entryDateInput.fill(entryDate);
        await this.entryTimeInput.fill(entryTime);
        await this.entryAmPmRadioBtn(entryAmPm).click(); 

        await this.leavingDateInput.fill(leavingDate);
        await this.leavingTimeInput.fill(leavingTime);
        await this.leavingAmPmRadioBtn(leavingAmPm).click();

        await this.calculateButton.click();
    }

}