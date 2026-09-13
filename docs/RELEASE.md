# BidPilot Voice: release and judge guide

Branch: `call-e-hackathon`; implementation PR: https://github.com/babifarah9/bidpilot-ai/pull/1
Isolated demo: https://bidpilot-voice-demo.onrender.com
The existing main deployment remains separate. Do not merge or repoint it.

## Judge access: no credentials or calls required

Open the isolated demo, choose **Try Demo**, scroll to **BidPilot Voice**, and choose **Preview sample result (no call)**. The seven displayed fields are explicitly fictional. This preview sends no CALL-E request and cannot spend the operator's call budget. The sample RFP requires no Gemini key. A free Render instance can take time to wake up.

For a reproducible local copy, use Node 22+:

```sh
git clone --branch call-e-hackathon https://github.com/babifarah9/bidpilot-ai.git
cd bidpilot-ai
npm ci
npm run lint
npm run build
npm run test:calle
node --import tsx --test tests/calle-errors.test.ts
npm start
```

Open http://localhost:3000 and use the same preview. `lint` is TypeScript checking, not ESLint. Backend tests use a local fake provider; no real calls or keys are required. The app is an experimental demo, not a production calling service.

## Separate Render deployment

The isolated service has already been created and configured by the operator. To reproduce it, create a **new Web Service** on this branch, Node 22+, build `npm ci --include=dev && npm run lint && npm run build`, start `npm start`, health path `/api/health`. Disable automatic deploys while collecting test evidence. Do not change the existing BidPilot main service.

Set privately: `NODE_ENV=production`, `CALLE_BASE_URL=https://api.heycall-e.com`, `CALLE_API_KEY`, `CALLE_OPERATOR_TOKEN` (a separate random secret of at least 24 characters), and `CALLE_ALLOWED_PHONES` (only consenting E.164 recipients). `GEMINI_API_KEY` is optional for fresh RFP analysis. Never use a VITE_ prefix for secrets. The operator token is entered into the password field and is not persisted by the app. A health response only establishes configuration presence, not provider validity or credits.

Source: https://render.com/docs/deploy-node-express-app

## Live operation and cancellation limits

The operator has already performed one authorized test; no further call is required to reproduce the no-call demo. Live calls require the operator token, an allowlisted recipient, reviewed questions, and explicit authorization. The prompt identifies the AI, asks approved business questions, and prohibits purchases or commitments. Do not use this workflow for emergency, medical, legal, or financial advice. Procurement compliance answers remain advisory and require human review.

English calls to Canada were rejected by CALL-E during the test. The UI defaults to US and disables Canada for this English-only workflow. Confirm current recipient/language support in the provider dashboard before any new authorized test.

Creation has a 60-second server timeout and 75-second browser timeout. There is no automatic redial. One request consumes the process's demo budget, including rejected or ambiguous attempts. Repeated identical requests share an idempotency key. Before any intentional server reset, reconcile the provider dashboard. Do not scale this in-memory demo to multiple instances.

Closing the tab does **not** cancel a submitted call. This UI has no provider cancellation control; use the CALL-E dashboard if cancellation is available and verify its outcome. There are no scheduled or recurring calls. Stop local servers / disable the isolated service to prevent future requests, but do not claim that doing so recalls a submitted call.

Newly returned developer API task IDs are saved in **sessionStorage**, scoped to the opportunity. A page refresh restores that ID; re-entering the operator token resumes GET-only polling. Phone numbers, tokens, transcripts, and result facts are not saved by this feature. Storage can be unavailable; server restarts lose the allowed-ID set, and closing the tab ends browser-session recovery. This is not durable recovery. A CALL-E dashboard conversation ID cannot be substituted for the developer API task ID.

## Evidence and known limits

On September 13, 2026, the operator reported a 37-second real CALL-E call to their consenting test number. Their pasted provider transcript shows AI disclosure followed by a voicemail message asking the sample RFP question. Personal identifiers and raw transcript are omitted from this public guide. This establishes author-reported live call execution; it does not establish supplier answers or successful live result rendering.

Local tests compare the provider-shaped fixture with the UI: use `recipients[0].structured_result`, never overall `structured_result.completed_count`; preserve unknown certification status and follow-up true. Polling errors can be resumed with GET only. No raw response from the real call was captured before the browser refresh, so **real response-to-UI acceptance remains unverified**. Do not present simulated values as real call results.

## Submission handoff

See `SUBMISSION.md` for ready-to-paste project text, judge steps, and remaining account actions. The final recording distinguishes the local simulation from author-reported voicemail evidence. Keep the demo under 180 seconds. Neither a merge nor a final Devpost submission is part of this release preparation.
