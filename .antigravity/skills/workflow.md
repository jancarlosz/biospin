# Development Workflow

## Purpose

This document defines how development work must be performed in the BioSpin project.

The project must be developed incrementally.

Never attempt to build the entire application in one large change.

Break large work into small, verifiable tasks.

---

## 1. Before Coding

Before implementing any feature:

1. Understand the requested requirement.
2. Check `AGENTS.md`.
3. Read the relevant skill files.
4. Check `docs/PROJECT-SPEC.md`.
5. Check `docs/PROPOSAL.md` when scope or contractual inclusion matters.
6. Inspect the current codebase.
7. Identify existing components, utilities and patterns that can be reused.
8. Identify affected files and systems.
9. Check whether the requirement is within the agreed scope.

Do not start by generating large amounts of code without understanding the existing project.

---

## 2. Analyze the Task

For every task, identify:

* functional requirements;
* technical requirements;
* scope limitations;
* dependencies;
* data requirements;
* validation requirements;
* authentication requirements;
* security considerations;
* edge cases.

For simple tasks, keep the analysis concise.

For complex tasks, divide the work into smaller steps.

---

## 3. Plan Before Implementation

Before modifying code, determine:

* which files will be created;
* which files will be modified;
* whether the database is affected;
* whether a migration is required;
* whether authentication is affected;
* whether an external integration is affected;
* whether existing functionality may be impacted.

Do not perform unrelated refactors while implementing a feature.

Keep the change focused.

---

## 4. Implementation Process

Use the following sequence:

### Step 1 — Analyze

Understand the requirement and inspect relevant existing code.

### Step 2 — Plan

Define the smallest safe implementation.

### Step 3 — Implement

Implement the feature using existing project conventions.

### Step 4 — Validate

Verify:

* TypeScript;
* imports;
* runtime behavior;
* validation;
* error states;
* responsive behavior when applicable.

### Step 5 — Review

Before completion:

* remove dead code;
* remove unnecessary debug logs;
* review naming;
* review security;
* review scope compliance;
* verify existing behavior was preserved.

---

## 5. Work Incrementally

Large features must be implemented in stages.

Example for a blog:

1. Define database model.
2. Create migration.
3. Implement data access.
4. Implement admin CRUD.
5. Implement public listing.
6. Implement individual post page.
7. Implement publication behavior.
8. Implement SEO.
9. Test the complete flow.

Do not create all layers simultaneously without validation.

---

## 6. Working With Existing Code

Before changing existing code:

* understand its purpose;
* preserve working behavior;
* identify dependencies;
* make the smallest safe change possible.

Do not replace a working implementation with a completely different architecture without a clear technical reason.

Avoid large refactors during feature work unless they are necessary to safely implement the requirement.

---

## 7. Database Workflow

When a feature affects the database:

1. Inspect the existing schema.
2. Check existing relationships.
3. Avoid duplicate entities.
4. Design the smallest appropriate schema change.
5. Create a migration.
6. Validate the migration.
7. Update affected validation and data access logic.

Never make undocumented schema changes.

---

## 8. External Integrations

Before integrating an external service:

1. Confirm the integration is within scope.
2. Isolate provider-specific logic.
3. Use environment variables for credentials.
4. Handle provider errors safely.
5. Avoid exposing internal errors to users.

Examples:

* Resend;
* image storage;
* analytics services.

---

## 9. Forms Workflow

When implementing or modifying a form:

1. Define the required fields.
2. Define validation rules.
3. Implement accessible UI.
4. Add client-side feedback.
5. Validate on the server.
6. Protect against duplicate submissions.
7. Handle success.
8. Handle failure.
9. Verify lead origin when applicable.
10. Test invalid and valid submissions.

Never trust client-side validation alone.

---

## 10. Authentication Workflow

When implementing or modifying administrative functionality:

1. Confirm authentication is required.
2. Protect the route.
3. Verify authorization.
4. Validate server-side access.
5. Handle unauthenticated access safely.
6. Test login and logout behavior.

Do not rely solely on hiding administrative UI.

---

## 11. Large Feature Workflow

For large features, use milestones.

### Foundation

Create the minimum technical structure.

### Core Functionality

Implement the primary behavior.

### UI

Build the user interface.

### Validation

Handle invalid data and error states.

### Integration

Connect external services.

### Quality

Test, review and optimize.

Do not skip directly from planning to a large final implementation.

---

## 12. Scope Changes

If a request appears outside the agreed scope:

1. Identify the difference.
2. Explain the technical impact.
3. Do not silently implement major functionality.
4. Wait for confirmation when the decision affects cost, timeline or architecture.

Examples:

* CRM;
* advanced lead dashboard;
* e-commerce;
* payment system;
* inventory;
* advanced roles;
* page builder;
* mobile app;
* complex automations.

---

## 13. Final Verification

Before completing a milestone, verify relevant items:

* production build;
* TypeScript;
* lint;
* critical user flows;
* forms;
* authentication;
* database behavior;
* error states;
* responsiveness;
* SEO basics;
* environment variables;
* security considerations.

---

## 14. Definition of Done

A task is complete only when:

* it meets the requirement;
* it is inside scope;
* it follows project architecture;
* inputs are validated;
* errors are handled;
* relevant security rules are followed;
* UI is responsive when applicable;
* existing functionality is not broken;
* relevant checks and tests have been performed.
