# BidPilot Voice — submission text

## Tagline

Turn unanswered procurement questions into reviewable phone evidence with CALL-E.

## Inspiration

Analyzing an RFP can expose missing facts without resolving them. Availability, lead time, service coverage, and qualifications often require a conversation. BidPilot Voice connects that gap to an explicitly authorized phone workflow.

## What it does

An operator reviews an opportunity, enters a consenting supplier contact, and approves the exact verification questions. The Express backend submits a CALL-E Developer API task and polls its status. React displays supplier-level structured results, including unknowns and required human follow-up. The agent is instructed to disclose that it is AI and avoid orders or commitments.

Judges can explore the sample opportunity and a clearly labeled fictional result without credentials or telephone calls. Real calling remains protected by an operator token, recipient allowlist, explicit approval, stable request identifiers, and a one-request demo budget.

## How we built it

BidPilot AI is an existing React/TypeScript RFP analysis project. The hackathon branch adds CALL-E phone verification, server-side credential handling, result presentation, call safeguards, polling/error recovery, browser-session task tracking, and a public no-call preview. Express serves the Vite frontend and the CALL-E integration. The original BidPilot deployment is preserved; the hackathon demo uses a separate Render service.

## Testing and honest limits

TypeScript checking, production build, fake-provider integration tests, provider-error redaction tests, and browser checks cover the documented demo. Fixture values are checked against the UI, including supplier-level result nesting and unknown qualification status.

One operator-authorized real CALL-E test lasted 37 seconds and reached voicemail. The operator-provided dashboard transcript shows AI disclosure and the procurement question being left as a message. No supplier answers were obtained. The original API task ID/result was lost on page refresh, so matching that real response to the UI remains unverified. New task IDs now survive refresh within the same browser tab; server-restart recovery remains a limitation.

English-to-Canada was rejected in testing. The demo is English-only, defaults to US, and disables Canada. This is an experimental workflow with human decisions, not a production procurement or legal verification system.

## Judge testing instructions

1. Visit https://bidpilot-voice-demo.onrender.com and allow the free service to wake up.
2. Click **Try Demo**, then scroll to **BidPilot Voice**.
3. Click **Preview sample result (no call)**. Inspect all seven fields and the simulation disclosure. No token, API key, or phone number is needed.
4. Review the authorization form. The live start button requires explicit consent and a private operator token; public preview does not unlock real calling.
5. For local testing and fake-provider checks, follow `docs/RELEASE.md` on the `call-e-hackathon` branch.

The hosted preview covers simulated results. Live-call testing requires a separate consenting operator setup; do not publish production or operator secrets in public submission fields.

## Links to enter

- Source and implementation PR: https://github.com/babifarah9/bidpilot-ai/pull/1
- Demo: https://bidpilot-voice-demo.onrender.com
- Official contribution PR: PENDING — open the prepared contribution against CALLE-AI/awesome-phone-call-agents after creating your fork. The implementation PR above does not replace it.
- Video: PENDING — upload the final narrated MP4 to YouTube or Vimeo and enter the publicly viewable link.
- CALL-E account email: enter the email shown in your CALL-E account. Do not infer it from GitHub or Render.

## Remaining account actions

Create your GitHub fork at https://github.com/CALLE-AI/awesome-phone-call-agents/fork so the prepared contribution can be opened as a draft PR. Upload the final video to your own YouTube/Vimeo account. Enter your actual CALL-E email and review the Devpost eligibility/terms yourself before submitting. No external commitments or merge have been made by this preparation.

Official requirements: https://call-e.devpost.com/ and https://call-e.devpost.com/rules (checked September 13, 2026). Recheck the submission form before final submission.
