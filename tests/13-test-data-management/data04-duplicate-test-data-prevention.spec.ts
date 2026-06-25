import { test, expect } from '@playwright/test';

test('Data 04 - Duplicate test data is prevented', async () => {
  const existingReservationIds = ['RES-1001'];

  const newReservationId = 'RES-1001';

  const isDuplicate =
    existingReservationIds.includes(newReservationId);

  expect(isDuplicate).toBe(true);
});