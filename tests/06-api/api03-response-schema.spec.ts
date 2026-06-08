import { test, expect } from '@playwright/test';

test('API 03 - Response Schema', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Assert the response has expected keys
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('body');
});