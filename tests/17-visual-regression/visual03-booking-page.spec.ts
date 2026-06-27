import { test, expect } from '@playwright/test';

test('Visual 03 - Booking page matches approved baseline', async ({ page }) => {
  await page.goto('http://localhost:3000/booking');
  await expect(page).toHaveScreenshot('booking-page.png', { fullPage: true });
});