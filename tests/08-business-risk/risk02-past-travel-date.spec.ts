import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { PromoPage } from '../../pages/PromoPage';

test('Business Risk 02 - Prevent booking with past travel date', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const promoPage = new PromoPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami Cruise');
  await homePage.enterEmail('test@test.com');
  await homePage.selectTravelDate('2024-01-01');

  await promoPage.enterPromoCode('SAVE10');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await expect(homePage.searchResult).not.toHaveText('Searching for: Miami Cruise');
});