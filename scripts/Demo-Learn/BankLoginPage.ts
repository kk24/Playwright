/**
 * Day 4 Practice — Page Object Model - Class 
 * Import: import { BankLoginPage } from './BankLoginPage';
 *
 */

import { Page, Locator } from '@playwright/test';


export class BankLoginPage {

    // Typed locator properties – defined once, reused everywhere
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly userNameErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;
    readonly alertMessage: Locator;


    constructor(private readonly page: Page) {
        this.usernameInput = page.locator('[id="username"]');
        this.passwordInput = page.locator('[id="password"]');
        this.loginButton = page.locator('button[type="submit"]');

        this.userNameErrorMessage = page.locator('[id="username-error"]');
        this.passwordErrorMessage = page.locator('[id="password-error"]');
        this.alertMessage = page.locator('[id="login-alert"]');
 

    }

    async goto(): Promise<void> {  
        await this.page.goto('/bank');
    }

    // Method to perform login action
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}