import { test, expect } from '@playwright/test';

test('Negative Test 05 - Required fields validation', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#searchButton').click();

  await expect(page.locator('#searchResult'))
    .toContainText('Email is required');
});