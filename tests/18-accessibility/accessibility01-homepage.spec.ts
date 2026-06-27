import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility audit - Homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});