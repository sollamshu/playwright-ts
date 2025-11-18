import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../utils/BasePage';
import { inventoryLocators } from '../locators/inventoryLocators';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator(inventoryLocators.pageTitle);
    this.inventoryList = this.page.locator(inventoryLocators.inventoryList);
  }

  /**
   * Verifies that the Inventory page is displayed by checking the URL
   * and the visibility of the inventory list.
   */
  async verifyInventoryPageIsDisplayed() {
    this.logger.info('Verifying inventory page is displayed...');
    await this.waitForUrl(/\/inventory\.html/, 'Inventory Page URL');
    await expect(this.inventoryList, 'Inventory list should be visible').toBeVisible();
    await expect(this.pageTitle, 'Page title should be "Products"').toHaveText('Products');
    this.logger.info('Inventory page verified.');
  }
}