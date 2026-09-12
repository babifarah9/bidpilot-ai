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
