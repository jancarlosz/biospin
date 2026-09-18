# Architecture Rules

## 1. Architecture Overview

BioSpin is a Next.js full-stack application.

Do not split the project into separate frontend and backend applications unless explicitly approved.

The architecture must remain appropriate for a small-to-medium institutional website with an administrative area.

Prioritize:

* simplicity;
* maintainability;
* security;
* clear boundaries;
* performance.

---

## 2. Next.js Architecture

Use the Next.js App Router.

Prefer:

* Server Components by default;
* Client Components only when required;
* Server Actions for appropriate mutations;
* Route Handlers for APIs and external integrations when appropriate.

Do not create an API endpoint for every operation if a Server Action is more suitable.

Do not use Server Actions for situations where a Route Handler is architecturally more appropriate.

---

## 3. Public Routes

Expected public routes include:

* `/`
* `/sobre`
* `/solucoes`
* `/solucoes/[slug]`
* `/blog`
* `/blog/[slug]`
* `/contato`

Specific solution routes currently include:

* `/solucoes/nanofiberdressing`
* `/solucoes/oncomatrix`

Do not create additional public routes without confirmed requirements.

---

## 4. Administrative Routes

Expected administrative routes include:

* `/admin`
* `/admin/login`
* `/admin/posts`
* `/admin/categorias`
* `/admin/solucoes`

Administrative routes must be protected.

Authentication must be enforced server-side.

---

## 5. Suggested Project Structure

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── sobre/
│   │   ├── solucoes/
│   │   ├── blog/
│   │   └── contato/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── posts/
│   │   ├── categorias/
│   │   └── solucoes/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   ├── blog/
│   ├── solutions/
│   └── admin/
│
├── lib/
│   ├── db/
│   ├── auth/
│   ├── email/
│   ├── validations/
│   └── utils/
│
├── services/
├── types/
└── config/
```

The exact structure may evolve, but it must remain consistent and simple.

Do not create folders that exist only for theoretical architecture.

---

## 6. Component Boundaries

Components are responsible for:

* presentation;
* layout;
* local interaction.

Business logic should not be unnecessarily embedded inside large UI components.

Use appropriate server-side services, utilities or actions for:

* data access;
* external integrations;
* reusable business rules;
* complex processing.

---

## 7. Data Access

Keep database access patterns consistent.

Do not scatter unrelated database queries across presentation components.

Prefer clear domain-oriented data access.

Avoid unnecessary repository layers if the ORM and application remain simple.

Do not add architectural layers without a practical benefit.

---

## 8. External Integrations

External providers must be isolated.

Examples:

* Resend → email service;
* image provider → upload service;
* authentication provider → auth module.

Do not spread provider-specific code throughout the application.

This makes future provider changes easier.

---

## 9. Forms

Forms must have a clear boundary between:

* UI;
* validation;
* submission;
* server-side processing;
* external integration.

Do not duplicate the same business logic across multiple forms without a reason.

---

## 10. Dynamic Content

Blog posts and managed solutions are dynamic content.

Use stable slugs for public URLs.

Validate dynamic parameters.

Handle missing resources with appropriate not-found behavior.

Do not expose unpublished content publicly.

---

## 11. Public and Admin Separation

Public pages and administrative functionality must remain clearly separated.

Admin-only code must not be exposed unnecessarily to public routes.

Do not rely on hidden UI elements as access control.

---

## 12. Avoid

Do not:

* create unnecessary microservices;
* create a separate API for every database operation;
* create multiple competing architecture patterns;
* expose database logic to the client;
* mix external provider code throughout UI components;
* create a generic CMS beyond the contracted requirements;
* build a visual page builder;
* create complex infrastructure for hypothetical future requirements.
