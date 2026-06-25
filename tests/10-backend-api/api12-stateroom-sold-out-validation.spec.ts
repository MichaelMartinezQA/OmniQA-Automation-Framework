import { test, expect } from '@playwright/test';

test('API 12 - Stateroom sold out validation', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  for (let i = 0; i < 3; i++) {
    const bookingResponse = await request.post(
      'http://localhost:3000/api/booking',
      {
        data: {
          type: 'stateroom'
        }
      }
    );

    expect(bookingResponse.status()).toBe(200);
  }

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.staterooms).toBe(0);

  const soldOutResponse = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'stateroom'
      }
    }
  );

  expect(soldOutResponse.status()).toBe(400);

  const data = await soldOutResponse.json();

  expect(data.success).toBe(false);
  expect(data.message).toBe('No staterooms available');
});