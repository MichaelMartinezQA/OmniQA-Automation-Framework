import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 11 - Room inventory restoration after cancellation', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Rooms Available: 5');

  await homePage.enterEmail('inventoryrestore@test.com');
  await bookingPage.selectTravelDate('2027-08-15');
  await bookingPage.selectReservationType('refundable');
  await bookingPage.selectUnitType('room');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await bookingPage.clickBookNow();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Rooms Available: 4');

  await bookingPage.clickCancelReservation();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Rooms Available: 5');
});