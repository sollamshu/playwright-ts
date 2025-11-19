import { test } from '../fixtures/pageFixtures';
import { standardUser } from '../../data/login.data';

test.describe('SauceDemo Login Functionality @ui', () => {

  // Use test.beforeEach to navigate before each test
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('Successful Login with Standard User', async ({ loginPage, inventoryPage }) => {
    test.info().annotations.push({ type: 'story', description: 'B-12345: Successful Login' });
    
    // Use the loginPage fixture
    await loginPage.loginWithCredentials(standardUser.username, standardUser.password);

    // Use the inventoryPage fixture
    await inventoryPage.verifyInventoryPageIsDisplayed();
  });
});