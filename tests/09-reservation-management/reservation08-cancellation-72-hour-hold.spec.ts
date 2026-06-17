import { test, expect } from '@playwright/test';

test('Reservation 08 - Cancellation 72-hour hold', async ({ page }) => {

  await page.goto('http://localhost:3000');

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  const travelDate =
    fiveDaysFromNow.toISOString().split('T')[0];

  await page.fill('#email', 'hold72hours@test.com');

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

  await page.click('#cancelReservationButton');

  await expect(page.locator('#cancellationResult'))
    .toContainText(
      'Cancellation accepted: reservation placed on 72-hour hold'
    );

});