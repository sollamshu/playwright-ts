import { Locator, Page, expect } from '@playwright/test';
import { Logger } from './Logger';

/**
 * BasePage class provides common interaction methods for UI pages.
 * It includes built-in robustness checks (e.g., waiting for elements to be interactable).
 */
export class BasePage {
  readonly page: Page;
  readonly logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Safely clicks an element after ensuring it is visible and enabled.
   * @param locator - The Playwright locator for the element.
   * @param description - A human-readable description of the element for logging.
   * @param timeout - Optional timeout in milliseconds.
   */
  async safeClick(locator: Locator, description: string, timeout = 10000) {
    this.logger.info(`Attempting to click: ${description}`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await expect(locator, `${description} is not interactable`).toBeEnabled({ timeout });
      await locator.click();
      this.logger.info(`Successfully clicked: ${description}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to click ${description}. Error: ${errorMessage}`);
      throw new Error(`Failed to click ${description}: ${errorMessage}`);
    }
  }

  /**
   * Safely fills an input field after ensuring it is visible, enabled, and editable.
   * @param locator - The Playwright locator for the element.
   * @param text - The text to fill into the input.
   * @param description - A human-readable description of the element for logging.
   * @param timeout - Optional timeout in milliseconds.
   */
  async safeFill(locator: Locator, text: string, description: string, timeout = 10000) {
    this.logger.info(`Attempting to fill: ${description} with text: ****`); // Mask sensitive text
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await expect(locator, `${description} is not editable`).toBeEditable({ timeout });
      await locator.fill(text);
      this.logger.info(`Successfully filled: ${description}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fill ${description}. Error: ${errorMessage}`);
      throw new Error(`Failed to fill ${description}: ${errorMessage}`);
    }
  }

  /**
   * Safely selects an option from a dropdown.
   * @param locator - The Playwright locator for the select element.
   * @param option - The value, label, or index of the option to select.
   * @param description - A human-readable description of the element for logging.
   * @param timeout - Optional timeout in milliseconds.
   */
  async safeSelectOption(locator: Locator, option: string | { label: string } | { value: string } | { index: number }, description: string, timeout = 10000) {
    this.logger.info(`Attempting to select option in: ${description}`);
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.selectOption(option);
      this.logger.info(`Successfully selected option in: ${description}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to select option in ${description}. Error: ${errorMessage}`);
      throw new Error(`Failed to select option in ${description}: ${errorMessage}`);
    }
  }

  /**
   * Waits for a specific URL.
   * @param url - The URL (or partial URL/regex) to wait for.
   * @param timeout - Optional timeout in milliseconds.
   */
  async waitForUrl(url: string | RegExp, description: string, timeout = 15000) {
    this.logger.info(`Waiting for URL to be: ${description}`);
    try {
      await this.page.waitForURL(url, { timeout });
      this.logger.info(`URL is now: ${description}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Timeout waiting for URL ${description}. Error: ${errorMessage}`);
      throw new Error(`Timeout waiting for URL ${description}: ${errorMessage}`);
    }
  }

  /**
   * Gets the text content of an element.
   * @param locator - The Playwright locator for the element.
   * @param description - A human-readable description of the element for logging.
   * @returns The text content of the element.
   */
  async getText(locator: Locator, description: string): Promise<string> {
    this.logger.info(`Getting text from: ${description}`);
    try {
      await locator.waitFor({ state: 'attached', timeout: 5000 });
      const text = await locator.textContent();
      if (text === null) {
        throw new Error('Element text content is null.');
      }
      this.logger.info(`Got text: "${text}" from: ${description}`);
      return text;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get text from ${description}. Error: ${errorMessage}`);
      throw new Error(`Failed to get text from ${description}: ${errorMessage}`);
    }
  }
}