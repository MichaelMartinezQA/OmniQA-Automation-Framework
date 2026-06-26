import { test, expect } from '@playwright/test';

test.describe('Performance 01 - Search Response Time', () => {

  test('Search should complete in under 2 seconds', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#search').fill('Cancun');
    await page.locator('#email').fill('qa@omniqa.com');
    await page.locator('#travelDate').fill('2027-08-15');
    await page.locator('#creditCard').fill('4111111111111111');
    await page.locator('#expirationDate').fill('12/30');
    await page.locator('#cvv').fill('123');

    const startTime = Date.now();

    await page.locator('#searchButton').click();

    await expect(page.locator('#searchResult'))
      .toHaveText('Searching for: Cancun');

    const elapsedTime = Date.now() - startTime;

    console.log(`Search completed in ${elapsedTime} ms`);

    expect(elapsedTime).toBeLessThan(2000);

  });

});