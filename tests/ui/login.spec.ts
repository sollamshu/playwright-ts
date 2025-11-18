import { test, expect } from '../fixtures/pageFixtures';
import { standardUser, lockedOutUser } from '../../data/login.data';

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

  /*test('Failed Login with Locked Out User', async ({ loginPage }) => {
    test.info().annotations.push({ type: 'story', description: 'B-12346: Locked User Error' });

    await loginPage.loginWithCredentials(lockedOutUser.username, lockedOutUser.password);

    // Verify the error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(lockedOutUser.expectedError);
  });

  test('Failed Login with Invalid Password', async ({ loginPage }) => {
    test.info().annotations.push({ type: 'story', description: 'B-12347: Invalid Password Error' });

    await loginPage.loginWithCredentials(standardUser.username, 'wrongpassword');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });*/
});