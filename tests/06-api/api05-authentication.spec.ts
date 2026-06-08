import { test, expect } from '@playwright/test';

test('API 05 - Authentication Test', async ({ request }) => {
  const response = await request.get(
    'https://postman-echo.com/get',
    {
      headers: {
        'Authorization': 'Bearer my-test-token'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Verify token was received (Postman Echo returns headers back)
  expect(body.headers).toHaveProperty('authorization');
  expect(body.headers.authorization).toBe('Bearer my-test-token');
});