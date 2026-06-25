import { test, expect } from '@playwright/test';

test('Risk 03 - High severity defect with approved workaround allows release', async () => {
  const highSeverityDefect = true;
  const workaroundExists = true;
  const businessApproval = true;

  const releaseDecision =
    highSeverityDefect && workaroundExists && businessApproval
      ? 'APPROVED'
      : 'BLOCKED';

  expect(releaseDecision).toBe('APPROVED');
});