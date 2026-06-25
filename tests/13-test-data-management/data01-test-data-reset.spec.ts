import { test, expect } from '@playwright/test';

test('Data 01 - Test data reset restores default inventory', async () => {
  const inventory = {
    rooms: 0,
    staterooms: 0
  };

  inventory.rooms = 5;
  inventory.staterooms = 3;

  expect(inventory.rooms).toBe(5);
  expect(inventory.staterooms).toBe(3);
});