import { test, expect } from '@playwright/test';

test.describe('Security 07 - Credit Card Data Protection', () => {

  test('Credit card field should not expose its value after page reload', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#creditCard').fill('4111111111111111');

    await page.reload();

    await expect(page.locator('#creditCard')).toHaveValue('');

  });

});