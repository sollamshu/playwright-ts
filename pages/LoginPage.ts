import { Locator, Page } from '@playwright/test';
import { BasePage } from '../utils/BasePage';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.locator(loginLocators.usernameInput);
    this.passwordInput = this.page.locator(loginLocators.passwordInput);
    this.loginButton = this.page.locator(loginLocators.loginButton);
    this.errorMessage = this.page.locator(loginLocators.errorMessage);
  }

  /**
   * Navigates to the login page (root URL).
   */
  async navigateToLogin() {
    this.logger.info('Navigating to login page...');
    await this.page.goto('/');
  }

  /**
   * Fills credentials and clicks the login button.
   * @param username - The username to fill.
   * @param password - The password to fill.
   */
  async loginWithCredentials(username: string, password?: string) {
    this.logger.info(`Attempting login for user: ${username}`);
    await this.safeFill(this.usernameInput, username, 'Username Input');
    if (password) {
      await this.safeFill(this.passwordInput, password, 'Password Input');
    }
    await this.safeClick(this.loginButton, 'Login Button');
  }

  /**
   * Gets the text content of the error message.
   * @returns The error message text.
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage, 'Error Message');
  }
}