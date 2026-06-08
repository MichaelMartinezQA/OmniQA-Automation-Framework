import { test, expect } from '@playwright/test';

test('Smoke Test 04 - Search result links are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByText('Miami Bahamas Cruise - 4 Nights')
  ).toBeVisible();

  await expect(
    page.getByText('Cancun Resort Getaway - 5 Nights')
  ).toBeVisible();

  await expect(
    page.getByText('Barcelona Mediterranean Cruise - 7 Nights')
  ).toBeVisible();
});