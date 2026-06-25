import { test, expect } from '@playwright/test';

test('API 08 - Invalid cancellation type', async ({ request }) => {
  await request.post('http://localhost:3000/api/reset');

  const response = await request.post(
    'http://localhost:3000/api/cancel',
    {
      data: {
        type: 'helicopter'
      }
    }
  );

  expect(response.status()).toBe(400);

  const data = await response.json();

  expect(data.success).toBe(false);
  expect(data.message).toBe('Invalid cancellation type');
});