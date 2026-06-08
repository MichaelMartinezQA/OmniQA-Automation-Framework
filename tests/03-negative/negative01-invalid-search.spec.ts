import { test, expect } from '@playwright/test';

test('Negative Test 01 - Invalid search input', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#search').fill('$$$$$');

  await page.locator('#searchButton').click();

  await expect(page.locator('#searchResult'))
    .not.toContainText('Searching for: $$$$$');
});