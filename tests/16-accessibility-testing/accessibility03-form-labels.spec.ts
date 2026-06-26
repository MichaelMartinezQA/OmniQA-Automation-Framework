import { test, expect } from '@playwright/test';

test.describe('Accessibility 03 - Form Labels', () => {

  test('Required form controls should exist', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('#search')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#travelDate')).toBeVisible();
    await expect(page.locator('#creditCard')).toBeVisible();

  });

});