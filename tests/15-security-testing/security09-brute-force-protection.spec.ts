import { test, expect } from '@playwright/test';

test.describe('Security 09 - Brute Force Protection', () => {

  test('Multiple invalid payment attempts should be handled consistently', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 1; i <= 10; i++) {

      await page.locator('#email').fill('qa@omniqa.com');
      await page.locator('#travelDate').fill('2027-08-15');
      await page.locator('#creditCard').fill('4000000000000002');
      await page.locator('#expirationDate').fill('12/30');
      await page.locator('#cvv').fill('123');

      await page.locator('#searchButton').click();

      await expect(page.locator('#paymentResult'))
        .toHaveText('Payment declined');

    }

  });

});