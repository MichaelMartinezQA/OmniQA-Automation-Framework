import { test, expect } from '@playwright/test';

test.describe('Performance 05 - Sustained Load', () => {

  test('Twenty consecutive searches should remain responsive', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 1; i <= 20; i++) {

      await page.locator('#search').fill(`Load ${i}`);
      await page.locator('#email').fill('qa@omniqa.com');
      await page.locator('#travelDate').fill('2027-08-15');
      await page.locator('#creditCard').fill('4111111111111111');
      await page.locator('#expirationDate').fill('12/30');
      await page.locator('#cvv').fill('123');

      const start = Date.now();

      await page.locator('#searchButton').click();

      await expect(page.locator('#searchResult'))
        .toHaveText(`Searching for: Load ${i}`);

      const elapsed = Date.now() - start;

      console.log(`Iteration ${i}: ${elapsed} ms`);

      expect(elapsed).toBeLessThan(2000);

    }

  });

});