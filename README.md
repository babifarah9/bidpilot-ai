# BidPilot AI — BidPilot Voice

**Autonomous phone intelligence for procurement and RFP decisions.**

BidPilot AI analyzes procurement packages, identifies compliance gaps and bid risks, and helps teams reach a grounded go/no-go decision. For the **CALL-E: Your Code Is Calling** hackathon, BidPilot adds **BidPilot Voice**: an authorized phone-verification workflow that turns unresolved procurement questions into structured evidence.

## CALL-E hackathon flow

1. Analyze an RFP / procurement package in BidPilot.
2. Review unresolved supplier or provider facts.
3. Enter an authorized supplier/provider contact and preview the exact facts to verify.
4. Explicitly authorize the call.
5. BidPilot's Express backend invokes CALL-E's Developer API at runtime.
6. CALL-E identifies itself as an AI calling for procurement verification and asks only the approved business questions.
7. BidPilot polls the CALL-E result and renders structured evidence such as availability, lead time, coverage, certifications, indicative pricing, and whether human follow-up is required.

The CALL-E key and target phone number are never exposed as frontend configuration. Calls are intentionally constrained so the agent cannot make purchases, negotiate binding terms, make commitments, or request sensitive personal information.

## Architecture

```text
RFP / procurement docs
        |
        v
BidPilot analysis (Gemini)
        |
        v
Unresolved procurement fact
        |
        v
Human preview + explicit authorization
        |
        v
BidPilot Express backend
        |
        v
CALL-E Developer API  POST /v1/calls
        |
        v
Authorized supplier/provider phone call
        |
        v
GET /v1/calls/{call_id}
        |
        v
Structured verification evidence in BidPilot
```

## CALL-E structured result

BidPilot requests a per-recipient structured result with these fields:

- `availability`
- `lead_time`
- `geographic_coverage`
- `certification_status`
- `indicative_pricing`
- `follow_up_required`
- `notes`

Unknown facts are recorded as unknown rather than inferred.

## Run locally

**Prerequisites:** Node.js and CALL-E/Gemini API keys.

```bash
npm install
cp .env.example .env
npm run dev
```

Set at minimum:

```bash
GEMINI_API_KEY="..."
CALLE_API_KEY="..."
CALLE_BASE_URL="https://api.heycall-e.com"
```

Open the demo opportunity dashboard and scroll to **BidPilot Voice · Powered by CALL-E**.

## Hackathon demo scenario

For the demo, use a phone number you own or a person/business that has explicitly agreed to receive the test call. A strong 3-minute demo is:

**RFP analysis → unresolved supplier fact → preview/authorize → real CALL-E call → structured evidence returned to BidPilot.**

## Safety

BidPilot Voice requires an explicit authorization checkbox before the backend will create a CALL-E call. The backend also rejects malformed phone numbers and instructs CALL-E to identify itself as AI, avoid sensitive personal information, make no purchases or commitments, and ask only the stated verification questions.

## Existing BidPilot capabilities

The broader application includes document parsing, procurement analysis, amendment/conflict review, compliance matrices, pricing review, bid scoring, proposal drafting, requirement coverage, and readiness review.
