import { test, expect } from '@playwright/test';

test('Release 04 - API outage blocks release', async () => {
  const apiAvailable = false;

  const releaseDecision = apiAvailable
    ? 'APPROVED'
    : 'BLOCKED';

  expect(releaseDecision).toBe('BLOCKED');
});