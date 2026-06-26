import { test, expect } from '@playwright/test';

test.describe('Performance 04 - Application Response Time', () => {

  test('Application should load quickly', async ({ page }) => {

    const start = Date.now();

    await page.goto('http://localhost:3000');

    await expect(page.locator('h1'))
      .toHaveText('OmniQA');

    const elapsed = Date.now() - start;

    console.log(`Application loaded in ${elapsed} ms`);

    expect(elapsed).toBeLessThan(2000);

  });

});