# BidPilot Voice narrated demo — captured live result replay

Target: 2:05. Actual local screen recording of the app replaying redacted fields from the operator-supplied live-call export. The persistent overlay labels the replay. No new call or fresh Gemini analysis is performed; narration is synthetic. Original recipient identity, task ID, and credentials are not shown.

## 0:00–0:25 — Problem

“Procurement teams can analyze an RFP and still lack the facts needed to decide whether to bid. BidPilot Voice adds an authorized phone verification workflow. This screen recording replays results captured from a completed, consenting supplier role-play call. It does not place another call. The sample opportunity is demonstration data, and the narration is synthetic.”

Show landing page and Try Demo.

## 0:25–0:50 — Reviewed questions

“The operator reviews the contact and the exact questions before authorizing a call. We ask about availability, lead time, coverage, qualifications, indicative pricing, and human follow-up. Private details in this replay are replaced with fixtures. The CALL-E API key stays on the server. A separate operator token and recipient allowlist protect the live calling workflow.”

Show the form with fixture contact details and reviewed questions. Keep the replay label visible.

## 0:50–1:15 — Authorization

“The agent is instructed to identify itself as AI and avoid purchases or commitments. The start button requires explicit authorization. Editing the recipient or questions clears approval. Once submitted, the request locks. Stable request identifiers and a one-request demo budget reduce duplicate-call risk. Here, the captured result is replayed locally; no telephone call is made.”

Demonstrate authorization and the replayed queued-to-completed response.

## 1:15–1:40 — Actual returned fields

“The captured result reports ten business days of lead time, Massachusetts coverage, and one hundred fifty US dollars in indicative pricing. Certification is unknown and needs document verification. Availability also remains unknown. Human follow-up is required. BidPilot preserves these values rather than inventing missing facts. CALL-E reports eighty-six percent completion confidence; that is not a measured accuracy score.”

Show all seven returned fields, the confidence badge, and evidence download.

## 1:40–2:05 — Verification and limits

“We compared the operator's downloaded API fields with their BidPilot screenshot. All seven recipient fields match exactly, and the confidence display is correct. This closes the response-to-interface check for this role-play test. It does not independently verify supplier claims or every spoken detail. BidPilot turns phone results into reviewable evidence, keeps unknowns visible, and leaves consequential decisions with the human.”

Show the comparison outcome and unknown availability on the end card.

## Reproduction

Use scripts/record-demo.mjs and scripts/narrate-demo.mjs. The redacted replay fixture is tests/live-result-replay.mjs; it preserves the seven supplied result values. Default backend integration tests continue to use their separate fictional fixture and make no live calls. The final video is under 180 seconds and needs a public YouTube or Vimeo link for submission.
