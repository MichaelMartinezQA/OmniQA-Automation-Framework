import { test, expect } from '@playwright/test';

test('API 09 - Missing cancellation type', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {}
    }
  );

  expect(response.status()).toBe(400);

  const data = await response.json();

  expect(data.success).toBe(false);
  expect(data.message).toBe('Invalid cancellation type');
});