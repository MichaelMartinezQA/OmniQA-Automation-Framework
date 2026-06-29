import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/PaymentPage';

test('Negative Test 06 - Email is required before search', async ({ page }) => {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.open();

  await homePage.enterSearch('Miami Cruise');
  await homePage.selectTravelDate('2026-12-25');
  await paymentPage.enterCreditCard('4111111111111111');

  await homePage.clickSearch();

  await homePage.expectSearchResultContains('Email is required');
});