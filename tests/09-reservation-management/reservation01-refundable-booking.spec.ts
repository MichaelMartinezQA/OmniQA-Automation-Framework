import { test, expect } from '@playwright/test';

test('Reservation 01 - Refundable booking', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.locator('#email').fill('michael@test.com');

  await page.locator('#travelDate').fill('2027-07-14');

  await page.locator('#reservationType').selectOption('refundable');

  await page.locator('#creditCard').fill('4111111111111111');

  await page.locator('#expirationDate').fill('12/30');

  await page.locator('#cvv').fill('123');

  await page.locator('#searchButton').click();

  await expect(page.locator('#paymentResult'))
    .toContainText('Payment successful');

  await page.locator('#bookNowButton').click();

  await expect(page.locator('#bookingResult'))
    .toContainText('Booking confirmed');

  await expect(page.locator('#confirmationNumber'))
    .toContainText('OMNI-');
});