import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 13 - Stateroom Inventory Reduction', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available: 3');

  await homePage.enterEmail('stateroom@test.com');
  await bookingPage.selectTravelDate('2027-08-15');
  await bookingPage.selectUnitType('stateroom');
  await bookingPage.selectReservationType('refundable');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await bookingPage.clickBookNow();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available: 2');
});