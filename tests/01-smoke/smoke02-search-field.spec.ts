import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 02 - Search field accepts input', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.enterSearch('Cancun');

  await homePage.expectSearchValue('Cancun');
});