# One additional consenting live test

Purpose: confirm the actual CALL-E API result renders correctly in BidPilot. The operator authorized this additional test after the first test reached voicemail. This document is a plan, not a completed acceptance record.

## Operator setup

Use the existing isolated demo and privately configured operator token and consenting US test number. The operator starts the call only when ready to answer. Do not put secrets in chat or a public recording. Keep one tab open through completion. No additional retry or replacement call is authorized by this test plan.

Supplier name: `Demo Supplier — role-play`
Region: `United States (US)`

Replace the entire questions field with:

```text
This is an authorized demonstration with a consenting participant role-playing a fictional supplier. Introduce yourself as an AI calling on behalf of BidPilot for a demo. Do not discuss the sample RFP's legal compliance or bid responsiveness. Ask the participant whether their fictional service is available, their lead time, service coverage, certification status, voluntary non-binding indicative price, and whether human follow-up is required. Record their actual answers and preserve unknowns. Do not place orders or make commitments.
```

Review the form, check authorization, and click Start exactly once.

## Participant answer script

Answer the phone and say:

> Yes, I consent to this AI demonstration. I am role-playing a fictional supplier. Our service is available. Lead time is ten business days. We cover Boston, Massachusetts. Certification status is unknown and needs document verification. Our indicative price is one hundred fifty US dollars, non-binding. Human follow-up is required. These are test answers, not a real commercial offer.

Respond to follow-up questions consistently. The answer script is not sent to CALL-E as prefilled result data; the agent must obtain it from the conversation.

## Capture and acceptance

Wait for a terminal call status. If monitoring pauses, use **Refresh call status (no new call)**. Do not place another call. Click **Download verification evidence** after the final result and capture a screenshot of the result fields. The export preserves the API fields used by the UI while omitting recipient identity and transcripts; review free-text notes before sharing or publishing.

Provide the downloaded JSON and the screenshot for comparison. Compare actual spoken answers with `recipient_structured_result` and the rendered fields. Wording can differ while meaning is retained: ten business days, Boston coverage, unknown certification, USD 150 non-binding, and follow-up true. Check that the overall completed_count is not displayed as supplier facts. Unknown/unanswered fields must remain unknown.

A terminal status alone does not establish success. The real API result must contain the expected recipient facts and the screenshot must show matching values. If the call reaches voicemail or facts are absent, document the outcome and do not claim acceptance.

Only after this comparison passes should the submission text and video replace the unverified status. Retain the first voicemail attempt as history, mask personal identifiers, and label the successful call as a consenting role-play test.
