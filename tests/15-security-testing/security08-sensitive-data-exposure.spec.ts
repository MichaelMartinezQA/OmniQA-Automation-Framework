import { test, expect } from '@playwright/test';

test.describe('Security 08 - Sensitive Data Exposure', () => {

  test('Confirmation number should not exist before booking', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('#confirmationNumber')).toHaveText('');

    await expect(page.locator('#bookingResult')).toHaveText('');

  });

});