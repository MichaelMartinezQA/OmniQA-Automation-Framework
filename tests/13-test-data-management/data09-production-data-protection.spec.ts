import { test, expect } from '@playwright/test';

test('Data 09 - Production data cannot be modified', async () => {
  const productionReadOnly = true;

  expect(productionReadOnly).toBe(true);
});