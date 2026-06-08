import { test, expect } from '@playwright/test';

test('Show Stopper 03 - Travel date is required before booking', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami');
  await page.selectOption('#destination', 'Miami');
  await page.selectOption('#travelType', 'Cruise');
  await page.fill('#email', 'test@example.com');

  // Intentionally omit travel date

  await page.fill('#creditCard', '4111111111111111');
  await page.fill('#expirationDate', '12/30');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#searchResult'))
    .toHaveText('Travel Date is required');
});