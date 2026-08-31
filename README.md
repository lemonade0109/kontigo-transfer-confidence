# Kontigo Transfer Confidence

A narrow product exploration for making cross-border transfer decisions easier to understand before a user confirms.

## Phase 3

This build includes:
- Screen 1: Start Transfer
- Screen 2: Recipient
- Screen 3: Transfer Confidence
- Confidence score and transfer checks
- Fee, payout, timing, delivery, and route preview
- Interactive Ask AI transfer explanation drawer
- Suggested questions plus custom questions
- AI behavior constrained to structured transfer details
- Responsive layout and demo-only safeguards

### Why the AI layer is designed this way
The assistant explains known transfer data. It does not invent exchange rates, fees, settlement times, or guarantees. In this prototype the responses are deterministic and simulated so the product behavior is easy to evaluate safely.

## Run locally
```bash
npm install
npm run dev
```

## Next milestone
Phase 4 will add the final review, approval, and prototype success state.
