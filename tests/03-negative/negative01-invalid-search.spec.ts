import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Negative Test 01 - Invalid search input', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.enterSearch('$$$$$');
  await homePage.clickSearch();

  await expect(homePage.searchResult)
    .not.toContainText('Searching for: $$$$$');
});