import { test, expect } from '@playwright/test';

test.describe('Performance 03 - Booking Response Time', () => {

  test('Booking should complete in under 2 seconds', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#search').fill('Cancun');
    await page.locator('#email').fill('qa@omniqa.com');
    await page.locator('#travelDate').fill('2027-08-15');
    await page.locator('#creditCard').fill('4111111111111111');
    await page.locator('#expirationDate').fill('12/30');
    await page.locator('#cvv').fill('123');

    await page.locator('#searchButton').click();

    const start = Date.now();

    await page.locator('#bookNowButton').click();

    await expect(page.locator('#bookingResult'))
      .toHaveText('Booking confirmed');

    const elapsed = Date.now() - start;

    console.log(`Booking completed in ${elapsed} ms`);

    expect(elapsed).toBeLessThan(2000);

  });

});