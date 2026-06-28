import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { PromoPage } from '../../pages/PromoPage';

test('Promo Test 01 - Valid promo code applies discount', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const promoPage = new PromoPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami');
  await homePage.selectDestination('Miami');
  await homePage.selectTravelType('Cruise');
  await homePage.enterEmail('test@example.com');
  await homePage.selectTravelDate('2026-12-15');

  await promoPage.enterPromoCode('SAVE10');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await promoPage.expectPromoResult('Promo code applied: 10% discount');
});