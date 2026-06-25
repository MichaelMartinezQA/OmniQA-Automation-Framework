import { test, expect } from '@playwright/test';

test('Release 05 - High severity defect blocks release', async () => {
  const highSeverityDefects = 1;

  const releaseDecision =
    highSeverityDefects > 0
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});