import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Negative Test 04 - Credit card is required', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami Cruise');
  await homePage.enterEmail('test@test.com');
  await homePage.selectTravelDate('2026-12-25');
  await homePage.enterPromoCode('SAVE10');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Credit Card is required');
});