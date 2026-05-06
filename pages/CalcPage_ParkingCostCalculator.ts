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
    
    // estimated parking cost locator
    readonly estimatedCostLabel: Locator;

    // calculate button locator
    readonly calculateButton: Locator;

    // error message locators
    readonly errorMessage: Locator


    // Initialize locators in the constructor
    constructor(public readonly page: Page) {

        // parking lot dropdown locator
        this.parkingLotDropDown = page.getByRole('combobox', { name: 'parkingLot' }); 
          
        // entry date, time & AM/PM locators
        this.entryDateInput = page.getByRole('textbox', { name: 'StartingDate' }); 
        this.entryTimeInput = page.getByRole('textbox', { name: 'StartingTime' });
        this.entryAmPmRadioBtn = (amPm) => page.locator(`input[name="StartingTimeAMPM"][value="${amPm}"]`);

        // leaving date and time locators
        this.leavingDateInput = page.getByRole('textbox', { name: 'LeavingDate' });
        this.leavingTimeInput = page.getByRole('textbox', { name: 'LeavingTime' });
        this.leavingAmPmRadioBtn = (amPm) => page.locator(`input[name="LeavingTimeAMPM"][value="${amPm}"]`);
        
        // estimated parking cost, calculate button and error message locators
        this.calculateButton = page.locator('[id="calculateCost"]');
        this.estimatedCostLabel = page.locator('[xpath="/html/body/form/table/tbody/tr[4]/td[2]/span[1]/b"]');
        this.errorMessage = page.locator('[xpath="/html/body/form/table/tbody/tr[4]/td[2]/b"]');

    }

    async goto(): Promise<void> {  
        await this.page.goto('/'); // Navigates to the baseURL defined in the config
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