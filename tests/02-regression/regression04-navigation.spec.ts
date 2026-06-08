import { test, expect } from '@playwright/test';

test('Regression 04 - Navigation elements still exist', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await expect(page.locator('#search'))
    .toBeVisible();

  await expect(page.locator('#destination'))
    .toBeVisible();

  await expect(page.locator('#travelType'))
    .toBeVisible();

  await expect(page.locator('#searchButton'))
    .toBeVisible();

  await expect(page.locator('#bookNowButton'))
    .toBeVisible();

});