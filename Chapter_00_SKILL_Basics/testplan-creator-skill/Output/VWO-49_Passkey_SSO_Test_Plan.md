# Test Plan - VWO-49: Add Passkey and SSO Login Options to VWO Login Page

> **Status: DRAFT - pending human review.** This plan is not approved until the QA owner and relevant stakeholders sign off.
> **Prepared:** 2026-10-31

## Document and ticket details

| Field | Details |
|---|---|
| Project / product | VWO Project / VWO login page |
| Ticket | VWO-49 |
| Issue type / status | Story / To Do |
| Ticket priority | Medium in issue metadata; the description separately says High. Clarification required. |
| Epic | Authentication Enhancements |
| Reporter / assignee | Pramod / Unassigned |
| Components, affected versions, fix versions | None specified |
| Sprint / estimate | Not specified |
| Requirement source | Workspace Jira export: `resources/VWO-49.doc` |
| Source freshness | Export says created 2026-04-19 and updated 2026-10-20. Jira API lookup returned 404 during preparation; this plan uses the supplied export. |

## Company and product context

The supplied company notes describe VWO as a Bingify product focused on A/B testing and describe the company as having 5,000 employees. Confirm the corporate naming and employee count before external distribution. No company logo image was present in the workspace, so none is included.

The story adds Passkey and Single Sign-On (SSO) choices to the existing VWO login page so a user can authenticate without relying solely on email/password. Existing login methods, including Google sign-in, are relevant as context and regression surface; their detailed behavior is not specified by this ticket.

## 1. Scope and objectives

### Objective

Verify that the two new login choices are visible in the specified location; that successful SSO and registered-passkey authentication reach the user's dashboard; and that the required failure, no-passkey, unsupported-environment, compatibility, and security behaviors are handled as described. Record execution evidence and blockers without treating an inconclusive run as a pass.

### In scope

- The "Sign in using SSO" and "Sign in with Passkey" controls and their position below "Sign in with Google".
- Successful and unsuccessful SSO authentication, including dashboard redirection and user-visible errors.
- Successful authentication with a registered and verified passkey.
- No registered passkey, passkey authentication failure, and unsupported browser/device behavior.
- SSO compatibility across configured identity providers and passkey compatibility on supported browsers/devices.
- Secure protocol use (OAuth/SAML/WebAuthn) and checks that sensitive data is not exposed in the UI or network logs.
- Responsive layout and accessibility checks called out in the ticket's test scenarios.
- Regression smoke checks for the existing login page and neighboring sign-in options.

### Out of scope

- Passkey registration, which the ticket says is covered by a separate story.
- SSO provider configuration, explicitly out of scope.
- Changes to existing email/password or Google authentication beyond regression checks.
- Any specific identity provider, browser/device/version, role/authorization policy, performance target, or service-level objective not supplied by the ticket.

### Requirement traceability keys

| Key | Ticket requirement |
|---|---|
| AC-UI | Both new buttons are visible below the "Sign in with Google" option. |
| AC-SSO | Valid SSO credentials authenticate the user and redirect to the dashboard; invalid credentials produce appropriate errors. |
| AC-PASSKEY | A registered, verified passkey authenticates the user and redirects to the dashboard; no passkey produces fallback or guidance. |
| AC-ERROR | Errors are handled for failed SSO, failed passkey authentication, and unsupported passkey browser/device. |
| AC-COMPAT | Passkeys work on supported browsers/devices; SSO works across all configured identity providers. |
| AC-SEC | Authentication uses secure OAuth/SAML/WebAuthn protocols and does not expose sensitive data in the UI or network logs. |
| TS-RESP-A11Y | The ticket's listed test scenarios call for responsive UI and accessibility verification; detailed criteria are not supplied. |

The keys above are identifiers added for test traceability; they do not add acceptance criteria.

## 2. Gaps and questions for the author

