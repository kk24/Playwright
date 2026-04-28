import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scripts/typescript',
  reporter: 'html',
  use: {
    headless: true,   // set false if you want to see the browser
    baseURL: 'https://www.qaplayground.com' // baseURL for relative paths in tests
   }, 

  projects: [
      { name: 'chromium', 
        use: { ...devices['Desktop Chrome'], } 
      },

      // { name: 'firefox',  
      //   use: { ...devices['Desktop Firefox'], } 
      // },
    ]
});
