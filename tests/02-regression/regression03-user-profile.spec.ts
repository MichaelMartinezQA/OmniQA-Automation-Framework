import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Regression 03 - Email validation still works', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.clickSearch();

  await homePage.expectSearchResult('Email is required');
});