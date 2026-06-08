import { test, expect } from '@playwright/test';

test('Negative Test 04 - Credit card is required', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami Cruise');
  await page.fill('#email', 'test@test.com');
  await page.fill('#travelDate', '2026-12-25');
  await page.fill('#promoCode', 'SAVE10');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toContainText('Credit Card is required');
});