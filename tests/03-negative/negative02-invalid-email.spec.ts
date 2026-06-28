import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Negative Test 02 - Invalid email address', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.enterEmail('notanemail');

  await expect(homePage.email).toHaveValue('notanemail');
});