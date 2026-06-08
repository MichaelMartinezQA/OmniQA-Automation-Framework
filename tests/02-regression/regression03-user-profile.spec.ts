import { test, expect } from '@playwright/test';

test('Regression 03 - Email validation still works', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.click('#searchButton');

  await expect(page.locator('#searchResult'))
    .toHaveText('Email is required');

});
