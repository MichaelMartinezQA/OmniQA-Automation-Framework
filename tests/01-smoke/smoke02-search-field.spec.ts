import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Smoke 02 - Search field accepts input', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await page.locator('#search').fill('Cancun');

  await expect(page.locator('#search')).toHaveValue('Cancun');
});