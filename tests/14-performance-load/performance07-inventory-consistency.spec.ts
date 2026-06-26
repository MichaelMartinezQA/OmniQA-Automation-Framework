import { test, expect } from '@playwright/test';

test.describe('Performance 07 - Inventory Consistency', () => {

  test('Inventory should remain consistent after repeated bookings', async ({ page }) => {

    await page.goto('http://localhost:3000');

    for (let i = 1; i <= 3; i++) {

      await page.reload();

      await page.locator('#search').fill(`Inventory ${i}`);
      await page.locator('#email').fill('qa@omniqa.com');
      await page.locator('#travelDate').fill('2027-08-15');
      await page.locator('#creditCard').fill('4111111111111111');
      await page.locator('#expirationDate').fill('12/30');
      await page.locator('#cvv').fill('123');

      await page.locator('#searchButton').click();
      await page.locator('#bookNowButton').click();

      await expect(page.locator('#bookingResult'))
        .toHaveText('Booking confirmed');

      await expect(page.locator('#inventoryStatus'))
        .toContainText('Rooms Available');

    }

  });

});