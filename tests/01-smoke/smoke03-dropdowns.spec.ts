import { test, expect } from '@playwright/test';

test('Smoke Test 03 - Dropdowns function correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#destination').selectOption('Cancun');
  await expect(page.locator('#destination')).toHaveValue('Cancun');

  await page.locator('#travelType').selectOption('Hotel');
  await expect(page.locator('#travelType')).toHaveValue('Hotel');
});