import { test, expect } from '@playwright/test';

test('Visual 08 - Dark mode matches baseline', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('dark-mode.png', { fullPage: true });
});