import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Payment Test 05 - Payment timeout is handled correctly', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami');
  await homePage.selectDestination('Miami');
  await homePage.selectTravelType('Cruise');
  await homePage.enterEmail('test@example.com');
  await homePage.selectTravelDate('2026-12-15');

  await paymentPage.enterCreditCard('4000000000009995');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResult('Payment timeout. Please try again.');
});