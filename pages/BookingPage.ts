import { expect, Locator, Page } from '@playwright/test';

export class BookingPage {
  readonly page: Page;

  readonly reservationType: Locator;
  readonly unitType: Locator;
  readonly travelDate: Locator;
  readonly nonRefundableAcknowledgement: Locator;

  readonly bookNowButton: Locator;
  readonly modifyReservationButton: Locator;
  readonly saveReservationChangesButton: Locator;
  readonly cancelReservationButton: Locator;

  readonly bookingResult: Locator;
  readonly reservationChangeResult: Locator;
  readonly cancellationResult: Locator;
  readonly confirmationNumber: Locator;

  constructor(page: Page) {
    this.page = page;

    this.reservationType = page.locator('#reservationType');
    this.unitType = page.locator('#unitType');
    this.travelDate = page.locator('#travelDate');
    this.nonRefundableAcknowledgement = page.locator('#nonRefundableAcknowledgement');

    this.bookNowButton = page.locator('#bookNowButton');
    this.modifyReservationButton = page.locator('#modifyReservationButton');
    this.saveReservationChangesButton = page.locator('#saveReservationChangesButton');
    this.cancelReservationButton = page.locator('#cancelReservationButton');

    this.bookingResult = page.locator('#bookingResult');
    this.reservationChangeResult = page.locator('#reservationChangeResult');
    this.cancellationResult = page.locator('#cancellationResult');
    this.confirmationNumber = page.locator('#confirmationNumber');
  }

  async selectReservationType(type: string) {
    await this.reservationType.selectOption(type);
  }

  async selectUnitType(type: string) {
    await this.unitType.selectOption(type);
  }

  async selectTravelDate(date: string) {
    await this.travelDate.fill(date);
  }

  async checkNonRefundableAcknowledgement() {
    await this.nonRefundableAcknowledgement.check();
  }

  async clickBookNow() {
    await this.bookNowButton.click();
  }

  async clickModifyReservation() {
    await this.modifyReservationButton.click();
  }

  async clickSaveReservationChanges() {
    await this.saveReservationChangesButton.click();
  }

  async clickCancelReservation() {
    await this.cancelReservationButton.click();
  }

  async expectBookingSuccessful() {
    await expect(this.bookingResult).toBeVisible();
  }

  async expectBookingResult(text: string) {
    await expect(this.bookingResult).toHaveText(text);
  }

  async expectBookingResultContains(text: string) {
    await expect(this.bookingResult).toContainText(text);
  }

  async expectReservationChangeResult(text: string) {
    await expect(this.reservationChangeResult).toHaveText(text);
  }

  async expectReservationChangeResultContains(text: string) {
    await expect(this.reservationChangeResult).toContainText(text);
  }

  async expectCancellationResult(text: string) {
    await expect(this.cancellationResult).toHaveText(text);
  }

  async expectCancellationResultContains(text: string) {
    await expect(this.cancellationResult).toContainText(text);
  }

  async expectConfirmationNumberVisible() {
    await expect(this.confirmationNumber).toBeVisible();
  }

  async expectConfirmationNumberContains(text: string) {
    await expect(this.confirmationNumber).toContainText(text);
  }
}