| # | Area | Status | Finding / question required before sign-off |
|---:|---|---|---|
| 1 | Priority and release state | Ambiguous | Issue metadata says Medium while the description says High; status is To Do although the description says the options "have been added." Which priority and implementation state should QA plan against? |
| 2 | SSO identity providers | Missing | Which providers are configured for this release, and what test tenants/accounts and success/failure states are available for each? |
| 3 | SSO error behavior | Ambiguous | What exact errors, recovery guidance, and post-error state are expected? Historical automation notes expect "Invalid credentials," but that exact copy is not an acceptance criterion. |
| 4 | Dashboard destination | Ambiguous | What exact dashboard destination/URL and account landing state constitute a successful redirect? Historical automation notes mention a URL containing `/dashboard`; confirm this is authoritative. |
| 5 | Passkey test setup | Missing | Which test accounts have registered passkeys? What credential lifecycle and device/browser combinations are supported? Registration itself is out of scope. |
| 6 | Passkey fallback and errors | Ambiguous | What exact guidance is expected when no passkey exists, authentication fails, or the user cancels/closes the browser prompt? What recovery path should remain available? |
| 7 | Compatibility matrix | Missing | Provide supported browser, OS, device, authenticator, and minimum-version matrix; define the expected behavior outside that matrix. |
| 8 | Security acceptance | Ambiguous | Identify the approved OAuth/SAML/WebAuthn profiles, relevant security requirements, permitted network-log evidence, and who will approve the verification. Do not collect real secrets. |
| 9 | Test environment / data | Missing | Confirm the staging/QA URL, build, feature-flag state, synthetic accounts, account entitlements, and safe network-log access. Historical comments show more than one app URL. |
| 10 | Accessibility / responsive | Ambiguous | Which accessibility standard/level, assistive technologies, viewport sizes, and responsive pass/fail criteria are required? |
| 11 | Roles and authorization | Missing | Are there role, tenant, or account-entitlement differences that must be covered after authentication? The ticket does not define access policy. |
| 12 | Regression and release gates | Ambiguous | Which existing sign-in paths and severity definitions are release-blocking? Confirm whether "no critical or high defects open" is the agreed DoD gate. |
| 13 | NFRs and observability | Missing | No performance, availability, localization, audit/logging, or monitoring thresholds are defined. Are any required for this story? |
| 14 | Prior test runs | Missing | Multiple Oct 10, Oct 13, and Oct 17 automated comments report 0 passed, 0 failed, and 4 blocked. What blocked execution, what is the current build/environment, and are there newer results? No root cause is recorded in the supplied export. |

### Requirement checklist summary

| Checklist area | Assessment |
|---|---|
| User goal and core happy paths | Present |
| Testable UI, SSO, and passkey acceptance criteria | Present, with incomplete expected error copy and redirect details |
| Negative paths | Partially present; exact failure, cancellation, and recovery outcomes are unclear |
| Empty/boundary states | Partially present for no passkey; other boundaries and prompt lifecycle are unspecified |
| Test data, environment, dependencies, setup | Missing or incomplete |
| Performance, availability, localization, audit/observability | Missing |
| Security protocol and sensitive-data handling | Present at high level; verification scope and evidence rules are missing |
| Accessibility, responsive layout, browser/device matrix | Mentioned, but criteria/matrix are missing |
| Regression, backwards compatibility, rollback/feature flags | Not defined |
| Design/mockups and terminology | No design link or additional definitions in the supplied ticket export |

## 3. Test scenarios

Priority convention for this draft: **P0** = core authentication, security, or release-blocking path; **P1** = required supporting behavior or compatibility; **P2** = broader regression/usability coverage. These are QA planning priorities, not ticket-assigned priorities; confirm them after resolving the ticket's Medium/High conflict.

