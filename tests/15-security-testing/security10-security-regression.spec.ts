import { test, expect } from '@playwright/test';

test.describe('Security 10 - Security Regression', () => {

  test('Application should still complete a valid secure booking', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#search').fill('Cancun');
    await page.locator('#email').fill('qa@omniqa.com');
    await page.locator('#travelDate').fill('2027-08-15');
    await page.locator('#creditCard').fill('4111111111111111');
    await page.locator('#expirationDate').fill('12/30');
    await page.locator('#cvv').fill('123');

    await page.locator('#searchButton').click();
    await page.locator('#bookNowButton').click();

    await expect(page.locator('#paymentResult'))
      .toHaveText('Payment successful');

    await expect(page.locator('#bookingResult'))
      .toHaveText('Booking confirmed');

    await expect(page.locator('#confirmationNumber'))
      .toContainText('OMNI-');

  });

});