import { test, expect } from '@playwright/test';

test('Data 06 - Bulk test data generation', async () => {
  const reservations = [];

  for (let i = 1; i <= 100; i++) {
    reservations.push(`RES-${i}`);
  }

  expect(reservations.length).toBe(100);
  expect(reservations[0]).toBe('RES-1');
  expect(reservations[99]).toBe('RES-100');
});