import { defineConfig, devices, firefox } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
 
  projects: [
        {
          name : 'chromium',
          use : {...devices['Desktop Chrome'],headless : false}
        }
        // {
        //   name : 'firefox',
        //   use :{...devices['Desktop Firefox']}
        // }


    ]
    
  
});

