import { test, expect } from '@playwright/test';

test('Business Risk 05 - Booking confirmation displays after successful booking', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#search', 'Miami Cruise');
  await page.fill('#email', 'test@test.com');
  await page.fill('#travelDate', '2026-12-25');
  await page.fill('#promoCode', 'SAVE10');
  await page.fill('#creditCard', '4111111111111111');
  await page.fill('#expirationDate', '12/30');
  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toHaveText('Payment successful');

  await page.click('#bookNowButton');

  await expect(page.locator('#bookingResult'))
    .toHaveText('Booking confirmed');

});