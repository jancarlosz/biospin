# Security Rules

## 1. Security Principles

Apply practical security appropriate to the project scope.

Prioritize:

* secure authentication;
* server-side validation;
* credential protection;
* protected administrative routes;
* safe error handling;
* secure external integrations;
* basic anti-abuse protection.

Do not implement unnecessary security complexity, but never omit basic protections.

---

## 2. Secrets

Never hardcode:

* API keys;
* Resend credentials;
* database credentials;
* authentication secrets;
* passwords;
* provider tokens.

Use environment variables.

Never expose server secrets through client-accessible environment variables.

Do not commit `.env` files containing production credentials.

---

## 3. Authentication

Administrative routes must be protected.

Authentication must be verified server-side.

Do not protect routes only by:

* hiding navigation links;
* checking client-side state;
* hiding buttons.

Verify authorization before performing administrative mutations.

---

## 4. Input Validation

All external input must be validated on the server.

Validate:

* forms;
* route parameters;
* API payloads;
* administrative actions;
* upload metadata.

Client-side validation is not a security boundary.

---

## 5. Forms and Spam Protection

Forms must have:

* server-side validation;
* basic anti-spam protection;
* rate limiting or equivalent protection when appropriate;
* duplicate submission protection.

Do not expose provider errors directly to users.

---

## 6. Upload Security

Validate uploads for:

* allowed file types;
* size limits;
* expected content.

Do not trust only the filename extension.

Use secure provider-side storage and access patterns when available.

---

## 7. Error Handling

Do not expose:

* stack traces;
* database errors;
* provider credentials;
* internal implementation details.

Return safe and understandable error messages to users.

Log server-side errors without logging secrets.

---

## 8. Database Security

Database access must remain server-side.

Use parameterized queries or ORM-safe query mechanisms.

Validate data before mutations.

Apply appropriate authorization before administrative changes.

---

## 9. External Services

External integrations must:

* use environment variables;
* isolate provider logic;
* handle failures safely;
* avoid exposing credentials.

Do not trust external responses without appropriate validation when relevant.

---

## 10. Production

Before deployment:

* verify environment variables;
* verify admin route protection;
* verify HTTPS;
* verify secrets are not committed;
* verify production error handling;
* verify external service configuration.

Security must be considered during development, not only before release.
