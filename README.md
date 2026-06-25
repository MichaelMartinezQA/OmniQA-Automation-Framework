# OmniQA Automation Framework

## Latest Official Regression Results

✅ 216 Passed

✅ 0 Failed

✅ Chromium: 108 Passed

✅ Firefox: 108 Passed

✅ Execution Time: 1.4 Minutes

![Official Regression Results](docs/screenshots/official-regression-136-passed.png)

---

# Overview

OmniQA is a production-style Quality Assurance Automation Framework built with Playwright, TypeScript, Node.js, SQLite, GitHub Actions, and a custom travel reservation application.

The framework was designed to simulate real-world hospitality and travel reservation systems while demonstrating automation engineering, quality leadership, risk analysis, release management, inventory management, defect triage, and business-critical validation.

This repository serves as both a technical portfolio and a demonstration of practical QA leadership principles used in enterprise software environments.

---

# Technology Stack

* Playwright
* TypeScript
* Node.js
* SQLite
* Express.js
* Git
* GitHub
* GitHub Actions
* CI/CD Automation

---

# Current Project Metrics

## Automated Coverage

```text
108 Automated Tests
216 Cross-Browser Executions

108 Chromium Passed
108 Firefox Passed

216 Passed
0 Failed
```

## Production Inventory Database

```text
1300 Hotel Rooms
177 Cruise Sailings
177000 Cruise Staterooms
```

## Database Components

* Hotel Room Inventory
* Cruise Sailing Inventory
* Cruise Stateroom Inventory
* Reservations Table
* Audit Log Table

---

# Test Suite Organization

## 01 - Smoke Testing

5 Automated Tests

Validates:

* Homepage Availability
* Search Functionality
* Navigation
* Booking Access
* Core User Flows

---

## 02 - Regression Testing

5 Automated Tests

Validates:

* Existing Functionality
* Booking Flows
* Search Results
* Navigation Elements
* Form Submission

---

## 03 - Negative Testing

6 Automated Tests

Validates:

* Invalid Search Inputs
* Invalid Email Formats
* Missing Travel Dates
* Missing Credit Cards
* Missing Required Fields
* Invalid User Actions

---

## 04 - Payments Testing

6 Automated Tests

Validates:

* Successful Payments
* Declined Cards
* Expired Cards
* Invalid CVV
* Payment Timeout Handling
* Card Length Validation

---

## 05 - Promo Code Testing

5 Automated Tests

Validates:

* Valid Promo Codes
* Expired Promo Codes
* Reused Promo Codes
* Invalid Promo Codes
* Empty Promo Codes

---

## 06 - API Testing

6 Automated Tests

Validates:

* Status Codes
* Response Times
* Response Schemas
* Invalid Requests
* Authentication
* Sold-Out Inventory APIs

---

## 07 - Show Stopper Testing

5 Automated Tests

Validates critical defects capable of blocking production deployment.

Coverage includes:

* Booking Failures
* Payment Failures
* Date Validation
* Search Failures
* Critical User Journeys

---

## 08 - Business Risk Testing

5 Automated Tests

Validates:

* Duplicate Booking Prevention
* Past Date Prevention
* Inventory Validation
* Pricing Risks
* Booking Confirmation Validation

---

## 09 - Reservation Management

15 Automated Tests

Coverage includes:

* Refundable Reservations
* Non-Refundable Reservations
* Reservation Changes
* Cancellation Rules
* Hold Periods
* Inventory Reduction
* Inventory Restoration
* Seasonal Pricing
* Sold-Out Inventory Validation

---

## 10 - Backend API Testing

20 Automated Tests

Coverage includes:

* Inventory Retrieval
* Inventory Reduction
* Inventory Restoration
* Sold-Out Validation
* Double Cancellation Prevention
* Invalid Request Handling
* Request Validation
* Stateroom Inventory Management
* Inventory Boundary Protection
* Multi-Booking Consistency

---

## 11 - Release Management

10 Automated Tests

Coverage includes:

* Critical Defect Validation
* Payment Failure Risk
* API Outage Risk
* Revenue Risk Assessment
* Smoke Suite Requirements
* Production Readiness Validation
* Final Release Approval Logic

---

## 12 - Defect Triage & Risk Assessment

10 Automated Tests

Coverage includes:

* Critical Production Defects
* High Severity Defects
* Workaround Validation
* Security Risks
* Compliance Risks
* VIP Customer Impact
* Executive Risk Reviews

---

## 13 - Test Data Management

10 Automated Tests

Coverage includes:

* Test Data Reset
* Test Data Seeding
* Cleanup Processes
* Duplicate Prevention
* Bulk Data Generation
* Environment Isolation
* Production Data Protection
* Audit Trail Validation

---

# Inventory Management System

OmniQA includes inventory tracking for multiple travel products.

## Room Inventory

```text
Maximum Inventory: 5
```

## Stateroom Inventory

```text
Maximum Inventory: 3
```

Coverage Includes:

* Inventory Reduction
* Inventory Restoration
* Sold-Out Validation
* Reservation Blocking
* Inventory Boundary Protection

---

# Production Database APIs

## Inventory Summary

Returns:

* Hotel Rooms
* Cruise Sailings
* Cruise Staterooms
* Reservation Counts
* Audit Log Counts

## Hotel Inventory API

Returns:

* Available Rooms
* Room Metadata
* Destination Inventory

## Cruise Inventory API

Returns:

* Sailing Schedules
* Cruise Destinations
* Sailing Availability

---

# Official Sold-Out Inventory Period

The framework contains a dedicated sold-out inventory period used for automated validation.

```text
July 13, 2027
through
July 20, 2027
```

Coverage Includes:

* Sold-Out Inventory Testing
* Reservation Blocking
* Business Risk Testing
* Inventory Management Validation

---

# Cross-Browser Validation

Validated Browsers:

✅ Chromium

✅ Firefox

Results:

```text
108 Chromium Passed
108 Firefox Passed

216 Passed
0 Failed
```

---

# Continuous Integration

GitHub Actions automatically executes the OmniQA regression suite and validates framework stability on every commit.

Coverage Includes:

* Automated Execution
* Regression Validation
* Cross-Browser Testing
* Continuous Quality Monitoring

---

# Professional Focus Areas Demonstrated

This framework demonstrates practical experience in:

* Software Quality Assurance
* Test Automation
* Risk Analysis
* Release Management
* Inventory Management
* Defect Triage
* Business Critical Validation
* API Testing
* Cross-Browser Testing
* CI/CD Automation
* Test Data Management
* Hospitality Technology
* Travel Technology

---

# About the Author

## Michael Martinez

Quality Assurance Director with 15+ years of experience across:

* Hospitality
* Travel
* Telecommunications
* Customer Experience
* Software Quality Assurance
* Business Risk Analysis

Professional background includes leadership roles supporting quality strategy, operational excellence, risk reduction, automation initiatives, and customer experience optimization.

GitHub:

MichaelMartinezQA

---

If the OmniQA application or supporting environment is unavailable, please contact me through GitHub or LinkedIn and I will gladly assist with verification.