| ID | Priority | Type | Scenario and expected observation | Maps to |
|---|---|---|---|---|
| VWO49-01 | P0 | Positive/UI | Open the agreed login page with the feature enabled. Verify both new controls are visible and appear below "Sign in with Google" in the approved order. | AC-UI |
| VWO49-02 | P0 | Positive | Select SSO and authenticate using a valid synthetic account for each configured provider. Verify authentication succeeds and the agreed VWO dashboard is reached. | AC-SSO, AC-COMPAT |
| VWO49-03 | P0 | Negative | Submit invalid SSO credentials or a provider-rejected login. Verify authentication is denied, an approved actionable error is shown, and the user is not incorrectly authenticated. | AC-SSO, AC-ERROR |
| VWO49-04 | P0 | Positive | Select Passkey on a supported environment and complete verification with a registered test passkey. Verify authentication succeeds and the agreed dashboard is reached. | AC-PASSKEY, AC-COMPAT |
| VWO49-05 | P0 | Negative/empty | Select Passkey for an account/device with no registered passkey. Verify the approved fallback or guidance appears and the user can recover without a false successful login. | AC-PASSKEY |
| VWO49-06 | P0 | Negative | Cause passkey verification to fail using a controlled test condition. Verify an approved error is displayed and no authenticated dashboard session is created. | AC-ERROR |
| VWO49-07 | P0 | Security | Exercise SSO and passkey flows in an approved non-production environment. Verify the configured OAuth/SAML/WebAuthn protocol path and inspect only approved UI/network evidence for exposure of credentials, tokens, or other sensitive values. | AC-SEC |
| VWO49-08 | P1 | Negative/compatibility | Attempt Passkey on each explicitly unsupported browser/device in the confirmed matrix. Verify the ticket-required unsupported-environment error/guidance and that no invalid session is created. | AC-ERROR, AC-COMPAT |
| VWO49-09 | P1 | Compatibility | Execute the supported-browser/device matrix for Passkey and the configured-provider matrix for SSO. Record each combination and its result; do not infer support outside the confirmed matrix. | AC-COMPAT |
| VWO49-10 | P1 | Negative/recovery | Cancel, dismiss, or interrupt a passkey prompt and an SSO handoff. Verify safe recovery and a clear state. Expected behavior must be confirmed before execution. | AC-ERROR, gap 6 |
| VWO49-11 | P1 | Boundary/state | Repeat authentication attempts and handle provider or authenticator responses that time out or become unavailable. Verify safe failure and recovery; rate limits and exact messaging remain unspecified. | AC-ERROR, gaps 3/6/13 |
| VWO49-12 | P1 | Security | Verify no secrets are rendered in user-visible errors and no credentials/tokens are present in approved network-log captures. Redact evidence and use synthetic accounts only. | AC-SEC |
| VWO49-13 | P1 | Responsive/accessibility | Inspect the controls and flows at agreed viewports using keyboard-only and agreed assistive-technology checks; verify focus, names, actionable errors, and layout against criteria supplied by product/accessibility owners. | TS-RESP-A11Y, gap 10 |
| VWO49-14 | P1 | Regression | Verify existing login-page options, including Google and the existing authentication route(s) in scope, remain visible and usable after the new options are introduced. Confirm regression scope with product. | gap 12 |
| VWO49-15 | P2 | Exploratory | Explore repeated selection, browser back/refresh during an authentication handoff, and return from provider/authenticator errors. Record observed states and compare only against approved expected behavior. | AC-SSO, AC-PASSKEY, gaps 3/6 |
| VWO49-16 | P2 | Authorization | If product confirms multiple roles/tenants, authenticate using representative synthetic accounts and verify the intended account/dashboard context. Do not assert role behavior until policy is provided. | gap 11 |

### Prior execution evidence from the supplied ticket export

Comments on Oct 10, Oct 13, and Oct 17, 2026 report repeated automated runs with a verdict of **INCONCLUSIVE**, **0 passed, 0 failed, 4 blocked (of 4)**. The blocked checks cover button visibility/position, successful SSO redirect, invalid-SSO error, and no-passkey fallback. One Oct 13 comment lists `app.wingify.com/#/login`; other comments list `app.vwo.com`. No actual results or blocker root cause are recorded in the comments reviewed. These are historical blocker signals, not evidence that the feature passed or failed. Reproduce only after the environment and build are confirmed.

## 4. Test data and environment

| Item | Requirement / current status |
|---|---|
| Environment and build | QA/staging URL and build are TBD. Ticket comments mention app.vwo.com and app.wingify.com/#/login; product/engineering must confirm the authorized target before testing. |
| Feature state | Confirm Passkey/SSO feature flag and deployment state; neither is specified in the ticket. |
| SSO data | Synthetic valid and invalid accounts for every configured provider; provider test tenant/configuration and expected claims/redirect behavior to be supplied by the owner. |
| Passkey data | Synthetic account with a registered test passkey, plus account/device with no passkey. Registration is outside this story and must be prepared separately. |
| Negative/error data | Controlled invalid SSO response and passkey failure/unsupported environment. Use provider-approved test mechanisms; do not use real credentials. |
| Roles / permissions | TBD; account roles and tenant expectations are not supplied. |
| Browsers / devices | TBD pending support matrix; include supported and explicitly unsupported targets once provided. |
| Logs and evidence | Use approved non-production logs only. Redact credentials, tokens, personal data, and recovery material from screenshots, traces, and defect reports. |
| Dependencies | Configured SSO identity providers, WebAuthn-capable browser/device/authenticator, deployment/feature flag, and dashboard route. Ownership/readiness are TBD. |

## 5. Risks and assumptions

### Risks

