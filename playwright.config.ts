import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // global settings for all the tests
  timeout: 30 * 1000, // 30 seconds for each test
  retries: 1, // retries for failed tests
  reporter: 'html', // generate HTML report
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

      // { 
      //   name: 'Demo-Learn-Firefox',
      //   testDir: './scripts/Demo-Learn', 
      //   use: { ...devices['Desktop Firefox'], 
      //   baseURL: 'https://www.qaplayground.com'
      //   } 
      // },
      
      { 
        name: 'CapstoneProject1-ParkingCalculator',
        testDir: './scripts/CapstoneProjects/ParkingCalculator', 
        use: { ...devices['Desktop Chrome'], 
        baseURL: 'https://www.shino.de/parkcalc'
        } 
      },
    


    ]
});
