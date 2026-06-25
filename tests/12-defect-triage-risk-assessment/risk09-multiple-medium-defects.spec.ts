import { test, expect } from '@playwright/test';

test('Risk 09 - Multiple medium defects require risk review', async () => {
  const mediumSeverityDefects = 5;

  const releaseDecision =
    mediumSeverityDefects >= 5
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});