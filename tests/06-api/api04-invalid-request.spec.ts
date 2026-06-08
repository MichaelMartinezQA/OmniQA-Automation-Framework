import { test, expect } from '@playwright/test';

test('API 04 - Invalid Request', async ({ request }) => {
  // Attempt to fetch an endpoint that doesn't exist
  const response = await request.get('https://jsonplaceholder.typicode.com/invalid-endpoint');

  // Expect a 404 Not Found status code
  expect(response.status()).toBe(404);
});