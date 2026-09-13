# Local review evidence — September 12, 2026

Reviewed starting commit: `1a12098812b8c0df4cd41d4fa97e8feb4e95a900` on `call-e-hackathon`.

- `npm ci --no-audit --no-fund`: passed, 261 packages installed.
- Original branch `npm run lint` and `npm run build`: passed.
- Updated branch `npm run lint` and `npm run build`: passed.
- `npm run test:calle`: passed; exactly one simulated provider POST despite concurrent identical requests.
- Browser checks: passed; seven recipient values match the UI, overall completion count excluded, authorization resets, submitted fields lock, polling failure recovers via GET, failed terminal state shows no-facts message, zero page errors.
- Real CALL-E requests: zero. Real phone calls: zero.
- Deployment changes, merges, and external submissions: zero.

## Changes reviewed

Recipient-level structured facts now take precedence by being the sole source for the supplier evidence panel. The overall batch completion count cannot mask them. Authorization resets on recipient/question edits; submitted fields lock. A stable request UUID, server-side promise deduplication, operator token, recipient allowlist, and one-request session budget constrain the isolated demo. Polling can be resumed without a new POST. Timeout and upstream errors do not trigger automatic redial. Privacy text now accurately describes the browser-entered phone number.

The original known lint issues are absent from this branch. Existing document/export types were left intact. Tests and recording fixtures are explicitly simulated, use a reserved fictional number, and do not call CALL-E.

## Practical limits

The provider documentation site timed out, so payload shapes, terminal vocabulary, and confidence scale still require the one authorized live acceptance test. In-memory request/call tracking is limited to one process lifetime. A separate Render service must remain single-instance during the demo, and any restart requires checking the provider dashboard before a new call. Prompt restrictions are not a provider-level guarantee against model mistakes.

See RELEASE.md for setup, real-response acceptance, and the remaining gates. See DEMO.md for the timed narration and instructions to replace simulated footage.

## Live timeout investigation

Render logged a creation failure at 2026-09-12 15:52:53 UTC after the user reported an abort timeout. The previous backend request deadline was 15 seconds; creation now allows 60 seconds and the browser allows 75 seconds. Timeout errors explicitly warn that acceptance is unknown. No automatic redial is added. Do not deploy this update until the existing operation is reconciled: a restart loses in-memory tracking.

CALL-E documentation is now reachable: https://docs.heycall-e.com/calls. It confirms recipient-level structured_result, the supported top-level status values, and recovery by an unchanged original request plus the same idempotency key. It provides no GET /v1/calls list endpoint. Current code retains failed request promises, so same-tab retries return the recorded failure rather than replaying upstream. Check provider history before deciding the recovery path; do not generate a replacement key blindly.

## September 13 finalization

The operator reported a real 37-second CALL-E test reaching voicemail, with AI disclosure and a procurement question. No supplier answers or real API result were captured; live response-to-UI matching remains unverified. The next call was correctly blocked by the one-request process budget. No additional calls were placed during finalization.

Added a public, clearly labeled no-call result preview and sessionStorage recovery of newly returned task IDs (no token, phone, transcript, or supplier facts stored). Token re-entry resumes GET-only status retrieval after refresh; server-restart recovery remains unsupported. English-to-Canada is disabled based on the actual provider rejection, and US is the default.

Validation passed: TypeScript checking; production build; fake-provider authorization, allowlist, deduplication, budget and round-trip checks; all four error-redaction tests; browser checks for all seven recipient fields, authorization reset, request locking, polling error recovery, terminal no-facts state, refresh without an extra POST, and public preview with zero CALL-E requests. Official contribution repository validation passed for the prepared external-app reference and README entry.

The updated narration explicitly separates simulated UI evidence from the author-reported real voicemail test. `scripts/narrate-demo.mjs` creates five 25-second narration segments and combines them with the actual screen recording, targeting a 125-second export.
