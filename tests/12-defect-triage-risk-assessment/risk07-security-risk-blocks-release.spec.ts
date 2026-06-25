import { test, expect } from '@playwright/test';

test('Risk 07 - Security vulnerability blocks release', async () => {
  const securityVulnerabilityExists = true;
  const severity = 'Critical';

  const releaseDecision =
    securityVulnerabilityExists && severity === 'Critical'
      ? 'BLOCKED'
      : 'APPROVED';

  expect(releaseDecision).toBe('BLOCKED');
});