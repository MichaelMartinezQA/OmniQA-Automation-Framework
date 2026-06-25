import { test, expect } from '@playwright/test';

test('API 14 - Null booking type', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {
        type: null
      }
    }
  );

  expect(response.status()).toBe(400);

  const data = await response.json();

  expect(data.success).toBe(false);
});