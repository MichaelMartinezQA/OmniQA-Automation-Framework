import { test, expect } from '@playwright/test';

test.describe('Accessibility 05 - Tab Order', () => {

  test('Tab navigation should reach interactive elements', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }

    const activeTag = await page.evaluate(() =>
      document.activeElement?.tagName
    );

    expect(activeTag).toMatch(/INPUT|SELECT|BUTTON/);

  });

});