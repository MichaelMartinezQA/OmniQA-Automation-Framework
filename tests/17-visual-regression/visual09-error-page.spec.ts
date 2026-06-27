import { test, expect } from '@playwright/test';

test('Visual 09 - Error page matches baseline', async ({ page }) => {
  await page.goto('http://localhost:3000/error');
  await expect(page).toHaveScreenshot('error-page.png', { fullPage: true });
});