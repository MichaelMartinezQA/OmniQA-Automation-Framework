import { expect, Locator, Page } from '@playwright/test';

export class PromoPage {
  readonly page: Page;

  readonly promoCode: Locator;
  readonly promoResult: Locator;

  constructor(page: Page) {
    this.page = page;

    this.promoCode = page.locator('#promoCode');
    this.promoResult = page.locator('#promoResult');
  }

  async enterPromoCode(code: string) {
    await this.promoCode.fill(code);
  }

  async expectPromoResult(text: string) {
    await expect(this.promoResult).toHaveText(text);
  }

  async expectPromoResultContains(text: string) {
    await expect(this.promoResult).toContainText(text);
  }
}