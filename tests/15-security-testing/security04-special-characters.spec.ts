import { test, expect } from '@playwright/test';

test.describe('Security 04 - Special Characters', () => {

  test('Application should safely accept Unicode and special characters', async ({ page }) => {

    await page.goto('http://localhost:3000');

    const specialCharacters = "Cancún 東京 😀 £ €";

    await page.locator('#search').fill(specialCharacters);
    await page.locator('#email').fill('qa@omniqa.com');
    await page.locator('#travelDate').fill('2027-08-15');
    await page.locator('#creditCard').fill('4111111111111111');
    await page.locator('#expirationDate').fill('12/30');
    await page.locator('#cvv').fill('123');

    await page.locator('#searchButton').click();

    await expect(page.locator('#searchResult'))
      .toHaveText(`Searching for: ${specialCharacters}`);

  });

});