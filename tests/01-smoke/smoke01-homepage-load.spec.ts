import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { testUsers } from '../../utils/testData';

for (const user of testUsers) {
  test(`Smoke 01 - Homepage loads (${user.firstName})`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.verifyLoaded();
  });
}