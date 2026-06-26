import { test, expect } from '@playwright/test';

test.describe('Accessibility 01 - Page Title', () => {

  test('Application should have a meaningful page title', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await expect(page).toHaveTitle(/OmniQA/i);

  });

});