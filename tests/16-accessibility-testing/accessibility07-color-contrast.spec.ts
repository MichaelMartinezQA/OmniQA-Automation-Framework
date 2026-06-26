import { test, expect } from '@playwright/test';

test.describe('Accessibility 07 - Color Contrast', () => {

  test('Page should render visible text', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('body')).toContainText('OmniQA');

  });

});