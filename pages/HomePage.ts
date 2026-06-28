import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchField: Locator;
  readonly destination: Locator;
  readonly travelType: Locator;
  readonly email: Locator;
  readonly travelDate: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'OmniQA' });
    this.searchField = page.locator('#search');
    this.destination = page.locator('#destination');
    this.travelType = page.locator('#travelType');
    this.email = page.locator('#email');
    this.travelDate = page.locator('#travelDate');
    this.searchButton = page.locator('#searchButton');
  }

  async open() {
    await this.page.goto('http://127.0.0.1:3000/');
  }

  async verifyLoaded() {
    await expect(this.page).toHaveTitle(/OmniQA/);
    await expect(this.heading).toBeVisible();
  }
}