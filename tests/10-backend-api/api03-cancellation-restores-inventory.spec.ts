import { test, expect } from '@playwright/test';

test('API 03 - Cancellation restores inventory', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const bookingResponse = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(bookingResponse.status()).toBe(200);

  const cancellationResponse = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(cancellationResponse.status()).toBe(200);

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  expect(inventoryResponse.status()).toBe(200);

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(5);
});