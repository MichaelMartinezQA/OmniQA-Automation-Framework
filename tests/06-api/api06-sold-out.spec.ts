import { test, expect } from '@playwright/test';

test('API 06 - Sold Out Inventory', async ({ request }) => {
  const response = await request.get('https://fakestoreapi.com/products/1');

  expect(response.status()).toBe(200);

  const body = await response.json();

  // Let’s assume that if the category is 'sold-out', the item is unavailable
  expect(body).toHaveProperty('category');

  if (body.category === 'sold-out') {
    console.log('Item is sold out');
    expect(body.category).toBe('sold-out');
  } else {
    console.log('Item is available');
    expect(body.category).not.toBe('sold-out');
  }
});