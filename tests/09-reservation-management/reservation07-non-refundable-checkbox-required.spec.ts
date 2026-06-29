import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 07 - Non-refundable acknowledgement checkbox required', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterEmail('checkboxrequired@test.com');
  await bookingPage.selectTravelDate('2027-08-15');
  await bookingPage.selectReservationType('non-refundable');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Payment successful');

  await bookingPage.clickBookNow();

  await bookingPage.expectBookingResultContains(
    'Booking blocked: non-refundable acknowledgement is required'
  );
});