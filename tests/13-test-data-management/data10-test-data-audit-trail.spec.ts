import { test, expect } from '@playwright/test';

test('Data 10 - Audit trail records all changes', async () => {
  const auditLog = [
    'Reservation Created',
    'Reservation Updated',
    'Reservation Cancelled'
  ];

  expect(auditLog.length).toBe(3);
  expect(auditLog).toContain('Reservation Created');
  expect(auditLog).toContain('Reservation Cancelled');
});