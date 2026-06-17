import { test, expect } from '@playwright/test';

test('Reservation 14 - Sold Out Stateroom Inventory', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.locator('#email').fill('soldoutstateroom@test.com');

  await page.locator('#travelDate').fill('2027-07-14');

  await page.locator('#unitType').selectOption('stateroom');

  await page.locator('#creditCard').fill('4111111111111111');

  await page.locator('#expirationDate').fill('12/30');

  await page.locator('#cvv').fill('123');

  await page.locator('#searchButton').click();

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Sold Out: July 13-20, 2027');

  await expect(page.locator('#searchResult'))
    .toContainText('Selected travel dates are sold out');
});