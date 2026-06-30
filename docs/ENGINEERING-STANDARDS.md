# OMNIQA Engineering Standards

## Purpose

This document defines the engineering standards for all OMNIQA contributors, including human engineers and AI coding assistants such as Codex. It establishes the expectations for architecture, automation stability, migration safety, local validation, documentation, and responsible change management across the project.

---

## Project Vision

OMNIQA is an enterprise quality engineering platform.

Travel is Version 1.

Future enterprise applications include Healthcare, Banking, Finance, and additional industries.

The platform should demonstrate:

- Enterprise Architecture
- Quality Engineering
- Automation
- Business Rules
- AI
- Reporting
- Analytics
- Security
- Accessibility
- Performance
- Documentation

---

## Repository Architecture

`/`

Enterprise Homepage

`/travel/`

Travel Platform

Future:

`/healthcare/`

`/banking/`

The Enterprise Homepage is not the Travel application.

---

## Local Development Environment

Development machine:

- Older Intel MacBook Pro
- macOS Ventura

Supported local browsers:

- Chromium
- Firefox

WebKit is intentionally disabled for local development.

Do not attempt to execute WebKit locally.

---

## Standard Playwright Commands

Local validation:

```bash
npx playwright test --project=chromium --project=firefox
```

Do not use WebKit for local validation.

---

## Automation Standards

Preserve automation stability.

Never rename or remove automation IDs without approval.

When migrating functionality:

Prefer routing changes before locator changes.

Avoid breaking existing tests.

---

## Page Object Standards

Use page objects whenever practical.

Avoid direct `page.goto()` calls unless specifically required.

When routes change:

Update page objects first.

Update direct-navigation tests afterward.

---

## Locator Standards

Automation IDs are considered part of the public automation contract.

Do not rename IDs without an approved migration plan.

Preserve existing selectors whenever possible.

---

## Migration Standards

Large architectural changes must occur in phases.

Typical order:

1. Analysis
2. Migration Plan
3. Implementation
4. Validation
5. Cleanup

Avoid large "big bang" refactors.

---

## Testing Standards

After every engineering change:

Run only the suites impacted.

Do not run unnecessary tests.

Local success criteria:

Chromium

Firefox

---

## Git Standards

Keep commits focused.

One engineering objective per commit whenever practical.

Avoid unrelated file modifications.

Document architectural decisions.

---

## Codex Operating Rules

Before making changes:

- Analyze first.
- Do not redesign without approval.
- Minimize the number of modified files.
- Preserve existing functionality.
- Preserve automation IDs.
- Prefer complete implementations over partial edits.
- Explain every modified file.
- Stop after completing the requested engineering change.

---

## AI Roles and Responsibilities

OMNIQA uses multiple AI tools with distinct responsibilities.

### ChatGPT

Primary responsibilities:

- Enterprise Architecture
- Product Architecture
- Quality Engineering Strategy
- Business Rules
- Engineering Reviews
- Migration Planning
- Technical Decision Support
- Long-term Platform Design

ChatGPT should be consulted before major architectural changes.

### Codex

Primary responsibilities:

- Repository analysis
- Code implementation
- Refactoring
- Bug fixes
- Test execution
- Documentation updates
- Safe code generation

Codex should implement approved engineering work but should not make major architectural decisions independently.

---

## Engineering Change Requests (ECR)

Major architectural work should be tracked as Engineering Change Requests.

Each ECR should contain:

- Objective
- Business justification
- Technical scope
- Risks
- Files impacted
- Validation plan
- Completion status

Avoid combining multiple ECRs into a single implementation.

---

## Enterprise Design Principles

Every implementation should support the long-term vision of OMNIQA as an enterprise platform.

Prioritize:

- Scalability
- Maintainability
- Separation of concerns
- Reusability
- Testability
- Accessibility
- Performance
- Security
- Documentation

Avoid short-term solutions that create unnecessary technical debt.

---

## Definition of Done

An engineering change is complete when:

- Requirements are satisfied.
- Existing functionality is preserved.
- Chromium passes.
- Firefox passes.
- No unnecessary files were modified.
- Changes are documented.
- Ready for architectural review before continuing.
