import { test, expect } from '@playwright/test';

test('Smoke Test 01 - Homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/OmniQA/);
  await expect(page.getByRole('heading', { name: 'OmniQA' })).toBeVisible();
});