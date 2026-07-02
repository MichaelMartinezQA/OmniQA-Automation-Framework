# OMNIQA Engineering Standards

## Purpose

This document defines engineering standards for OMNIQA contributors, including human engineers and AI coding assistants such as Codex.

It consolidates standards for architecture, automation stability, migration safety, local validation, documentation, and responsible change management.

## Repository Architecture Standards

The Enterprise Homepage is not the Travel application.

Current routes:

```text
/
Enterprise Homepage

/platforms/
Enterprise platform selector

/travel/
Travel Platform
```

Future routes:

```text
/healthcare/
/banking/
```

## Local Development Environment

Development machine:

- Older Intel MacBook Pro
- macOS Ventura

Supported local browsers:

- Chromium
- Firefox

WebKit is intentionally disabled for local development. Do not attempt to execute WebKit locally.

## Standard Playwright Commands

Local validation:

```bash
npx playwright test --project=chromium --project=firefox
```

Do not use WebKit for local validation.

GitHub Actions may execute Chromium, Firefox, and WebKit.

## Playwright Testing Standards

Use Playwright page objects whenever practical.

Avoid direct `page.goto()` calls unless specifically required.

When routes change:

1. Update page objects first.
2. Update direct-navigation tests afterward.
3. Preserve selector contracts.
4. Run impacted suites only.

## Selector Stability Rules

Automation IDs are considered part of the public automation contract.

Never rename or remove automation IDs without approval.

Preserve existing selectors whenever possible.

When migrating functionality, prefer routing changes before locator changes.

## Migration Safety Rules

Large architectural changes must occur in phases.

Typical order:

1. Analysis
2. Migration Plan
3. Implementation
4. Validation
5. Cleanup

Avoid large big-bang refactors.

Preserve existing behavior unless the change request explicitly approves behavior changes.

## CI/CD Expectations

Every push and pull request should execute automated validation through GitHub Actions.

The README identifies GitHub Actions validation across:

- Chromium
- Firefox
- WebKit

Playwright reports are published as workflow artifacts for successful execution.

## Local Validation Requirements

After every engineering change:

- Run only impacted suites.
- Do not run unnecessary tests.
- Validate Chromium and Firefox locally.
- Do not execute WebKit locally.

## Git Standards

Keep commits focused.

Use one engineering objective per commit whenever practical.

Avoid unrelated file modifications.

Document architectural decisions.

## AI Roles And Responsibilities

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

## Engineering Change Requests

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

## Definition Of Done

An engineering change is complete when:

- Requirements are satisfied.
- Existing functionality is preserved.
- Chromium passes.
- Firefox passes.
- No unnecessary files were modified.
- Changes are documented.
- Ready for architectural review before continuing.

