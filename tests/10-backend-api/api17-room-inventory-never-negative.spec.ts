import { test, expect } from '@playwright/test';

test('API 17 - Room inventory never negative', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  for (let i = 0; i < 5; i++) {
    await request.post(
      'http://localhost:3000/api/booking',
      {
        data: {
          type: 'room'
        }
      }
    );
  }

  await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'room'
      }
    }
  );

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(0);
});