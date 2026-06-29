import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 09 - Cancellation within 7 days releases inventory', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  const tenDaysFromNow = new Date();
  tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);
  const travelDate = tenDaysFromNow.toISOString().split('T')[0];

  await homePage.open();

  await homePage.enterEmail('inventoryrelease@test.com');
  await bookingPage.selectTravelDate(travelDate);
  await bookingPage.selectReservationType('refundable');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Payment successful');

  await bookingPage.clickBookNow();
  await bookingPage.expectBookingResultContains('Booking confirmed');

  await bookingPage.clickCancelReservation();

  await bookingPage.expectCancellationResultContains(
    'Cancellation accepted: inventory will be released within 7 days'
  );
});