import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 05 - Booking flow starts', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.clickBookNow();

  await homePage.expectBookingResultVisible();
});