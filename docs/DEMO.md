# BidPilot Voice narrated demo

Target: 2:20–2:40, always below 3:00. The supplied rehearsal uses synthetic narration and a clearly labeled local provider simulation. It is not a live-call demonstration. No real supplier facts or fresh Gemini analysis are claimed.

## Narration and screen plan

### 0:00–0:25 — Problem and existing sample

“Procurement teams can analyze an RFP and still lack the facts needed to decide whether to bid. Is a supplier available? Can they deliver on time? Do they cover the required location? BidPilot Voice adds an authorized phone verification workflow to BidPilot AI. This recording uses a sample opportunity and simulated call results. No real telephone call is placed.”

Show landing page, select Try Demo, show the sample opportunity dashboard.

### 0:25–0:55 — Review the request

“From the opportunity dashboard, we open BidPilot Voice. The operator enters a consenting supplier contact and reviews the exact questions. For this example, we ask about availability, lead time, coverage, qualifications, and non-binding indicative pricing. The CALL-E API key remains on the server. A separate operator token and a configured recipient allowlist restrict access to the test workflow.”

Scroll to the panel; enter fixture operator token, fictional supplier, reserved test number, CA, and questions. Keep a persistent LOCAL SIMULATION label.

### 0:55–1:20 — Authorization

“The agent must identify itself as AI. It may only ask the approved business questions, and it may not place orders or make commitments. The start button requires explicit authorization. Editing the recipient or questions clears that authorization. Once we start, the request is locked. Retrying an unchanged request preserves its identifier to reduce duplicate-call risk.”

Demonstrate unchecked button, check authorization, then start the simulated request.

### 1:20–1:55 — Result and decision

“BidPilot monitors the call and displays the supplier-level result. Here the simulated supplier reports availability, ten business days of lead time, Montreal coverage, and a non-binding price of one hundred fifty Canadian dollars. Certification documentation is still unknown, so human follow-up remains required. These are supplier-reported answers, not independently verified certifications. A task-level completion count never replaces the supplier facts.”

Show queued then completed status and scroll through all seven result fields.

### 1:55–2:20 — Limits and value

“The local implementation passes TypeScript checking, production build, and backend integration checks for authorization, recipient restrictions, duplicate requests, and result retrieval. The next acceptance step is one consenting live CALL-E test, followed by comparison of its actual response with this interface. BidPilot Voice helps procurement teams turn unanswered questions into reviewable evidence while keeping consequential decisions with the human.”

Show end card with local validation and live-test pending status.

## Final live version

Replace the opening simulation disclosure and the simulated-result narration only after a real authorized test passes. Use the consenting participant's actual answers. Insert brief consented call audio or CALL-E dashboard evidence; mask identity and tokens. An edited transition can omit waiting time, but label it “Call wait shortened.” Never present a fixture as a real CALL-E response. Recheck exact narration against actual UI values, watch/listen to the complete export, and inspect duration with `ffprobe` before uploading. Submission and publishing remain the user's actions.
