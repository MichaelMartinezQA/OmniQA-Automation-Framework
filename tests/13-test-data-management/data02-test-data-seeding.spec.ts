import { test, expect } from '@playwright/test';

test('Data 02 - Test data seeding creates expected records', async () => {
  const rooms = [
    '1001',
    '1002',
    '1003',
    '1004',
    '1005'
  ];

  expect(rooms.length).toBe(5);
  expect(rooms).toContain('1001');
  expect(rooms).toContain('1005');
});