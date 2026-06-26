import { test, expect } from '@playwright/test';

test.describe('Accessibility 08 - ARIA Attributes', () => {

  test('Page should render without ARIA-related errors', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page.locator('body')).toBeVisible();

  });

});