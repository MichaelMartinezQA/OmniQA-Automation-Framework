import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 04 - Refundable change blocked within 48 hours', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const travelDate = tomorrow.toISOString().split('T')[0];

  await homePage.enterEmail('within48hours@test.com');
  await bookingPage.selectTravelDate(travelDate);
  await bookingPage.selectReservationType('refundable');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Payment successful');

  await bookingPage.clickBookNow();
  await bookingPage.expectBookingResultContains('Booking confirmed');

  await bookingPage.clickModifyReservation();
  await bookingPage.selectTravelDate('2027-12-31');
  await bookingPage.clickSaveReservationChanges();

  await bookingPage.expectReservationChangeResultContains(
    'Modification blocked: refundable reservations cannot be changed within 48 hours'
  );
});