import { test, expect } from '@playwright/test';

test('Negative Test 06 - Email is required before search', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#search').fill('Miami Cruise');

  await page.locator('#travelDate').fill('2026-12-25');

  await page.locator('#creditCard').fill('4111111111111111');

  await page.locator('#searchButton').click();

  await expect(page.locator('#searchResult'))
    .toContainText('Email is required');
});