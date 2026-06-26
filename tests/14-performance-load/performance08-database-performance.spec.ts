import { test, expect } from '@playwright/test';

test.describe('Performance 08 - Database Performance', () => {

  test('Inventory information should display quickly', async ({ page }) => {

    const start = Date.now();

    await page.goto('http://localhost:3000');

    await expect(page.locator('#inventoryStatus'))
      .toContainText('Rooms Available');

    const elapsed = Date.now() - start;

    console.log(`Inventory loaded in ${elapsed} ms`);

    expect(elapsed).toBeLessThan(2000);

  });

});