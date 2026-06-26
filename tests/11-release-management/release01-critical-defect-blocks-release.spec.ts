import { test, expect } from '@playwright/test';

test('Release 01 - Critical defect blocks release', async () => {

  function getReleaseMetrics() {
    return {
      criticalDefects: 1,
      highSeverityDefects: 0,
      smokeTestsPassed: true,
      securityTestsPassed: true
    };
  }

  const releaseMetrics = getReleaseMetrics();

  const releaseApproved =
    releaseMetrics.criticalDefects === 0 &&
    releaseMetrics.highSeverityDefects === 0 &&
    releaseMetrics.smokeTestsPassed &&
    releaseMetrics.securityTestsPassed;

  expect(releaseApproved).toBe(false);

});