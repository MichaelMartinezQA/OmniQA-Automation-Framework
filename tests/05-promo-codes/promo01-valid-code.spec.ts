import { test, expect } from '@playwright/test';

test('Promo Test 01 - Valid promo code applies discount', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami');
  await page.selectOption('#destination', 'Miami');
  await page.selectOption('#travelType', 'Cruise');
  await page.fill('#email', 'test@example.com');
  await page.fill('#travelDate', '2026-12-15');

  await page.fill('#promoCode', 'SAVE10');

  await page.fill('#creditCard', '4111111111111111');
  await page.fill('#expirationDate', '12/30');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#promoResult'))
    .toHaveText('Promo code applied: 10% discount');
});