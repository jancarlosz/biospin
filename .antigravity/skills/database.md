# Database Rules

## 1. Database Principles

Use a relational database.

The preferred database is PostgreSQL.

Use one ORM consistently throughout the project.

All schema changes must be represented through migrations.

Do not manually change the production schema outside the migration workflow.

---

## 2. Initial Domain

The project may initially require the following entities:

* User
* Post
* Category
* Solution

Lead storage must only be implemented if included in the approved technical implementation.

The project requires lead origin identification and email delivery through Resend.

This does not automatically require a full CRM or lead dashboard.

---

## 3. User

Administrative users require secure authentication.

User data should support the selected authentication strategy.

Never store plain-text passwords.

Do not create unnecessary user profile features.

The project initially requires administrative access, not a public user account system.

---

## 4. Post

A post should support the requirements needed for the blog.

Possible fields include:

* id;
* title;
* slug;
* excerpt;
* content;
* cover image;
* status;
* publication date;
* SEO title;
* SEO description;
* createdAt;
* updatedAt.

The exact schema should remain consistent with the chosen editor and content model.

---

## 5. Category

A category should support:

* id;
* name;
* slug.

Design post-category relationships based on actual requirements.

Do not introduce unnecessary many-to-many complexity unless a post must support multiple categories.

---

## 6. Solution

Solutions should support the catalog requirements.

Possible fields include:

* id;
* name;
* slug;
* summary;
* content;
* image;
* status;
* SEO title;
* SEO description;
* createdAt;
* updatedAt.

The solution model must support the agreed content without becoming a generic page builder.

Prefer a predictable structure.

---

## 7. Leads

If leads are stored in the database, store only information necessary for the project.

Possible fields include:

* id;
* name;
* email;
* phone;
* company;
* subject;
* message;
* solution or interest;
* origin page;
* createdAt.

Do not automatically create:

* sales pipelines;
* CRM stages;
* lead assignment;
* follow-up automation;
* advanced lead analytics.

These are outside the basic agreed lead capture scope unless separately approved.

---

## 8. Data Integrity

Use appropriate:

* primary keys;
* unique constraints;
* foreign keys;
* required fields;
* indexes.

Examples:

* public slugs should generally be unique;
* emails should be validated before use;
* relationships should preserve integrity.

Do not duplicate data unnecessarily.

---

## 9. Deletion

Before implementing deletion:

1. Check relationships.
2. Check public URLs.
3. Check dependent records.
4. Prevent orphaned data.

Hard deletion is acceptable when appropriate for administrative content.

Do not implement soft deletion unless there is a clear requirement.

---

## 10. Migrations

Every schema change must use a migration.

Before applying a migration:

* inspect the generated change;
* verify existing data impact;
* verify constraints;
* test locally when possible.

Never modify production data structures manually without the project migration process.

---

## 11. Database Access

Database access must remain server-side.

Never expose database credentials to the client.

Validate input before database mutations.

Handle database errors safely.

Do not expose internal database error details to users.
