import { test, expect } from '@playwright/test';

test('API 01 - Get Inventory', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.get(
    'http://localhost:3000/api/inventory'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.rooms).toBe(5);
  expect(data.staterooms).toBe(3);
});