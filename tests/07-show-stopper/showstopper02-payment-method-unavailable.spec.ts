import { test, expect } from '@playwright/test';

test('Show Stopper 02 - Payment method unavailable blocks booking', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami');
  await page.selectOption('#destination', 'Miami');
  await page.selectOption('#travelType', 'Cruise');
  await page.fill('#email', 'test@example.com');
  await page.fill('#travelDate', '2026-12-15');

  // Simulate unavailable payment method
  await page.fill('#creditCard', '');

  await page.fill('#expirationDate', '12/30');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toHaveText('Credit Card is required');
});