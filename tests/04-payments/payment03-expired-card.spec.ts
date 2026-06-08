import { test, expect } from '@playwright/test';

test('Payment Test 03 - Expired card is rejected', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami');
  await page.selectOption('#destination', 'Miami');
  await page.selectOption('#travelType', 'Cruise');
  await page.fill('#email', 'test@example.com');
  await page.fill('#travelDate', '2026-12-15');

  await page.fill('#creditCard', '4111111111111111');
  await page.fill('#expirationDate', '01/20');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult')).toHaveText('Card is expired');
});