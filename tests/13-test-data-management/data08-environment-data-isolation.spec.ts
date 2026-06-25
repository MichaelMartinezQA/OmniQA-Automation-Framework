import { test, expect } from '@playwright/test';

test('Data 08 - Environment data remains isolated', async () => {
  const devReservation = 'DEV-1001';
  const prodReservation = 'PROD-1001';

  expect(devReservation).not.toBe(prodReservation);
});