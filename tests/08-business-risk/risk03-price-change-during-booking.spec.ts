import { test, expect } from '@playwright/test';

test('Business Risk 03 - Detect price change during booking', async ({ page }) => {

  await page.goto('http://localhost:3000');

  const originalPrice =
    await page.locator('#priceDisplay').textContent();

  await expect(page.locator('#priceDisplay'))
    .toHaveText('$1000');

  const checkoutPrice =
    await page.locator('#priceDisplay').textContent();

  expect(checkoutPrice).toBe(originalPrice);

});