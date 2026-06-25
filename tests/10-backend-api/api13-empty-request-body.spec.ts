import { test, expect } from '@playwright/test';

test('API 13 - Empty request body', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.post(
    'http://localhost:3000/api/booking',
    {
      data: {}
    }
  );

  expect(response.status()).toBe(400);

  const data = await response.json();

  expect(data.success).toBe(false);
});