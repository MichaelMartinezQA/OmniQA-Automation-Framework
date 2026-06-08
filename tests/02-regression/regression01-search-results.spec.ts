import { test, expect } from '@playwright/test';

test('Regression 01 - Search results still display', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await expect(page.locator('#results'))
    .toBeVisible();

  await expect(page.locator('#results'))
    .toContainText('Miami Bahamas Cruise');

});