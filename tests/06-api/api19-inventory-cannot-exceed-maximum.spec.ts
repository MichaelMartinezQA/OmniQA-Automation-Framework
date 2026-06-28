import { test, expect } from '@playwright/test';

test('API 19 - Inventory cannot exceed maximum', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(response.status()).toBe(400);

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(5);
});