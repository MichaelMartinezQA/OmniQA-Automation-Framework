import { test, expect } from '@playwright/test';

test('Smoke Test 02 - Search field accepts input', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami Cruise');

  await expect(page.locator('#search'))
    .toHaveValue('Miami Cruise');
});