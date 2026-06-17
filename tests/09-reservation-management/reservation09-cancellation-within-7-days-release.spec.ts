import { test, expect } from '@playwright/test';

test('Reservation 09 - Cancellation within 7 days releases inventory', async ({ page }) => {

  await page.goto('http://localhost:3000');

  const tenDaysFromNow = new Date();
  tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);

  const travelDate =
    tenDaysFromNow.toISOString().split('T')[0];

  await page.fill('#email', 'inventoryrelease@test.com');

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
      'Cancellation accepted: inventory will be released within 7 days'
    );

});