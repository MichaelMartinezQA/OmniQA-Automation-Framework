import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Regression 02 - Booking flow still works', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterEmail('test@test.com');
  await homePage.selectTravelDate('2028-06-15');
  await homePage.enterPromoCode('SAVE10');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentSuccessful();

  await bookingPage.clickBookNow();

  await bookingPage.expectBookingSuccessful();
});