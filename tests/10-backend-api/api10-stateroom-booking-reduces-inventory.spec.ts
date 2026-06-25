import { test, expect } from '@playwright/test';

test('API 10 - Stateroom booking reduces inventory', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const bookingResponse = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'stateroom'
      }
    }
  );

  expect(bookingResponse.status()).toBe(200);

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.staterooms).toBe(2);
});