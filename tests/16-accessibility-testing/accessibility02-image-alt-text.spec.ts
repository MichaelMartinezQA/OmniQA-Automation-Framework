import { test, expect } from '@playwright/test';

test.describe('Accessibility 02 - Image Alt Text', () => {

  test('Images should contain alt text when present', async ({ page }) => {

    await page.goto('http://localhost:3000');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }

  });

});