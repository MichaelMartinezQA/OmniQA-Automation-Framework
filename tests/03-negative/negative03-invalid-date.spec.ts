import { test, expect } from '@playwright/test';

test('Negative Test 03 - Travel date is required', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#search').fill('Miami Cruise');

  await page.locator('#email').fill('test@example.com');

  await page.locator('#searchButton').click();

  await expect(page.locator('#searchResult'))
    .toContainText('Travel Date is required');
});