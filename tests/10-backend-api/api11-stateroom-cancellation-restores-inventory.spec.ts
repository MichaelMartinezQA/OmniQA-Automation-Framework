import { test, expect } from '@playwright/test';

test('API 11 - Stateroom cancellation restores inventory', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'stateroom'
      }
    }
  );

  const cancellationResponse = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'stateroom'
      }
    }
  );

  expect(cancellationResponse.status()).toBe(200);

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.staterooms).toBe(3);
});