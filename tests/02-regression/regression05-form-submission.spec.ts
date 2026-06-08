import { test, expect } from '@playwright/test';

test('Regression 05 - Form submission still succeeds', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#email', 'test@test.com');
  await page.fill('#travelDate', '2028-06-15');
  await page.fill('#promoCode', 'SAVE10');

  await page.fill('#creditCard', '4111111111111111');
  await page.fill('#expirationDate', '12/30');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#searchResult'))
    .toContainText('Searching for');

});