import { test, expect } from '@playwright/test';

test('API 20 - Multiple booking consistency', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  for (let i = 0; i < 3; i++) {
    const response = await request.post(
      'http://localhost:3000/api/booking',
      {
        data: {
          type: 'room'
        }
      }
    );

    expect(response.status()).toBe(200);
  }

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(2);
});