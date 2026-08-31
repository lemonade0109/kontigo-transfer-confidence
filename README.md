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

## Screenshots

### 1. Start a transfer

![Start transfer screen showing an amount and destination selector](public/Screenshot%202026-08-31%20225931.png)

The first screen captures the amount and recipient country while setting the expectation that fees, delivery route, and recipient outcome will be shown before confirmation.

### 2. Add recipient details

![Recipient screen showing Sofia Martinez and the Kontigo wallet delivery method](public/Screenshot%202026-08-31%20225951.png)

The recipient step records who will receive the transfer and how it will be delivered, then previews the transfer details that will be checked next.

### 3. Review transfer confidence

![Transfer confidence screen showing recipient payout, fee, estimated arrival, route, and confidence checks](public/Screenshot%202026-08-31%20230021.png)

The confidence view makes the expected payout, illustrative fee, timing, local-payout route, and readiness checks visible in one place. It also offers the constrained AI explainer for questions about these displayed facts.

### 4. Review before confirming

![Final review screen showing the recipient, destination, delivery method, illustrative fee, and estimated arrival](public/Screenshot%202026-08-31%20230045.png)

The final review consolidates the transfer details and confidence summary before the user confirms the demo transfer.

### 5. Complete the demo

![Completion screen confirming a 200 USDC prototype transfer to Sofia Martinez in Colombia](public/Screenshot%202026-08-31%20230104.png)

The completion screen closes the prototype journey, clearly stating that the transfer is simulated and no real funds have moved.

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
