# CALL-E MVP: local validation and isolated Render deployment

Status: code prepared; real-provider acceptance and final live demo remain blocked.
PR: https://github.com/babifarah9/bidpilot-ai/pull/1
Branch: call-e-hackathon. Do not merge into main or change the existing BidPilot service.

## Reproduce local checks

Use Node 22 or newer. From this branch:

```sh
npm ci
npm run lint
npm run build
npm run test:calle
```

`lint` is TypeScript checking (`tsc --noEmit`), not ESLint. On this review, the initial branch already passed lint/build. No export/parser rewrite was necessary. Build emits a browser bundle and Express server. `npm run start` serves production; `npm run preview` is not the backend.

The integration test starts an HTTP provider stub on 4311 and a production server on 4312. It makes no external API requests or telephone calls. It verifies access control, authorization, malformed input, recipient allowlist, concurrent deduplication, request/body conflict, one-call budget, and exact result round trip. Stop any existing local server on those ports before running it.

## Browser rehearsal checks

`scripts/record-demo.mjs` starts a local production server on 4313, intercepts only CALL-E browser requests with `tests/fixture.mjs`, asserts the rendered facts, and records the actual interface. It also verifies polling failure recovery and failed terminal state handling. It requires separately installed Playwright/Chromium/ffmpeg; these are recording tools, not application dependencies. Set `PLAYWRIGHT_MODULE`, `CHROMIUM_EXECUTABLE`, and `DEMO_OUTPUT` for your environment. Use `WAIT_SCALE=0.01` for a quick check, omit it for normal recording. All test tokens/numbers are fixtures. The video itself is delivered separately; no private media is committed.

## Isolated Render setup (instructions only)

1. Create a **new Web Service**, connected to babifarah9/bidpilot-ai, branch `call-e-hackathon`. Do not edit or repoint the existing production service.
2. Name it distinctly, for example `bidpilot-voice-demo`. Use Node runtime, repository root, build command `npm ci --include=dev && npm run lint && npm run build`, start command `npm start`, health path `/api/health`.
3. Disable automatic deploys for the demo while collecting evidence. Select a plan yourself; these instructions do not authorize paid services.
4. Configure `NODE_ENV=production` and a supported Node version (22+). Render supplies PORT; Express binds to 0.0.0.0.
5. In the service's private environment settings, set `CALLE_API_KEY` from your CALL-E dashboard. Never put it in chat, GitHub, a screenshot, a VITE_ variable, or the operator-token field.
6. Set `CALLE_BASE_URL=https://api.heycall-e.com`, `CALLE_OPERATOR_TOKEN` to a separate random secret of at least 24 characters, and `CALLE_ALLOWED_PHONES` to the one consenting test number in E.164 format. Generate the operator token locally, for example with `openssl rand -hex 24`. Enter that separate token in the UI; it stays in component memory, not local storage.
7. Add `GEMINI_API_KEY` only if demonstrating fresh document analysis. The built-in sample opportunity requires no Gemini request.
8. Deploy manually and visit `/api/health`. `calleConfigured: true` only establishes that a value exists; it does not prove validity or credit balance. Confirm the rendered panel and built-in sample before any call.

Render source: https://render.com/docs/deploy-node-express-app (checked September 12, 2026). Use your app-specific build/start commands above. No Render service or secrets were modified during this work.

## Exactly one authorized test call

Blocked inputs: no real CALL-E key or consenting test number was available in the working environment. No live call was placed.

Before testing, confirm the recipient owns the number or explicitly consents to an AI verification call and to any recording used in the demo. Use the existing app authorization gate and explicitly review the exact question text. Prefer a consenting test participant role-playing a supplier; label their answers as test data. Do not call an unsolicited supplier.

Ask only: availability, lead time, coverage, qualification status, voluntary indicative pricing, and whether human follow-up is needed. The prompt identifies the AI and prohibits purchases, binding negotiations, sensitive personal questions, and commitments. These are model instructions, not a guarantee of provider behavior; inspect the transcript.

Start once. Preserve the request ID and provider call ID. If creation times out, retry unchanged in the same tab only; it uses the same idempotency key. Do not reload, restart, or redeploy and retry until checking the provider dashboard for an accepted call. The isolated demo permits one new request per process; rejected/ambiguous provider requests also consume this budget. This is not durable, multi-instance rate limiting. Do not scale out or expose it as a general calling service.

Polling is bounded to three minutes. “Refresh call status” performs GET only. Unknown/restarted-session call IDs are blocked by the server; use the provider dashboard after a restart. Starting another verification requires fresh UI authorization and, with the demo budget, an intentional operator reset after provider reconciliation.

## Response acceptance checklist

The current implementation follows the original PR's presumed API shapes; the provider documentation endpoint timed out during this review. A simulated response is not provider-contract confirmation.

Capture a redacted real response and confirm:

| Provider value | Expected UI behavior |
| --- | --- |
| creation `id` or `call_id` | stored call ID; polling starts |
| `status` | readable status; known terminal states stop polling |
| `recipients[0].structured_result` | supplier facts shown verbatim |
| overall `structured_result.completed_count` | never substitutes for supplier facts |
| `follow_up_required: true` | visible true; human follow-up remains necessary |
| missing recipient facts | explicit no-facts message on known terminal state |
| `task_completed` and `completion_confidence` | completion badge only with recipient facts; check provider scale before using confidence in final narration |

Recognized terminal states currently: completed, failed, cancelled, canceled. Any other live terminal vocabulary needs a fixture and a mapping update. Check creation envelope, recipient nesting, status vocabulary, evidence item shape, and confidence scale against one real result before declaring completion.

Keep raw phone numbers, API/operator tokens, recipient identity, transcript consent evidence, and unredacted provider responses out of the public repo/demo. Public proof should use a masked call ID, redacted response, and consenting test-data answers.

## Smallest remaining release blockers

- Configure the separate service secrets and consenting recipient after local review.
- Execute exactly one authorized real call and reconcile the actual payload with the UI.
- Replace the clearly labeled simulated-call section in the narrated recording with consented real-call/result evidence; verify final video duration remains below 180 seconds.

No merge, hackathon submission, supplier commitment, or deployment was performed. Treat current output as a validated local implementation plus rehearsal, not a completed live submission.
