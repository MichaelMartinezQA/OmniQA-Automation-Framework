import { test, expect } from '@playwright/test';

test.describe('Performance 02 - Concurrent Search', () => {

  test('Multiple searches should complete successfully', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 1; i <= 10; i++) {

      await page.locator('#search').fill(`Search ${i}`);
      await page.locator('#email').fill('qa@omniqa.com');
      await page.locator('#travelDate').fill('2027-08-15');
      await page.locator('#creditCard').fill('4111111111111111');
      await page.locator('#expirationDate').fill('12/30');
      await page.locator('#cvv').fill('123');

      const start = Date.now();

      await page.locator('#searchButton').click();

      await expect(page.locator('#searchResult'))
        .toHaveText(`Searching for: Search ${i}`);

      const elapsed = Date.now() - start;

      console.log(`Search ${i}: ${elapsed} ms`);

      expect(elapsed).toBeLessThan(2000);

    }

  });

});