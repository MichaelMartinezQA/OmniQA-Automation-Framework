import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Payment Test 01 - Valid payment is successful', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami');
  await homePage.selectDestination('Miami');
  await homePage.selectTravelType('Cruise');
  await homePage.enterEmail('test@example.com');
  await homePage.selectTravelDate('2026-12-15');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResult('Payment successful');
});