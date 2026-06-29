import { test, expect } from '@playwright/test';

test.describe('Performance 09 - Stress Test', () => {

  test('One hundred searches should complete successfully', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 1; i <= 100; i++) {

      await page.locator('#search').fill(`Stress ${i}`);
      await page.locator('#email').fill('qa@omniqa.com');
      await page.locator('#travelDate').fill('2027-08-15');
      await page.locator('#creditCard').fill('4111111111111111');
      await page.locator('#expirationDate').fill('12/30');
      await page.locator('#cvv').fill('123');

      const button = page.locator('#searchButton');

      await expect(button).toBeEnabled();

      await button.click();

      // 🔥 CRITICAL FIX: wait for UI to finish updating before next iteration
      await expect(page.locator('#searchResult'))
        .toHaveText(`Searching for: Stress ${i}`);

      await expect(page.locator('#paymentResult'))
        .toHaveText('Payment successful');

      // small sync buffer for Firefox layout engine stability
      await page.waitForTimeout(10);
    }

  });

});