import { test, expect } from '@playwright/test';

test('API 04 - Double cancellation blocked', async ({ request }) => {
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

  const firstCancellation = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(firstCancellation.status()).toBe(200);

  const secondCancellation = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(secondCancellation.status()).toBe(400);

  const errorResponse = await secondCancellation.json();

  expect(errorResponse.success).toBe(false);

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(5);
});