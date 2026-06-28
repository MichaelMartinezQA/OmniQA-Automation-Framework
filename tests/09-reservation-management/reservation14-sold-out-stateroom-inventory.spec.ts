import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';
import { BookingPage } from '../../pages/BookingPage';

test('Reservation 14 - Sold Out Stateroom Inventory', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();

  await homePage.enterEmail('soldoutstateroom@test.com');
  await bookingPage.selectTravelDate('2027-07-14');
  await bookingPage.selectUnitType('stateroom');

  await paymentPage.enterCreditCard('4111111111111111');
  await paymentPage.enterExpirationDate('12/30');
  await paymentPage.enterCVV('123');

  await homePage.clickSearch();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Sold Out: July 13-20, 2027');

  await homePage.expectSearchResultContains(
    'Selected travel dates are sold out'
  );
});