import { test, expect } from '@playwright/test';

test('Reservation 07 - Non-refundable acknowledgement checkbox required', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.fill('#email', 'checkboxrequired@test.com');

  await page.fill('#travelDate', '2027-08-15');

  await page.selectOption('#reservationType', 'non-refundable');

  await page.fill('#creditCard', '4111111111111111');

  await page.fill('#expirationDate', '12/30');

  await page.fill('#cvv', '123');

  await page.click('#searchButton');

  await expect(page.locator('#paymentResult'))
    .toContainText('Payment successful');

  await page.click('#bookNowButton');

  await expect(page.locator('#bookingResult'))
    .toContainText(
      'Booking blocked: non-refundable acknowledgement is required'
    );

});