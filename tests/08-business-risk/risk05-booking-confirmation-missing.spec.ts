import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { PromoPage } from '../../pages/PromoPage';
import { BookingPage } from '../../pages/BookingPage';

test('Business Risk 05 - Booking confirmation displays after successful booking', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const promoPage = new PromoPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami Cruise');
  await homePage.enterEmail('test@test.com');
  await homePage.selectTravelDate('2026-12-25');

  await promoPage.enterPromoCode('SAVE10');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResult('Payment successful');

  await bookingPage.clickBookNow();
  await bookingPage.expectBookingResult('Booking confirmed');
});