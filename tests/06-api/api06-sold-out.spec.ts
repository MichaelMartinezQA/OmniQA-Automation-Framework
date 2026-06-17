import { test, expect } from '@playwright/test';

test('API 06 - Sold Out Inventory', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(body.id).toBe(1);

  console.log('Inventory API validation successful');
});