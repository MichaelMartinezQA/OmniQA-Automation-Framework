import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly heading: Locator;
  readonly searchField: Locator;
  readonly destination: Locator;
  readonly travelType: Locator;
  readonly email: Locator;
  readonly travelDate: Locator;
  readonly promoCode: Locator;
  readonly searchButton: Locator;

  readonly bookNowButton: Locator;
  readonly bookingResult: Locator;

  readonly results: Locator;
  readonly searchResult: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'OmniQA' });

    this.searchField = page.locator('#search');
    this.destination = page.locator('#destination');
    this.travelType = page.locator('#travelType');
    this.email = page.locator('#email');
    this.travelDate = page.locator('#travelDate');
    this.promoCode = page.locator('#promoCode');
    this.searchButton = page.locator('#searchButton');

    this.bookNowButton = page.locator('#bookNowButton');
    this.bookingResult = page.locator('#bookingResult');

    this.results = page.locator('#results');
    this.searchResult = page.locator('#searchResult');
  }

  async open() {
    await this.page.goto('http://127.0.0.1:3000/');
  }

  async verifyLoaded() {
    await expect(this.page).toHaveTitle(/OmniQA/);
    await expect(this.heading).toBeVisible();
  }

  async enterSearch(text: string) {
    await this.searchField.fill(text);
  }

  async expectSearchValue(value: string) {
    await expect(this.searchField).toHaveValue(value);
  }

  async selectDestination(destination: string) {
    await this.destination.selectOption(destination);
  }

  async expectDestinationVisible() {
    await expect(this.destination).toBeVisible();
  }

  async selectTravelType(type: string) {
    await this.travelType.selectOption(type);
  }

  async enterEmail(email: string) {
    await this.email.fill(email);
  }

  async selectTravelDate(date: string) {
    await this.travelDate.fill(date);
  }

  async enterPromoCode(code: string) {
    await this.promoCode.fill(code);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async expectSearchResult(text: string) {
    await expect(this.searchResult).toHaveText(text);
  }

  async expectSearchResultContains(text: string) {
    await expect(this.searchResult).toContainText(text);
  }

  async expectSearchResultsVisible() {
    await expect(this.results).toBeVisible();
  }

  async expectSearchResultsContain(text: string) {
    await expect(this.results).toContainText(text);
  }

  async expectBookNowVisible() {
    await expect(this.bookNowButton).toBeVisible();
  }

  async clickBookNow() {
    await this.bookNowButton.click();
  }

  async expectBookingResultVisible() {
    await expect(this.bookingResult).toBeVisible();
  }
}