import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from default ".env" file.
dotenv.config();

// Define shared storage state path
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.SAUCE_URL || 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // UI Tests Project
    {
      name: 'chromium-ui',
      testMatch: /.*\.spec\.ts/,
      grep: /@ui/,
      use: {
        ...devices['Desktop Chrome'],
        // Use global setup to run auth.
        // storageState: STORAGE_STATE, // We can use this if we have a global auth setup
      },
      // dependencies: ['setup'], // Uncomment if using global setup
    },

    // API Tests Project
    {
      name: 'api',
      testMatch: /.*\.spec\.ts/,
      grep: /@api/,
      use: {
        // Configure APIRequestContext for API tests
        baseURL: process.env.REQRES_URL || 'https://reqres.in',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(process.env.REQRES_API_KEY && { 'x-api-key': process.env.REQRES_API_KEY }),
          // 'Authorization': `Bearer ${process.env.API_TOKEN}`, // Example for token auth
        },
      },
    },

    // Optional: Global setup for authentication
    // {
    //   name: 'setup',
    //   testMatch: /global\.setup\.ts/,
    //   teardown: 'global.teardown',
    // },
    // {
    //   name: 'global.teardown',
    //   testMatch: /global\.teardown\.ts/,
    //   use: {
    //     storageState: STORAGE_STATE,
    //   },
    // },
  ],
});