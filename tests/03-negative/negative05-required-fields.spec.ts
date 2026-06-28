import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Negative Test 05 - Required fields validation', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.clickSearch();

  await homePage.expectSearchResultContains('Email is required');
});