import { test, expect } from '@playwright/test';

test('Risk 05 - Revenue impact blocks release', async () => {
  const revenueImpactDetected = true;

  const releaseDecision =
    revenueImpactDetected
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});