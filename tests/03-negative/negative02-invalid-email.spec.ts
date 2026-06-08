import { test, expect } from '@playwright/test';

test('Negative Test 02 - Invalid email address', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#email').fill('notanemail');

  await expect(page.locator('#email')).toHaveValue('notanemail');
});