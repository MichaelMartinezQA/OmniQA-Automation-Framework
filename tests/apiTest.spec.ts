import { test, expect, request } from '@playwright/test';

test('Fetch posts from placeholder API', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  // Add a simple assertion to ensure Playwright sees the test
  expect(1).toBe(1); 
});