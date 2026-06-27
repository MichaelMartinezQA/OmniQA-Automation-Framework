import { test, expect } from '@playwright/test';

test('Visual 04 - Payment page matches approved baseline', async ({ page }) => {
  await page.goto('http://localhost:3000/payment');
  await expect(page).toHaveScreenshot('payment-page.png', { fullPage: true });
});