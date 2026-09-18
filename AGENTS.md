# BioSpin — Project Instructions

## Contracted Plan

**The client selected the Complete Plan (Plano Completo).**

The Complete Plan is the mandatory contractual baseline for this project.

All features included in the Basic Plan, plus all additional features
explicitly included in the Complete Plan, must be considered part of the
agreed scope.

Do not implement the project as a Basic Plan delivery.

Do not omit functionality explicitly included in the Complete Plan.

At the same time, do not add major functionality outside the Complete Plan
without treating it as a potential scope change.

## 1. Project Context

This repository contains the new institutional website for BioSpin.

BioSpin is an Amazonian deeptech focused on nanotechnology, biomaterials and Amazonian bioactives for applications in healthcare and beauty.

The website must communicate:

* scientific credibility;
* innovation;
* technology;
* sustainability;
* connection with the Amazon;
* professionalism;
* institutional trust.

This is a full-stack web application built primarily with Next.js.

The client selected the **Complete Plan** described in `docs/PROPOSAL.md`.

The detailed client requirements and approved content are defined in `docs/PROJECT-SPEC.md`.

## 2. Sources of Truth

Before implementing or modifying features, consult the relevant documents.

Priority order:

1. Explicit client requirements and approved decisions
2. `docs/PROJECT-SPEC.md`
3. `docs/PROPOSAL.md`
4. `scope.md`
5. Other project skill files
6. Existing project conventions

The client scope defines what must be built.

The commercial proposal defines what was contractually included.

Do not silently expand the project beyond those documents.

If the scope and proposal appear ambiguous or contradictory, do not invent requirements. Identify the ambiguity and prefer the smallest implementation that satisfies the clearly agreed requirements.

## 3. Required Skill Files

Always follow the relevant rules in:

* `.antigravity/skills/workflow.md`
* `.antigravity/skills/coding-rules.md`
* `.antigravity/skills/architecture.md`
* `.antigravity/skills/database.md`
* `.antigravity/skills/frontend.md`
* `.antigravity/skills/security.md`
* `.antigravity/skills/scope.md`

Read only the skill files relevant to the current task when possible.

## 4. Project Scope

The Complete Plan includes:

### Institutional website

* Home
* About BioSpin
* Solutions hub
* Individual solution pages
* Nanofiberdressing
* OncoMatrix
* Contact

### Blog and content

* Blog or news area
* Post listing
* Individual post pages
* Categories
* Drafts
* Publication control
* Image uploads
* Individual SEO fields

### Administrative panel

* Protected authentication
* Post management
* Category management
* Solution catalog management
* Content publication management

### Lead capture

* Contact forms
* Solution-specific forms
* Resend integration
* Lead origin identification
* Validation
* Basic anti-spam protection

### Technical delivery

* Database
* Technical SEO
* Sitemap
* robots.txt
* Image optimization
* Performance optimization
* Security best practices
* GitHub versioning
* Initial deployment

## 5. Technology Principles

Use Next.js as a full-stack application.

Do not create a separate backend application unless explicitly required and approved.

Prefer:

* Next.js App Router
* TypeScript
* Server Components by default
* Client Components only when interaction requires them
* Server Actions when appropriate
* Route Handlers for APIs and external integrations when appropriate
* PostgreSQL for relational data
* One ORM used consistently
* A secure authentication solution
* Resend for email delivery
* A suitable external image storage provider
* A production-ready deployment platform

Do not introduce additional infrastructure unless justified by the requirements.

## 6. Architecture Principles

Prioritize:

1. Client requirements
2. Contracted scope
3. Security
4. Maintainability
5. Simplicity
6. Performance
7. Future scalability

Avoid:

* unnecessary microservices;
* unnecessary abstractions;
* duplicated business logic;
* multiple competing patterns;
* unnecessary dependencies;
* premature optimization;
* over-engineering.

The goal is not to build the most complex system possible.

The goal is to deliver a professional, maintainable and production-ready website that fulfills the agreed scope.

## 7. Content Rules

The client-provided content is the source of truth for institutional and product information.

Never invent:

* scientific information;
* clinical results;
* product efficacy;
* certifications;
* statistics;
* partnerships;
* technical claims;
* product features;
* business results.

Do not change the maturity stage of solutions.

Nanofiberdressing must respect the approved positioning, including TRL 5 and clinical validation in progress.

OncoMatrix must be presented as a solution in development. Do not present it as a commercially available finished product unless the client explicitly updates the information.

## 8. Scope Control

If a requested feature is not clearly included in the project scope or commercial proposal:

1. Identify it as a potential scope change.
2. Explain what it requires.
3. Identify affected areas.
4. Do not silently implement major new functionality.

Examples of potential scope changes:

* CRM;
* lead management system beyond basic capture;
* e-commerce;
* shopping cart;
* payments;
* inventory management;
* order management;
* analytics dashboard;
* visual page builder;
* complex multi-role permissions;
* mobile application;
* complex automation workflows;
* new third-party integrations;
* new pages outside the agreed structure.

## 9. Development Standard

Before implementing a task:

1. Understand the requirement.
2. Check whether it is inside scope.
3. Inspect the existing code.
4. Reuse existing patterns.
5. Identify affected files.
6. Implement the smallest complete solution.
7. Validate the result.
8. Avoid unrelated refactors.

Do not rewrite working parts of the application without a clear reason.

## 10. Definition of Done

A task is complete only when:

* the requirement is fulfilled;
* it follows the project architecture;
* inputs are validated when applicable;
* errors are handled;
* the implementation is responsive when UI is affected;
* relevant security rules are followed;
* existing functionality is preserved;
* TypeScript is valid;
* lint is checked when available;
* relevant flows are manually verified;
* the feature is ready for production within the contracted scope.

## 11. Final Rule

When there is a choice between a complex solution and a simple solution that correctly satisfies the requirement, prefer the simple solution.

Never sacrifice security, correctness or maintainability merely to reduce implementation time.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
