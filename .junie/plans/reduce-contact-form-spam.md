---
sessionId: session-261009-130600-q7uu
---

# Requirements

### Overview & Goals
Reduce automated and repeated spam submissions through the existing `contact_us` Statamic form while keeping legitimate enquiries frictionless and preserving the current email delivery flow.

### Scope
**In scope**
- Retain and verify the existing `message` honeypot.
- Add conservative server-side rate limiting for contact-form submissions.
- Add lightweight behavioral checks, such as rejecting submissions that arrive unrealistically quickly or repeat the same payload within a short window.
- Return normal form validation errors for rejected submissions without revealing which anti-spam rule triggered.
- Make limits and timing windows configurable through application configuration/environment values.
- Add automated coverage for accepted and rejected submission paths.

**Out of scope**
- CAPTCHA, Turnstile, or reCAPTCHA integration.
- Replacing Statamic’s form/email workflow with a custom public API or controller.
- Broad rate limiting of unrelated site routes.

### Functional Requirements
- A submission with a populated honeypot is rejected and must not send an email.
- A burst of submissions from the same client/IP is blocked according to the conservative configured limit.
- A submission made below the minimum realistic completion time is rejected.
- A repeated submission with the same normalized content within the duplicate window is rejected.
- Legitimate submissions continue to display the existing success state and send to `hello@choirconcierge.com`.
- Anti-spam rejection responses do not disclose whether the honeypot, rate, timing, or duplicate check caused the rejection.
- The implementation must avoid storing message content in logs and must handle shared IPs without making the form unusable for normal visitors.

# Technical Design

### Current Implementation
- `resources/forms/contact_us.yaml` defines the Statamic `contact_us` form, configures `message` as the honeypot, and emails accepted submissions to `hello@choirconcierge.com`.
- `resources/blueprints/forms/contact_us.yaml` defines required `name`, valid required `email`, and required `your_message` fields.
- `resources/views/partials/sets/contact_section.antlers.html` renders the native `{{ form:create }}` flow, displays Statamic `success`/`errors`, renders fields, and emits the hidden honeypot input.
- There is no contact-specific Laravel route/controller, CAPTCHA integration, or existing form test suite. The application is Laravel 10/Statamic 5.

### Key Decisions
- Use a Statamic form-level validation/submission hook rather than replacing the native form flow; this preserves the existing Antlers rendering and configured email transport.
- Apply a layered, low-friction policy: honeypot plus minimum completion time, duplicate suppression, and conservative request throttling.
- Keep thresholds in configuration backed by environment variables so operations can tune them without editing the form or code.
- Use privacy-safe identifiers for throttling/deduplication and avoid logging raw names, email addresses, or message bodies.

### Proposed Changes
- Identify and register the Statamic 5 form validation/submission extension point in the application’s existing provider/bootstrap conventions.
- Scope the hook exclusively to the `contact_us` form and run checks before Statamic sends the configured email.
- Normalize only the data needed for duplicate detection, hash it with a server-side/app-derived identifier, and store short-lived attempt metadata using the project’s available Laravel cache/rate-limiter facilities.
- Add a generic validation error for blocked submissions so the current template can render it through its existing `errors` branch.
- Preserve the existing honeypot field and markup, changing it only if needed to make the field inaccessible to assistive technology and less visible to autofill while retaining Statamic’s configured handle.
- Add a dedicated configuration section for enabled checks, attempt limits/window, minimum completion time, duplicate window, and cache key prefix.

### Components
- `resources/forms/contact_us.yaml`: retain the form contract and email recipient; only adjust honeypot-related configuration if verification shows it is needed.
- `resources/views/partials/sets/contact_section.antlers.html`: preserve the native submission flow and improve the honeypot’s accessibility/autofill attributes if required.
- `app/Providers/*` or the project’s applicable Statamic extension registration location: register the form-level hook.
- New focused anti-spam service/rule under `app/` (location to follow existing application conventions): evaluate honeypot, elapsed-time, duplicate, and rate-limit checks without coupling policy to the template.
- `config/*` and `.env.example`: expose tunable policy values and safe defaults.
- `tests/Feature/*` and/or `tests/Unit/*`: cover the service and the integrated contact-form submission behavior.

### Risks
- Statamic’s exact hook API must be confirmed against the installed `^5.0` package before implementation; if no suitable hook exists, use the nearest supported form validation extension point rather than silently moving to a custom endpoint.
- IP-based limits can affect users behind shared networks; use a moderate conservative window, configurable values, and generic responses.
- Cache eviction or multiple application nodes can weaken duplicate/rate checks; use Laravel’s shared cache when deployed and treat controls as spam reduction rather than guaranteed prevention.

# Testing

### Validation Approach
Use focused Laravel/Statamic tests around the anti-spam service and the registered contact-form submission hook. Fake or isolate email delivery and cache state so tests prove whether an enquiry is accepted without sending real mail.

### Key Scenarios
- Valid `name`, `email`, and `your_message` submission with an empty honeypot is accepted and sends exactly one configured email.
- Non-empty `message` is rejected with a generic form error and sends no email.
- Submission before the minimum completion interval is rejected.
- Repeated normalized payload inside the duplicate window is rejected while a changed payload is accepted.
- Requests beyond the configured conservative limit are rejected, and requests after the window expires can proceed.
- Other Statamic forms, if present, are not affected by the contact-specific policy.

### Edge Cases
- Missing or malformed normal form fields continue to use the blueprint’s required/email validation.
- Cache misses, expired keys, and concurrent attempts do not cause fatal errors.
- Generic rejection messaging does not reveal the active rule or expose submitted content.
- The existing success and error rendering in `contact_section.antlers.html` remains compatible.

# Delivery Steps

###   Step 1: Define configurable contact anti-spam policy
The application has explicit, environment-tunable defaults for contact-form anti-spam behavior.
- Add configuration for conservative request limits, time windows, minimum completion time, duplicate suppression, and cache key namespacing.
- Add corresponding safe placeholders/documentation to `.env.example` without introducing CAPTCHA secrets.
- Confirm the Laravel cache/rate-limiter facilities available in this Laravel 10 application and select the existing project convention.

###   Step 2: Implement Statamic contact-form validation hook
The native `contact_us` submission is screened before email delivery without replacing the Statamic form flow.
- Register the supported Statamic 5 form-level validation/submission hook in the appropriate `app/Providers` or bootstrap location.
- Add a focused anti-spam service/rule that checks the configured honeypot, minimum elapsed time, normalized duplicate payload, and conservative client/IP limit.
- Scope the checks to `contact_us`, use short-lived privacy-safe cache keys, and return a generic validation error for blocked attempts.
- Preserve the configured email delivery and existing success/error behavior.

###   Step 3: Harden the rendered form and verify behavior
The contact form remains accessible to legitimate users while automated submissions are blocked and regressions are covered.
- Update `resources/views/partials/sets/contact_section.antlers.html` only as needed to preserve the honeypot contract and reduce autofill/accessibility side effects.
- Add unit and feature coverage for accepted submissions, each anti-spam condition, cache/window expiry, generic errors, email suppression, and non-contact-form isolation.
- Run the focused test suite and verify the configured recipient and existing Statamic rendering remain unchanged.