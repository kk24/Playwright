/**
 * Restful Booker — ContactPage - Page Object Model - Class 
 * Import: import { RestfulBookerPage } from './RestfulBookerPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class ContactPage {

    // Typed locator properties – defined once, reused everywhere

    // booking details locators
    readonly contactNameInput: Locator;
    readonly contactEmailInput: Locator;
    readonly contactPhoneInput: Locator;
    readonly contactSubjectInput: Locator;
    readonly contactMessageInput: Locator;
    readonly submitContactButton: Locator;
    readonly contactSuccessMessage: Locator;
    
   
    // Initialize locators in the constructor
    constructor(public readonly page: Page) {
        // contact locators
        this.contactNameInput = page.getByTestId('ContactName');
        this.contactEmailInput = page.getByTestId('ContactEmail');
        this.contactPhoneInput = page.getByTestId('ContactPhone');
        this.contactSubjectInput = page.getByTestId('ContactSubject');
        this.contactMessageInput = page.getByTestId('ContactDescription');
        this.submitContactButton = page.getByRole('button', { name: 'Submit' });
        this.contactSuccessMessage = page.locator('div.card-body h3.h4.mb-4');
    }

    // async goto(): Promise<void> {  
    //     await this.page.goto('./'); // Navigates to the baseURL defined in the config
    // }
    async submitContactForm(name: string, email: string, phone: string, subject: string, message: string) {
        await this.contactNameInput.fill(name);
        await this.contactEmailInput.fill(email);
        await this.contactPhoneInput.fill(phone);
        await this.contactSubjectInput.fill(subject);
        await this.contactMessageInput.fill(message);
        await this.submitContactButton.click();
    }

}