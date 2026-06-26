import { test, expect } from '@playwright/test';

test.describe('Accessibility 09 - Screen Reader Compatibility', () => {

  test('Main heading should be present', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('h1')).toContainText('OmniQA');

  });

});