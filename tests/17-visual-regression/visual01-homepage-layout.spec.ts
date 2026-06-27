import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Homepage Layout', () => {

  test('Visual 01 - Homepage layout matches approved baseline', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.setViewportSize({
      width: 1440,
      height: 900
    });

    await expect(page).toHaveScreenshot('homepage-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });

  });

});