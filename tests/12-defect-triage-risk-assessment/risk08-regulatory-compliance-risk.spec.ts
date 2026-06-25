import { test, expect } from '@playwright/test';

test('Risk 08 - Regulatory compliance issue blocks release', async () => {
  const complianceViolationExists = true;

  const releaseDecision =
    complianceViolationExists
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});