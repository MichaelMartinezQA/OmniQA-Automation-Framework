import { test, expect } from '@playwright/test';

test('Visual 06 - Mobile layout matches baseline', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('mobile-layout.png', { fullPage: true });
});