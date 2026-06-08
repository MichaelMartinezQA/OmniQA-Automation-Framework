import { test, expect } from '@playwright/test';

test('API 02 - Response Time', async ({ request }) => {
  const startTime = Date.now();

  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  const endTime = Date.now();
  const responseTime = endTime - startTime;

  console.log(`Response time: ${responseTime} ms`);
  
  // Assert response time is under 500 ms (you can adjust this threshold based on your needs)
  expect(responseTime).toBeLessThan(500);
});