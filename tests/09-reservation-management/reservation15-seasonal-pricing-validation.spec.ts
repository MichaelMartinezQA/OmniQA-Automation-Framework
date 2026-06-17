import { test, expect } from '@playwright/test';

test('Reservation 15 - Seasonal Pricing Validation', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('#priceDisplay'))
    .toContainText('$1000');

  await page.locator('#email').fill('pricing@test.com');

  await page.locator('#travelDate').fill('2027-12-20');

  await page.locator('#creditCard').fill('4111111111111111');

  await page.locator('#expirationDate').fill('12/30');

  await page.locator('#cvv').fill('123');

  await page.locator('#searchButton').click();

  await expect(page.locator('#priceDisplay'))
    .toContainText('$1000');
});