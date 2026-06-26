import { test, expect } from '@playwright/test';

test.describe('Accessibility 04 - Keyboard Navigation', () => {

  test('User should be able to tab into the application', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.keyboard.press('Tab');

    const active = await page.evaluate(() => document.activeElement?.id);

    expect(active).not.toBe('');

  });

});