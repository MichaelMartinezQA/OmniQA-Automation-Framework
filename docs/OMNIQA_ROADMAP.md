# OMNIQA Roadmap

## Current State

OMNIQA currently includes:

- Enterprise Homepage at `/`
- Platforms page at `/platforms/`
- Travel Platform at `/travel/`
- Express API server
- SQLite-backed production inventory support
- Playwright automation framework
- Page object support
- GitHub Actions CI/CD validation
- Documentation for engineering standards, enterprise architecture, and quality strategy

The README describes the project as a production-style Quality Assurance Automation Framework that simulates a travel and hospitality reservation platform using modern testing practices, CI/CD, and production-inspired business rules.

## Current Product Surface

### Homepage

The homepage presents OMNIQA branding and routes users toward platform exploration.

### Platforms

The platform page presents:

- Travel
- Healthcare
- Banking

Travel is available. Healthcare and Banking are marked `In Development`.

### Travel

The Travel application supports:

- Search
- Destination selection
- Travel type selection
- Email and travel date validation
- Promo code validation
- Payment validation
- Booking
- Reservation modification
- Cancellation
- Confirmation number display
- Price display
- Inventory status display

## Known Gaps

These gaps are based on existing repository direction and current project structure:

- Healthcare and Banking are present as future platform concepts, not implemented applications.
- Some production inventory model notes exist outside the centralized `/docs` system.
- The current Travel UI and API inventory behavior are not yet fully unified around one documented architecture source.
- The enterprise platform vision is spread across README, architecture notes, engineering standards, and inventory planning notes.
- AI-assisted quality engineering is identified as future direction, not implemented platform behavior.
- Reporting, analytics, and executive dashboards are identified as platform goals, not complete product modules.

## Future Enhancements

### Inventory Model Expansion

Existing inventory model direction includes:

- Hotel Inventory
- Cruise Inventory
- Real-Time Availability
- Reservation Management
- Cancellation Processing
- Sold-Out Validation
- Transactional Inventory
- Parallel Worker Support
- Future AI Release Readiness

Hotel model:

- Miami: 400 total rooms
- Cancun: 500 total rooms
- Punta Cana: 400 total rooms

Room distribution:

- Garden / Resort View: 75% of inventory
- Partial Ocean View: 20% of inventory
- Ocean Front: 5% of inventory

Cruise model:

- OmniQA Explorer: Bahamas
- OmniQA Horizon: Western Caribbean
- OmniQA Voyager: Eastern Caribbean

Cruise inventory:

- 1000 total staterooms per ship
- 3-day, 4-day, and 7-day cruises
- Dynamic sailing dates by year
- Stateroom inventory attached to each sailing date

### Booking System Realism

Existing production model direction supports evolution toward:

- Real-time availability
- Transactional inventory
- Cancellation processing
- Sold-out validation
- Parallel worker support
- Reservation auditability

### Multi-Platform Evolution

The long-term platform direction includes:

- Healthcare
- Banking
- Finance
- Additional industries

Travel remains Version 1.

### UI/UX Improvements

Current UI/UX direction includes:

- Minimal enterprise homepage
- Platform selector
- Enterprise card model
- Responsive layout
- Lightweight visual experience
- Homepage motion and optional sound experimentation

UI changes must preserve automation stability and must not modify Travel automation IDs without an approved migration plan.

### Quality Engineering Expansion

Future quality engineering capabilities already identified include:

- Executive Dashboards
- Historical Trends
- Test Execution Metrics
- Defect Analytics
- Risk Reporting
- Release Readiness Reporting
- AI Generated Test Cases
- AI Failure Analysis
- AI Risk Detection
- Intelligent Regression Selection
- Test Impact Analysis
- Self-Healing Automation

## Roadmap Principles

Future work should follow established OMNIQA engineering standards:

- Analyze first.
- Plan migrations before implementation.
- Preserve automation IDs.
- Prefer routing changes before locator changes.
- Avoid big-bang refactors.
- Keep commits focused.
- Document architectural decisions.
- Validate impacted suites in Chromium and Firefox locally.

