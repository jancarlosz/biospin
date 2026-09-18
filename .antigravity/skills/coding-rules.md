# Coding Rules

## 1. General Principles

Write code that is:

* simple;
* readable;
* maintainable;
* consistent;
* easy to modify.

Prioritize clarity over cleverness.

Do not over-engineer.

Do not create abstractions before they are genuinely needed.

---

## 2. TypeScript

Use TypeScript strictly.

Rules:

* avoid `any`;
* type external data;
* use clear domain types;
* type complex function inputs;
* validate unknown data before using it;
* avoid unsafe type assertions.

Do not use `any` merely to bypass TypeScript errors.

Do not suppress errors without understanding their cause.

---

## 3. Naming

Use clear and descriptive names.

Prefer:

* `createPost`
* `updatePost`
* `deletePost`
* `getPublishedPosts`
* `sendLeadEmail`

Avoid:

* `data1`
* `thing`
* `stuff`
* `handleEverything`
* `temp`

Boolean variables should clearly express state:

* `isLoading`
* `isSubmitting`
* `isAuthenticated`
* `hasPermission`
* `canPublish`

---

## 4. Functions

Functions should have one clear responsibility.

Avoid very large functions containing:

* validation;
* database access;
* external API calls;
* business logic;
* formatting;
* UI concerns;

all mixed together.

Extract logic when doing so improves readability or reuse.

Do not split code into excessively small abstractions that make the execution flow difficult to understand.

---

## 5. React Components

Components must have clear responsibilities.

Prefer composition over monolithic components.

Reuse existing components and patterns where appropriate.

Do not create Client Components unless client-side interactivity is required.

Do not place unnecessary business logic inside presentation components.

---

## 6. Server and Client Boundaries

Prefer Server Components by default.

Use Client Components for:

* local interactive state;
* browser APIs;
* event handlers;
* interactive forms when required.

Do not fetch data on the client when server rendering is sufficient.

Do not expose server-only logic to client bundles.

---

## 7. State Management

Keep state as close as possible to where it is used.

Do not introduce global state for simple local problems.

Avoid duplicating server data unnecessarily.

Do not create complex state management unless the project genuinely requires it.

---

## 8. Validation

Never trust external input.

Validate:

* form data;
* route parameters;
* query parameters;
* API payloads;
* administrative mutations.

Client-side validation improves user experience.

Server-side validation is required for security.

Validation logic should be reusable when the same rules are needed in multiple places.

---

## 9. Error Handling

Never silently ignore errors.

Handle failures from:

* database operations;
* authentication;
* external services;
* form processing;
* uploads;
* invalid input.

User-facing error messages must be understandable.

Do not expose:

* stack traces;
* credentials;
* internal implementation details;
* provider secrets.

---

## 10. Code Duplication

Before writing new logic:

1. Check whether similar logic already exists.
2. Reuse existing code when appropriate.
3. Extract shared logic only when it is genuinely shared.

Do not create overly generic abstractions for a single use case.

---

## 11. Comments

Write self-explanatory code.

Use comments only when they explain:

* why a decision was made;
* an unusual business rule;
* a non-obvious technical constraint.

Do not comment obvious code.

---

## 12. Imports

Keep imports organized.

Remove unused imports.

Avoid circular dependencies.

Use consistent import patterns throughout the project.

---

## 13. Dependencies

Before adding a dependency:

1. Check whether the project already has a suitable solution.
2. Check whether Next.js or React provides a native solution.
3. Check whether the package is maintained.
4. Consider its complexity and size.
5. Add it only when justified.

Do not install dependencies for trivial functionality.

---

## 14. Logging

Do not leave unnecessary debug logs in production code.

Never log:

* passwords;
* tokens;
* API keys;
* secrets;
* sensitive personal data.

Errors may be logged server-side with enough context for maintenance, without exposing sensitive information.

---

## 15. Environment Variables

Never hardcode:

* API keys;
* tokens;
* passwords;
* database credentials;
* production secrets.

Use environment variables.

Never expose server secrets through public client environment variables.

---

## 16. Commit Rules

Use clear and focused commits.

Preferred format:

* `feat: add contact form validation`
* `feat: create post management`
* `fix: correct lead origin detection`
* `fix: prevent duplicate submission`
* `refactor: simplify email service`
* `docs: update project documentation`
* `chore: update dependencies`

Avoid large commits containing unrelated changes when possible.

---

## 17. Final Code Review

Before considering code complete:

* remove dead code;
* remove debug logs;
* remove unused imports;
* verify naming;
* verify validation;
* verify error handling;
* verify TypeScript;
* verify consistency with existing code.
