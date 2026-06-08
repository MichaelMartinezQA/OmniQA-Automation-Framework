import { test, expect } from '@playwright/test';

test('Business Risk 02 - Prevent booking with past travel date', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami Cruise');

  await page.fill('#email', 'test@test.com');

  await page.fill('#travelDate', '2024-01-01');

  await page.fill('#promoCode', 'SAVE10');

  await page.fill('#creditCard', '4111111111111111');

  await page.fill('#expirationDate', '12/30');

  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#searchResult'))
    .not.toHaveText('Searching for: Miami Cruise');

});