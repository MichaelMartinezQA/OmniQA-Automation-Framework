import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility audit - Error page', async ({ page }) => {
  await page.goto('http://localhost:3000/error.html');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});