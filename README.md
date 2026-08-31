# Kontigo Transfer Confidence

An independent product exploration inspired by Kontigo's cross-border money movement experience.

## The hypothesis

Cross-border transfers can create uncertainty at the exact moment a user is about to confirm: What will the recipient receive? What is the fee? How will the money move? How long could it take? What happens if something goes wrong?

This prototype explores a **Transfer Confidence Layer** that brings those answers together before confirmation.

## Demo flow

1. **Start Transfer** — choose an amount and destination.
2. **Recipient** — add recipient and delivery details.
3. **Transfer Confidence** — review illustrative cost, payout, timing, route and transfer checks.
4. **Ask AI** — ask plain-language questions about the structured transfer details.
5. **Review & Confirm** — see the important information together before making a decision.
6. **Success** — complete the prototype journey with a clear demo-only confirmation.

## Why the AI is constrained

For a financial product, an AI assistant should not invent exchange rates, fees, settlement times or guarantees.

In this prototype, the assistant is deliberately limited to **explaining structured transfer facts already present in the experience**. The responses are simulated and deterministic so the product behavior can be evaluated safely without presenting generated financial data as live information.

## What this prototype is testing

The core question is simple:

> Can making transfer mechanics understandable before confirmation increase a user's confidence in a cross-border transfer?

The concept focuses on four pieces of clarity:

- recipient outcome
- visible cost
- expected transfer route
- timing and failure-state explanation

## Deliberately out of scope

This is a narrow proof of concept, not a production payments implementation. It does not include:

- live Kontigo APIs
- real exchange-rate or fee quotes
- authentication or KYC
- real payment rails
- transaction execution
- production compliance logic

No real funds are moved.

## Tech

- Next.js
- React
- TypeScript
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Disclaimer

This is an independent product exploration created as a proof of work. It is not an official Kontigo product and does not use live Kontigo financial data.
