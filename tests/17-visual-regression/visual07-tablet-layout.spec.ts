import { test, expect } from '@playwright/test';

test('Visual 07 - Tablet layout matches baseline', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('tablet-layout.png', { fullPage: true });
});