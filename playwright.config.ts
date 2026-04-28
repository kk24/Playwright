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

//testDir: './scripts/typescript',
//baseURL: 'https://www.qaplayground.com' // baseURL for relative paths in tests
 
  projects: [
      { 
        name: 'Demo-Learn',
        testDir: './scripts/typescript', 
        use: { ...devices['Desktop Chrome'], } 
      },

      // { name: 'firefox',  
      //   use: { ...devices['Desktop Firefox'], } 
      // },
    ]
});
