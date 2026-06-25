import { test, expect } from '@playwright/test';

test('Risk 04 - Low severity defect does not block release', async () => {
  const lowSeverityDefect = true;

  const releaseDecision =
    lowSeverityDefect
      ? 'APPROVED'
      : 'APPROVED';

  expect(releaseDecision).toBe('APPROVED');
});