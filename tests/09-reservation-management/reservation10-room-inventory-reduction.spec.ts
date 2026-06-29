import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 10 - Room inventory reduction', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterEmail('inventoryreduction@test.com');
  await bookingPage.selectTravelDate('2027-08-15');
  await bookingPage.selectReservationType('refundable');
  await bookingPage.selectUnitType('room');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await paymentPage.expectPaymentResultContains('Payment successful');

  const inventoryBefore =
    await page.locator('#inventoryStatus').textContent();

  await bookingPage.clickBookNow();
  await bookingPage.expectBookingResultContains('Booking confirmed');

  const inventoryAfter =
    await page.locator('#inventoryStatus').textContent();

  expect(inventoryBefore).not.toEqual(inventoryAfter);
});