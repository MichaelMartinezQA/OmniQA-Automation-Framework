import { test, expect } from '@playwright/test';

test('Data 05 - Invalid test data is rejected', async () => {
  const bookingRequest = {
    reservationId: '',
    email: ''
  };

  const valid =
    bookingRequest.reservationId.length > 0 &&
    bookingRequest.email.length > 0;

  expect(valid).toBe(false);
});