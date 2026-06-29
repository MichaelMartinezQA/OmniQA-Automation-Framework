import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Regression 04 - Navigation elements still exist', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await expect(homePage.searchField).toBeVisible();
  await expect(homePage.destination).toBeVisible();
  await expect(homePage.travelType).toBeVisible();
  await expect(homePage.searchButton).toBeVisible();
  await expect(homePage.bookNowButton).toBeVisible();
});