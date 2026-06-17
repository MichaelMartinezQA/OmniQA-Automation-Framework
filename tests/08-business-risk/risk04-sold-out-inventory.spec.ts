import { test, expect } from '@playwright/test';

test('Business Risk 04 - Verify inventory is available before booking', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Rooms Available:');

  await expect(page.locator('#inventoryStatus'))
    .toContainText('Staterooms Available:');

});