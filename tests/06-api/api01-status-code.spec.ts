import { test, expect } from '@playwright/test';

test('API 01 - Status Code Checks', async ({ request }) => {
  // Successful request (200)
  let response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);

  // Request that causes a 404 (Not Found)
  response = await request.get('https://jsonplaceholder.typicode.com/nonexistent');
  expect(response.status()).toBe(404);
});