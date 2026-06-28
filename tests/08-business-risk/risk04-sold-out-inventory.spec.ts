import { test, expect } from '@playwright/test';

test('Business Risk 04 - Verify inventory is available before booking', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Rooms Available:');

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available:');
});