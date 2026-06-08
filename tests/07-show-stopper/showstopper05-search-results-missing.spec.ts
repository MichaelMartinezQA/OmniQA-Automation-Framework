import { test, expect } from '@playwright/test';

test('Show Stopper 05 - Search results are displayed to customer', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('#results'))
    .toBeVisible();

  await expect(page.locator('#results'))
    .toContainText('Miami Bahamas Cruise');

  await expect(page.locator('#results'))
    .toContainText('Cancun Resort Getaway');

  await expect(page.locator('#results'))
    .toContainText('Barcelona Mediterranean Cruise');
});