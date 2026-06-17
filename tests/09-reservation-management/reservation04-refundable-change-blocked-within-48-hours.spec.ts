import { test, expect } from '@playwright/test';

test('Reservation 04 - Refundable change blocked within 48 hours', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#email', 'within48hours@test.com');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const travelDate = tomorrow.toISOString().split('T')[0];

  await page.fill('#travelDate', travelDate);

  await page.selectOption('#reservationType', 'refundable');

  await page.fill('#creditCard', '4111111111111111');

  await page.fill('#expirationDate', '12/30');

  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toContainText('Payment successful');

  await page.click('#bookNowButton');

  await expect(page.locator('#bookingResult'))
    .toContainText('Booking confirmed');

  await page.click('#modifyReservationButton');

  await page.fill('#travelDate', '2027-12-31');

  await page.click('#saveReservationChangesButton');

  await expect(page.locator('#reservationChangeResult'))
    .toContainText(
      'Modification blocked: refundable reservations cannot be changed within 48 hours'
    );

});