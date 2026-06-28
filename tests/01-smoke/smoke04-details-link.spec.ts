import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 04 - Book button is visible', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.expectBookNowVisible();
});