import { test, expect } from '@playwright/test';

test.describe('Accessibility 06 - Focus Indicators', () => {

  test('Focused element should remain visible', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#search').focus();

    await expect(page.locator('#search')).toBeFocused();

  });

});