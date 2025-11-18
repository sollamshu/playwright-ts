import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { UserEndpoints } from '../../api/UserEndpoints';

// Define the types for
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  userEndpoints: UserEndpoints;
};

/**
 * Extends the base Playwright `test` object with Page Object fixtures.
 * This allows tests to receive initialized Page Objects as parameters,
 * adhering to Dependency Injection and making tests cleaner.
 */
export const test = base.extend<MyFixtures>({
  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    // Initialize the page object
    const loginPage = new LoginPage(page);
    // Yield the fixture value to the test
    await use(loginPage);
    // Teardown logic can go here (if any)
  },

  // Fixture for InventoryPage
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Fixture for API Endpoint class
  userEndpoints: async ({ request }, use) => {
    // Note: This uses 'request' (APIRequestContext) instead of 'page'
    const userEndpoints = new UserEndpoints(request);
    await use(userEndpoints);
  },
});

export { expect } from '@playwright/test';