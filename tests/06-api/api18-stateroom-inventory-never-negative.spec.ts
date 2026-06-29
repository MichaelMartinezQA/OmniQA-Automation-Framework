import { test, expect } from '@playwright/test';

test('API 18 - Stateroom inventory never negative', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  for (let i = 0; i < 3; i++) {
    await request.post(
      'http://localhost:3000/api/booking',
      {
        data: {
          type: 'stateroom'
        }
      }
    );
  }

  await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'stateroom'
      }
    }
  );

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.staterooms).toBe(0);
});