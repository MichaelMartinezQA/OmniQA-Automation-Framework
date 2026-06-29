import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Reservation 15 - Seasonal Pricing Validation', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await expect(page.locator('#priceDisplay'))
    .toContainText('$1000');

  await homePage.enterEmail('pricing@test.com');
  await homePage.selectTravelDate('2027-12-20');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await expect(page.locator('#priceDisplay'))
    .toContainText('$1000');
});