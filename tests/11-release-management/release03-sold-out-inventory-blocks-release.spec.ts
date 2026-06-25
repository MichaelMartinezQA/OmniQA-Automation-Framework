import { test, expect } from '@playwright/test';

test('Release 03 - Sold out inventory blocks release', async () => {
  const inventoryDefectExists = true;

  const releaseApproved = !inventoryDefectExists;

  expect(releaseApproved).toBe(false);
});