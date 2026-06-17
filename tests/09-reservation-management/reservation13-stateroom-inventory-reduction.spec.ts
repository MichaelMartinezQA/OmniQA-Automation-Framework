import { test, expect } from '@playwright/test';

test('Reservation 13 - Stateroom Inventory Reduction', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available: 3');

  await page.locator('#email').fill('stateroom@test.com');

  await page.locator('#travelDate').fill('2027-08-15');

  await page.locator('#unitType').selectOption('stateroom');

  await page.locator('#reservationType').selectOption('refundable');

  await page.locator('#creditCard').fill('4111111111111111');

  await page.locator('#expirationDate').fill('12/30');

  await page.locator('#cvv').fill('123');

  await page.locator('#searchButton').click();

  await page.locator('#bookNowButton').click();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available: 2');
});