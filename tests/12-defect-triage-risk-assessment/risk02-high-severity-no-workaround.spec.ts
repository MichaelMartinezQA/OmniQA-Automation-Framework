import { test, expect } from '@playwright/test';

test('Risk 02 - High severity defect without workaround blocks release', async () => {
  const highSeverityDefect = true;
  const workaroundExists = false;

  const releaseDecision =
    highSeverityDefect && !workaroundExists
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});