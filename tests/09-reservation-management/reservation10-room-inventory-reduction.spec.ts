import { test, expect } from '@playwright/test';

test('Reservation 10 - Room inventory reduction', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#email', 'inventoryreduction@test.com');

  await page.fill('#travelDate', '2027-08-15');

  await page.selectOption('#reservationType', 'refundable');

  await page.selectOption('#unitType', 'room');

  await page.fill('#creditCard', '4111111111111111');

  await page.fill('#expirationDate', '12/30');

  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toContainText('Payment successful');

  const inventoryBefore =
    await page.locator('#inventoryStatus').textContent();

  await page.click('#bookNowButton');

  await expect(page.locator('#bookingResult'))
    .toContainText('Booking confirmed');

  const inventoryAfter =
    await page.locator('#inventoryStatus').textContent();

  expect(inventoryBefore).not.toEqual(inventoryAfter);

});