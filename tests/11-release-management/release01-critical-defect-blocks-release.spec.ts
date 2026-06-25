import { test, expect } from '@playwright/test';

test('Release 01 - Critical defect blocks release', async () => {
  const criticalDefects = 1;

  const releaseApproved = criticalDefects === 0;

  expect(releaseApproved).toBe(false);
});