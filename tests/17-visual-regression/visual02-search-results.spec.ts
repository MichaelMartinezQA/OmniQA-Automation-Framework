import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Search Results', () => {

  test('Visual 02 - Search results page matches approved baseline', async ({ page }) => {
    await page.goto('http://localhost:3000/search');
    await expect(page).toHaveScreenshot('search-results.png', {
      fullPage: true
    });
  });

});