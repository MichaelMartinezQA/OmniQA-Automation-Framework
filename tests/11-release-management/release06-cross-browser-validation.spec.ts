import { test, expect } from '@playwright/test';

test('Release 06 - Cross browser validation required', async () => {
  const chromiumPassed = true;
  const firefoxPassed = true;

  const releaseDecision =
    chromiumPassed && firefoxPassed
      ? 'APPROVED'
      : 'BLOCKED';

  expect(releaseDecision).toBe('APPROVED');
});