import { test, expect } from '@playwright/test';

test('Reservation 05 - Non-refundable change blocked', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#email', 'nonrefundablechange@test.com');

  await page.fill('#travelDate', '2027-08-15');

  await page.selectOption('#reservationType', 'non-refundable');

  await page.check('#nonRefundableAcknowledgement');

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
      'Modification blocked: non-refundable reservations cannot be changed'
    );

});