import { test, expect } from '@playwright/test';

test('API 05 - Sold out inventory blocked', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  // Book all available rooms
  for (let i = 0; i < 5; i++) {
    const bookingResponse = await request.post(
      'http://localhost:3000/api/booking',
      {
        data: {
          type: 'room'
        }
      }
    );

    expect(bookingResponse.status()).toBe(200);
  }

  const inventoryResponse = await request.get(
    'http://localhost:3000/api/inventory'
  );

  const inventory = await inventoryResponse.json();

  expect(inventory.rooms).toBe(0);

  // Attempt one additional booking
  const soldOutResponse = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: 'room'
      }
    }
  );

  expect(soldOutResponse.status()).toBe(400);

  const errorResponse = await soldOutResponse.json();

  expect(errorResponse.success).toBe(false);
  expect(errorResponse.message).toBe('No rooms available');
});