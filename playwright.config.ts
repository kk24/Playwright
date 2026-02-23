import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /* use: {
  //   headless: true,   // set false if you want to see the browser
   }, */
  projects: [
      { name: 'chromium', use: { ...devices['Desktop Chrome'], headless: true } },
     /* { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },*/
    ],
});
