import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Negative Test 03 - Travel date is required', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.enterSearch('Miami Cruise');
  await homePage.enterEmail('test@example.com');

  await homePage.clickSearch();

  await homePage.expectSearchResultContains('Travel Date is required');
});