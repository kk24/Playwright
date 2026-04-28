/**
 * Day 2 Practice — Locators & Interactions
 * Run: npx playwright test day2_practice.spec.ts --reporter=list
 *
 */

// Import the test and expect functions from Playwright's test module
import { test, expect } from '@playwright/test';


/*
* --- Test Data --- 
*
*/

const formData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567891',
    dob: '1990-01-15',
    gender: 'male'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '9876543210',
    dob: '1990-02-15',
    gender: 'female'
  },
  {
    firstName: 'Jack',
    lastName: 'Doe',
    email: 'jack.doe@example.com',
    phone: '5555555555',
    dob: '1990-03-15',
    gender: 'male'
  }  
];



// Describe groups related tests under a named suite
test.describe('Day 02 – Locators & Interactions', () => {


  /* 
  *  Desc - Test to navigate to form page and assert result
  *  Assertion - The page title should contain "Automate Form Submission" 
  * 
  */
  test('navigate to form page', async ({ page }) => {
    await page.goto('/practice/');
    await page.locator('xpath=//*[@id="practice-card-forms"]/div[3]/span').click();
    await expect(page).toHaveTitle(/Automate Form Submission/);
  });

  /* 
  *  Desc - Test to fill the form page and assert result
  *  Assertion - The page title should contain "Automate Form Submission" 
  * 
  */
  for (const data of formData) {
    test (`fill the form page for ${data.firstName} ${data.lastName}`, async ({ page }) => {
      
      await page.goto('/practice/forms');
      
      // --- Personal Details ---
      await page.locator('[id="firstName"]').fill(data.firstName);
      await page.keyboard.press('Tab');
      await page.locator('[id="lastName"]').fill(data.lastName);
      await page.keyboard.press('Tab');
      await page.locator('[id="email"]').fill(data.email);
      await page.keyboard.press('Tab');
      await page.locator('[id="phone"]').fill(data.phone);
      await page.keyboard.press('Tab');
      // date of birth field
      await page.locator('[id="dob"]').fill(data.dob);
      await page.keyboard.press('Tab');

      // gender
      if (data.gender === "male") {
      await page.locator('[id="gender-male"]').check();
      await page.keyboard.press('Tab');
      } else {
        await page.locator('[id="gender-female"]').check();
        await page.keyboard.press('Tab');
      }


      // --- Address Details ---
      await page.locator('[id="country"]').click();
      await page.getByRole('option', { name: 'India' }).click();
      await page.keyboard.press('Tab');
      await page.locator('[id="city"]').fill('Mumbai');
      await page.keyboard.press('Tab');
      await page.locator('[id="bio"]').fill('Something Soemething');
      await page.keyboard.press('Tab');

      // --- Interests ---
      await page.locator('[id="interest-playwright"]').check();
      await page.keyboard.press('Tab');

      // --- Account Details ---
      await page.locator('[id="password"]').fill('johndoe123');
      await page.keyboard.press('Tab');
      await page.locator('[id="confirmPassword"]').fill('johndoe123');
      await page.keyboard.press('Tab');

      // --- Terms ---
      await page.locator('[id="terms"]').check();

      // --- Submit ---
      await page.locator('[id="submitFormBtn"]').click();

      // -- Assertions ---
      await expect(page.locator('[id="formSuccessMsg"]')).toBeVisible();
      await expect(page.locator('xpath=//*[@id="formSuccessMsg"]/h3')).toHaveText(/Successfully!/);
      // await expect(page.locator('[id="submittedName"]')).toHaveText('John Doe');
      await expect(page.locator('[id="submittedName"]')).toHaveText(`${data.firstName} ${data.lastName}`);
      await expect(page.locator('[id="resetFormBtn"]')).toBeVisible();

    });
  }  // for-loop ends here

});