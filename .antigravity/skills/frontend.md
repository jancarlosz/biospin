# Frontend Rules

## 1. Design Goals

The BioSpin website must communicate:

* scientific credibility;
* innovation;
* technology;
* sustainability;
* Amazonian identity;
* professionalism;
* trust.

The visual experience should feel modern and premium.

Avoid generic layouts that make the company look like a template-based corporate website.

Follow the client's visual identity when it is available.

---

## 2. Responsive Design

Develop with a mobile-first mindset.

The interface must work properly on:

* mobile;
* tablet;
* desktop.

Do not design only for desktop and adapt later.

Verify important layouts at multiple viewport sizes.

---

## 3. Accessibility

Use basic accessibility best practices.

Include:

* semantic HTML;
* meaningful landmarks;
* accessible form labels;
* keyboard navigation;
* visible focus states;
* appropriate alt text;
* accessible buttons and links;
* sufficient visual contrast according to the design.

Do not use a `div` as a button when a semantic `button` is appropriate.

Do not rely exclusively on color to communicate important information.

---

## 4. Components

Create reusable components for repeated patterns.

Examples:

* Header;
* Footer;
* Section;
* Hero;
* CTA;
* SolutionCard;
* BlogCard;
* FormField.

Reuse components when the same visual and behavioral pattern appears repeatedly.

Do not over-generalize one-off sections.

---

## 5. Layout

Keep layout responsibilities clear.

Use consistent:

* spacing;
* typography;
* containers;
* responsive behavior;
* component patterns.

Avoid arbitrary repeated values when a design token or existing pattern is available.

---

## 6. Images

Optimize images appropriately.

Use Next.js image optimization when applicable.

Avoid unnecessary large image files.

Prevent layout shift when possible.

Use meaningful alt text for informative images.

Decorative images may use appropriate empty alt behavior.

---

## 7. Animation

Animations must support the user experience.

Do not add animation merely because it is visually possible.

Avoid excessive:

* parallax;
* automatic movement;
* distracting transitions;
* performance-heavy effects.

Respect reduced-motion preferences when appropriate.

---

## 8. Forms

Every form must provide:

* clear labels;
* clear required fields;
* validation feedback;
* loading state;
* disabled submission when appropriate;
* success feedback;
* error feedback.

Prevent accidental duplicate submissions.

Do not make forms dependent only on placeholder text.

---

## 9. User Feedback

Interactive actions should provide clear feedback.

Examples:

* submitting;
* saved successfully;
* failed to save;
* loading;
* empty state.

Do not leave users uncertain about whether an action succeeded.

---

## 10. SEO Structure

Each public page should have:

* one clear primary heading;
* logical heading hierarchy;
* semantic page structure.

Do not use heading levels purely for visual styling.

---

## 11. Performance

Avoid unnecessary client-side JavaScript.

Avoid large dependencies for small visual effects.

Lazy-load heavy content when appropriate.

Do not sacrifice basic usability for decorative effects.
