import { test, expect } from '@playwright/test';

test.describe('Security 06 - Authorization Controls', () => {

  test('Booking should not be allowed before successful payment', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.locator('#bookNowButton').click();

    await expect(page.locator('#bookingResult'))
      .toHaveText('Booking blocked: payment must be successful first');

  });

});