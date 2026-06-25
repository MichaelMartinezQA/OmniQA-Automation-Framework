import { test, expect } from '@playwright/test';

test('Risk 01 - Critical production defect blocks release', async () => {
  const criticalProductionDefect = true;

  const releaseDecision =
    criticalProductionDefect
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});