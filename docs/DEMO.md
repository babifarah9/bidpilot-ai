# BidPilot Voice narrated demo

Export target: 2:05, always below 3:00. The supplied rehearsal uses synthetic narration and a clearly labeled local provider simulation. It is not a live-call demonstration. No real supplier facts or fresh Gemini analysis are claimed.

## Narration and screen plan

### 0:00–0:25 — Problem and existing sample

“Procurement teams can analyze an RFP and still lack the facts needed to decide whether to bid. Is a supplier available? Can they deliver on time? Do they cover the required location? BidPilot Voice adds an authorized phone verification workflow to BidPilot AI. This recording uses a sample opportunity and simulated call results. No real telephone call is placed.”

Show landing page, select Try Demo, show the sample opportunity dashboard.

### 0:25–0:50 — Review the request

“From the opportunity dashboard, we open BidPilot Voice. The operator enters a consenting supplier contact and reviews the exact questions. For this example, we ask about availability, lead time, coverage, qualifications, and non-binding indicative pricing. The CALL-E API key remains on the server. A separate operator token and a configured recipient allowlist restrict access to the test workflow.”

Scroll to the panel; enter fixture operator token, fictional supplier, reserved test number, US, and questions. Keep a persistent LOCAL SIMULATION label.

### 0:50–1:15 — Authorization

“The agent must identify itself as AI. It may only ask the approved business questions, and it may not place orders or make commitments. The start button requires explicit authorization. Editing the recipient or questions clears that authorization. Once we start, the request is locked. Retrying an unchanged request preserves its identifier to reduce duplicate-call risk.”

Demonstrate unchecked button, check authorization, then start the simulated request.

### 1:15–1:40 — Result and decision

“BidPilot monitors the call and displays the supplier-level result. Here the simulated supplier reports availability, ten business days of lead time, Montreal coverage, and a non-binding price of one hundred fifty Canadian dollars. Certification documentation is still unknown, so human follow-up remains required. These are supplier-reported answers, not independently verified certifications. A task-level completion count never replaces the supplier facts.”

Show queued then completed status and scroll through all seven result fields.

### 1:40–2:05 — Limits and value

“The local implementation passes TypeScript checking, production build, and backend integration checks for authorization, recipient restrictions, duplicate requests, and result retrieval. Separately, the operator reported a real thirty-seven-second CALL-E test that reached voicemail. No supplier answers were obtained, and its live response was not captured for UI comparison. BidPilot Voice helps procurement teams turn unanswered questions into reviewable evidence while keeping consequential decisions with the human.”

Show end card with local validation, author-reported real voicemail test, and live response comparison unverified.

## Evidence boundaries

The screen recording shows the functioning app with a local provider fixture. Its closing narration reports the separate real voicemail test; no real call audio or personal identifiers are included. Do not replace the simulation disclosure or present its supplier facts as the real test result. The provider transcript was pasted by the operator; it is author-reported evidence, not independently retrieved by this recording. An unanswered voicemail cannot verify supplier facts. The public sample-result preview also works without an operator token or API request.

Before uploading, verify the MP4 duration with ffprobe and confirm it remains below 180 seconds. The video uses synthetic narration and no background music. Upload to YouTube or Vimeo; the local MP4 is not itself the public submission link.
