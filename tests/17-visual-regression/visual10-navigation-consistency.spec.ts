import { test, expect } from '@playwright/test';

test('Visual 10 - Navigation consistency matches baseline', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('navigation-consistency.png', { fullPage: true });
});