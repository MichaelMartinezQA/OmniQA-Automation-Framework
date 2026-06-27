import { test, expect } from '@playwright/test';

test('Visual 05 - Confirmation page matches approved baseline', async ({ page }) => {
  await page.goto('http://localhost:3000/confirmation');
  await expect(page).toHaveScreenshot('confirmation-page.png', { fullPage: true });
});