- Previous automated execution was repeatedly blocked; test readiness and environment access are the immediate execution risks.
- Undefined provider, browser/device, redirect, error-copy, and fallback expectations can make results inconsistent or unreviewable.
- SSO/passkey security checks may expose sensitive data if test accounts, network evidence, or defect artifacts are not controlled.
- The priority conflict and unresolved issue status create uncertainty about release urgency and test scheduling.
- No performance, availability, or operational thresholds are supplied; this plan cannot establish those outcomes.

### Assumptions and limitations

- The supplied workspace export is the source of ticket requirements for this draft; Jira API lookup returned 404 and the export may not include later changes.
- QA priorities in the scenario table are provisional risk classifications only.
- Synthetic accounts and an authorized non-production environment will be made available before execution.
- Where expected behavior is not defined, scenarios identify a question rather than inventing acceptance criteria.
- Company context is reproduced from the supplied company notes and is not independently verified. A logo asset was not available.

## 6. Entry and exit criteria

### Entry

- Product/QA review resolves priority and confirms current scope, implementation/build, and environment URL.
- Acceptance details for errors, dashboard destination, provider matrix, supported browser/device matrix, and no-passkey/failure fallback are approved.
- SSO and passkey test accounts, dependencies, feature state, and safe evidence access are provisioned.
- Test scenarios and expected results are reviewed; a basic login-page smoke check can run.
- Historical blocked-run cause is understood or formally recorded as an accepted limitation.

### Exit

- All approved in-scope scenarios have a recorded Passed, Failed, Blocked, or Not Run result with traceable evidence.
- P0 failures are resolved and retested, or explicitly accepted by the accountable release owner; no untriaged critical/high defects remain if that DoD condition is confirmed.
- Blocked/deferred scenarios, environment limitations, security evidence, regression results, and open risks are reported.
- Exit review confirms whether the ticket's stated DoD is met: acceptance criteria met, QA sign-off completed, no critical/high defects open, and documentation updated.
- The plan and execution summary are reviewed and approved by the designated QA/product/engineering owners.

## 7. Resource allocation

| Role | Responsibility | Assignment |
|---|---|---|
| QA lead | Confirm scope, prioritize scenarios, review results and residual risk | TBD |
| Functional QA | Execute UI, SSO, passkey, error, and regression scenarios | TBD |
| Identity/SSO owner | Provide configured providers, test tenant/accounts, and expected SSO behavior | TBD |
| Authentication engineering | Provide build/feature state, passkey setup, dashboard route, and troubleshooting | TBD |
| Security reviewer | Approve protocol/evidence checks and review security findings | TBD |
| Product owner | Resolve acceptance gaps and approve user-visible behavior | TBD |

Named owners, staffing levels, and availability are not present in the ticket and must be confirmed.

## 8. Timelines and sprint details

No sprint, estimate, fix version, or test window is populated in the supplied ticket export. Plan execution dates only after owners resolve the entry criteria and confirm release timing.

| Activity | Timing |
|---|---|
| Requirements and gap review | TBD after product/QA review |
| Environment, provider, and passkey test-data readiness | TBD; prerequisite to execution |
| Smoke and functional scenario execution | TBD after stable build is available |
| Compatibility, accessibility, and security checks | TBD after matrices and approved evidence scope are supplied |
| Retest, regression, and test closure | TBD after defect fixes and stakeholder review |

## 9. Defect reporting and deliverables

Report defects in the project's approved tracker. Include ticket/scenario ID, build and environment, synthetic account type (never credentials), reproducible steps, expected versus actual behavior, severity, and sanitized evidence. Record blocked tests separately from failures and include the blocker/owner where known.

Planned deliverables are the reviewed test plan, scenario execution results, sanitized defect records, and a closure summary showing coverage, blocked work, unresolved risks, and sign-off status. Do not mark the plan approved or the ticket QA-signed until the human review gate is completed.

---

## HUMAN REVIEW GATE

- **Assumptions made:** The supplied Jira export is current enough to draft from; test accounts and a non-production environment will be provided; QA priorities are provisional.
- **Could not confirm:** Priority (Medium vs High), implementation/release state, current build and environment, supported providers/browsers/devices, exact error and fallback behavior, dashboard destination, security evidence method, roles, accessibility criteria, and schedule.
- **Open questions blocking sign-off:** Resolve the gaps in Section 2, especially the previous 4/4 blocked runs and the environment/build needed to reproduce them.
- **Approval request:** QA, product, engineering, and security owners should review and approve or edit this draft before execution is treated as sign-off and before test cases or automation are expanded.
