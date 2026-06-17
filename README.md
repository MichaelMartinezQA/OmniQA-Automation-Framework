# OmniQA Automation Framework

## Overview

OmniQA is a Playwright-based automation framework built on a custom travel reservation application designed specifically for quality assurance training, portfolio development, and real-world business risk testing.

The application and test suites were intentionally designed to simulate production-style travel booking workflows, including reservations, payments, inventory management, cancellations, promotions, validation logic, and sold-out inventory scenarios.

This project demonstrates QA leadership, risk analysis, automation strategy, and Playwright test development using TypeScript.

---

## Technology Stack

* Playwright
* TypeScript
* Node.js
* Git
* GitHub
* GitHub Actions (CI/CD)

---

## Current Automation Results

### Cross-Browser Validation

✅ Chromium: 58 Passed

✅ Firefox: 58 Passed

✅ Total: 116 Passed

✅ Failed: 0

### Latest Regression Status

The current regression suite executes successfully across Chromium and Firefox with all tests passing.

---

## Test Suites

### 01 - Smoke

Core application availability and functionality validation.

### 02 - Regression

Regression coverage for previously validated functionality.

### 03 - Negative Testing

Validation of invalid inputs, error handling, and defensive controls.

### 04 - Payments

Credit card validation, expiration handling, CVV validation, payment success, decline, and timeout scenarios.

### 05 - Promo Codes

Promotion code validation, expired codes, reused codes, maximum discounts, and stacking prevention.

### 06 - API Testing

API status validation, response verification, and endpoint testing.

### 07 - Show Stopper Testing

Critical defects capable of preventing bookings or major user workflows.

### 08 - Business Risk Testing

High-risk business scenarios that may result in revenue loss, inventory issues, or customer-impacting defects.

### 09 - Reservation Management

Comprehensive reservation lifecycle coverage:

* Refundable Reservations
* Non-Refundable Reservations
* Reservation Modifications
* Cancellation Workflows
* 72-Hour Holds
* Inventory Reduction
* Inventory Restoration
* Sold-Out Inventory Validation
* Seasonal Pricing Validation

---

## Inventory Management

The OmniQA application includes inventory tracking for:

### Rooms

Starting Inventory: 5

### Staterooms

Starting Inventory: 3

Inventory is automatically reduced during booking and restored when eligible reservations are cancelled.

---

## Sold-Out Inventory Validation

The framework includes a dedicated sold-out testing period:

### July 13, 2027 – July 20, 2027

This date range is intentionally configured to support automated testing of:

* Sold-Out Inventory
* Reservation Blocking
* Business Risk Validation
* Inventory Management Workflows

---

## Business Scenarios Covered

* Travel Reservations
* Payment Processing
* Inventory Management
* Refundable Bookings
* Non-Refundable Bookings
* Reservation Modifications
* Cancellation Rules
* Promotional Discounts
* Seasonal Pricing
* API Validation
* Business Risk Analysis

---

## GitHub Actions

The project includes automated execution through GitHub Actions for continuous integration and validation.

---

## About the Author

Michael Martinez

Quality Assurance Director with 15+ years of experience across hospitality, travel, telecommunications, customer experience, software quality assurance, and business risk analysis.

This repository was created to demonstrate practical QA leadership, automation strategy, and Playwright automation development.

GitHub: MichaelMartinezQA
