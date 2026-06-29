import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 02 - Non-refundable booking', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterEmail('nonrefundable@test.com');
  await bookingPage.selectTravelDate('2027-08-15');
  await bookingPage.selectReservationType('non-refundable');
  await bookingPage.checkNonRefundableAcknowledgement();

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Payment successful');

  await bookingPage.clickBookNow();
  await bookingPage.expectBookingResultContains('Booking confirmed');
  await bookingPage.expectConfirmationNumberContains('OMNI-');
});