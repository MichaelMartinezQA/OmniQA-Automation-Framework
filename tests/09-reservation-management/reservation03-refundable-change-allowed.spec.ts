import { test, expect } from '@playwright/test';

test('Reservation 03 - Refundable change allowed', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#email', 'refundablechange@test.com');
  await page.fill('#travelDate', '2027-08-15');
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

  await expect(page.locator('#confirmationNumber'))
    .toContainText('OMNI-');

  await page.click('#modifyReservationButton');

  await page.fill('#travelDate', '2027-09-15');

  await page.click('#saveReservationChangesButton');

  await expect(page.locator('#reservationChangeResult'))
    .toContainText('Reservation updated successfully');
});