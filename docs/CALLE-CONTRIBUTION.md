# Prepared official repository contribution

The patch `CALLE-contribution.patch` adds one external-app reference guide and a short Apps entry. It contains no phone numbers, private call identifiers, credentials, or real transcripts. It follows the upstream AGENTS.md/CONTRIBUTING.md conventions. `python3 scripts/validate_repository.py` passed on the prepared tree on September 13, 2026.

Create your fork at https://github.com/CALLE-AI/awesome-phone-call-agents/fork. Then the prepared draft PR can be opened; the GitHub connection used here does not expose fork creation.

For a local Git workflow after the fork exists:

```sh
git clone https://github.com/babifarah9/awesome-phone-call-agents.git
cd awesome-phone-call-agents
python3 scripts/check_branch_name.py --branch docs/bidpilot-voice-reference
git switch -c docs/bidpilot-voice-reference
# Replace the path below with the downloaded patch path.
git apply /path/to/CALLE-contribution.patch
python3 scripts/validate_repository.py
git add README.md docs/bidpilot-voice.md
git commit -m "docs(apps): add BidPilot Voice external reference"
git push -u origin docs/bidpilot-voice-reference
```

If upstream has moved, resolve only the README insertion and rerun validation. Open a **draft** PR against `CALLE-AI/awesome-phone-call-agents:main` with this title and body. Do not merge.

Title: `docs(apps): add BidPilot Voice external reference`

Body:

BidPilot Voice adds reviewed supplier questions and CALL-E phone verification to an RFP analysis app. This contribution adds an external-app reference and reproduction guide, plus an Apps entry, so reviewers can run the no-call preview and inspect the implementation.

The guide documents local setup, server-side credentials, per-call authorization, E.164 allowlisting, duplicate prevention, cancellation limits, and the boundaries of the demo. Public testing requires no credentials or telephone calls. The author reports one real 37-second test reaching voicemail; supplier answers and live response-to-UI matching remain unverified. Simulated results are explicitly labeled.

Validation: upstream repository validator passed on the prepared contribution. The linked implementation passed TypeScript/build, fake-provider integration, error-redaction, and browser checks. No live calls were placed during this review. Implementation PR: https://github.com/babifarah9/bidpilot-ai/pull/1
