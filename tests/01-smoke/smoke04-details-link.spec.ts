import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 04 - Book button is visible', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await expect(page.locator('#bookNowButton')).toBeVisible();
});