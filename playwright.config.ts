import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';  // Import dotenv to load environment variables

// Load environment variables from the appropriate .env file based on the ENV variable
dotenv.config({ path: `./environments/.env.${process.env.ENV ?? 'uat'}` });

// See https://playwright.dev/docs/test-configuration for more details.
export default defineConfig({
  // global settings for all the tests
  timeout: 30 * 1000, // 30 seconds for each test
  fullyParallel: true, // run tests in parallel
  workers: 2, // number of parallel workers
  retries: 1, // retries for failed tests
  reporter: [
      ['html', { open: 'never' }], // generate HTML report
      ['junit', { outputFile: 'test-results.xml', includeProjectInTestName: true, }] // generate JUnit XML report
  ],
  
  use: {
    headless: true,   // set false if you want to see the browser
    trace: 'retain-on-failure', // collect trace when test fails
    screenshot: 'only-on-failure', // capture screenshot on failure
  },

  // Define projects for different browsers and configurations
  projects: [
      { 
        name: 'Demo-Learn',
        testDir: './scripts/Demo-Learn', 
        use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://www.qaplayground.com'
        } 
      },

      { 
        name: 'Demo-Learn-Firefox',
        testDir: './scripts/Demo-Learn', 
        use: { ...devices['Desktop Firefox'], 
        baseURL: 'https://www.qaplayground.com'
        } 
      },
      
      //
      // ------- Capstone Project 1 - Parking Cost Calculator -------
      // 
      { 
        name: 'CapstoneProject1-ParkingCalculator',
        testDir: './scripts/CapstoneProjects/ParkingCalculator', 
        use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://www.shino.de'
        } 
      },
    
      //
      // ------- Capstone Project 2 -Restful Booker E2E -------
      // 
      { 
        name: 'CapstoneProject2-RestfulBooker',
        testDir: './scripts/CapstoneProjects/RestfulBooker', 
        use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://automationintesting.online'
        } 
      },


      //
      // ------- Capstone Project 3 - GoRest API Suite -------
      // 
      { 
        name: 'CapstoneProject3-GoRest-API-Suite',
        testDir: './scripts/CapstoneProjects/GoRestAPI', 
        fullyParallel: false, // run tests sequentially to maintain state (user creation, update, deletion)
        use: { 
              baseURL: process.env.BASE_URL, // Use environment variable for base URL
              extraHTTPHeaders: {
                'Authorization': `Bearer ${process.env.API_TOKEN}`, // Use environment variable for API token
                'Content-Type': 'application/json'
              }
        } 
      },



    
    ]
});
