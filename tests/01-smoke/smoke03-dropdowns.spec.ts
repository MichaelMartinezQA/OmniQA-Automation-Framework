import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 03 - Destination dropdown is visible', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.expectDestinationVisible();
});