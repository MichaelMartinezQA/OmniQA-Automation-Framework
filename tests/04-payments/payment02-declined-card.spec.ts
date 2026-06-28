import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Payment Test 02 - Declined card is rejected', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami');
  await homePage.selectDestination('Miami');
  await homePage.selectTravelType('Cruise');
  await homePage.enterEmail('test@example.com');
  await homePage.selectTravelDate('2026-12-15');

  await paymentPage.enterCreditCard('4000000000000002');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResult('Payment declined');
});