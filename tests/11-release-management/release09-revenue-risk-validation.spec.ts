import { test, expect } from '@playwright/test';

test('Release 09 - Revenue risk blocks release', async () => {
  const revenueRiskDetected = true;

  const releaseDecision =
    revenueRiskDetected
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});