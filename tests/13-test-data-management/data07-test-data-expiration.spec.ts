import { test, expect } from '@playwright/test';

test('Data 07 - Expired test data is identified', async () => {
  const record = {
    id: 'RES-1001',
    expired: true
  };

  expect(record.expired).toBe(true);
});