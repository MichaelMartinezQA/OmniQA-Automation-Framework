import { expect, Locator, Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;

  readonly creditCard: Locator;
  readonly expirationDate: Locator;
  readonly cvv: Locator;
  readonly paymentButton: Locator;
  readonly paymentResult: Locator;

  constructor(page: Page) {
    this.page = page;

    this.creditCard = page.locator('#creditCard');
    this.expirationDate = page.locator('#expirationDate');
    this.cvv = page.locator('#cvv');
    this.paymentButton = page.locator('#paymentButton');
    this.paymentResult = page.locator('#paymentResult');
  }

  async enterCreditCard(number: string) {
    await this.creditCard.fill(number);
  }

  async enterExpirationDate(date: string) {
    await this.expirationDate.fill(date);
  }

  async enterCVV(code: string) {
    await this.cvv.fill(code);
  }

  async clickPayment() {
    await this.paymentButton.click();
  }

  async expectPaymentSuccessful() {
    await expect(this.paymentResult).toBeVisible();
  }

  async expectPaymentResult(text: string) {
    await expect(this.paymentResult).toHaveText(text);
  }

  async expectPaymentResultContains(text: string) {
    await expect(this.paymentResult).toContainText(text);
  }
}