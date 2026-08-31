"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Step = 1 | 2;
const countries = [
  "Colombia",
  "Mexico",
  "Argentina",
  "Peru",
  "Brazil",
  "Venezuela",
];
const deliveryMethods = ["Bank account", "Kontigo wallet", "Local payout"];

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState("200");
  const [currency] = useState("USDC");
  const [country, setCountry] = useState("Colombia");
  const [recipient, setRecipient] = useState("Sofia Martinez");
  const [deliveryMethod, setDeliveryMethod] = useState("Bank account");

  const canContinue = useMemo(
    () => Number(amount) > 0 && country.length > 0,
    [amount, country],
  );

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="prototype-card">
        <header className="topbar">
          <div className="brand-wrap">
            <div className="brand-mark">K</div>
            <div>
              <p className="brand-name">Kontigo</p>
              <p className="brand-subtitle">Transfer confidence prototype</p>
            </div>
          </div>
          <div className="exploration-badge">
            <Sparkles size={14} /> Product exploration
          </div>
        </header>

        <div className="step-row">
          <div className="step-copy">
            <span>Step {step} of 5</span>
            <strong>{step === 1 ? "Start transfer" : "Recipient"}</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${step * 20}%` }} />
          </div>
        </div>

        {step === 1 ? (
          <div className="content-grid">
            <section className="form-panel">
              <button className="ghost-back" disabled>
                <ArrowLeft size={18} />
              </button>
              <p className="eyebrow">Send money</p>
              <h1>Where should your money go?</h1>
              <p className="lede">
                Start with the amount and destination. We’ll make the route,
                fees and recipient outcome clear before anything is confirmed.
              </p>

              <div className="field-stack">
                <label className="field-label">
                  Amount
                  <div className="money-field">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      inputMode="decimal"
                    />
                    <div className="currency-pill">
                      {currency}
                      <ChevronDown size={15} />
                    </div>
                  </div>
                </label>
                <label className="field-label">
                  Recipient country
                  <div className="select-shell">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      {countries.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={17} />
                  </div>
                </label>
              </div>

              <button
                className="primary-button"
                disabled={!canContinue}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight size={18} />
              </button>
              <p className="prototype-note">
                Demo only. No real funds are moved.
              </p>
            </section>

            <aside className="context-panel">
              <div className="context-icon">
                <ShieldCheck size={24} />
              </div>
              <p className="eyebrow">Confidence before confirmation</p>
              <h2>Know what happens before you send.</h2>
              <p>
                This prototype explores a clearer transfer experience for
                cross-border payments.
              </p>
              <div className="mini-list">
                <div>
                  <Check size={16} /> Fees shown before approval
                </div>
                <div>
                  <Check size={16} /> Recipient outcome explained
                </div>
                <div>
                  <Check size={16} /> Delivery route made understandable
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="content-grid">
            <section className="form-panel">
              <button className="ghost-back" onClick={() => setStep(1)}>
                <ArrowLeft size={18} /> Back
              </button>
              <p className="eyebrow">Recipient</p>
              <h1>Who are you sending to?</h1>
              <p className="lede">
                We’ll use these details to prepare the transfer confidence
                preview next.
              </p>

              <div className="field-stack">
                <label className="field-label">
                  Recipient name
                  <input
                    className="text-field"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient name"
                  />
                </label>
                <label className="field-label">
                  Delivery method
                  <div className="select-shell">
                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    >
                      {deliveryMethods.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown size={17} />
                  </div>
                </label>
              </div>

              <button
                className="primary-button"
                onClick={() =>
                  alert(
                    "Phase 1 complete. Next we build the Transfer Confidence screen.",
                  )
                }
              >
                Continue <ArrowRight size={18} />
              </button>
              <p className="prototype-note">
                Demo only. Recipient details are simulated.
              </p>
            </section>

            <aside className="summary-panel">
              <p className="eyebrow">Transfer so far</p>
              <div className="summary-amount">
                <span>${amount || "0"}</span>
                <small>{currency}</small>
              </div>
              <div className="summary-divider" />
              <div className="summary-row">
                <span>Destination</span>
                <strong>{country}</strong>
              </div>
              <div className="summary-row">
                <span>Recipient</span>
                <strong>{recipient || "Not entered"}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <strong>{deliveryMethod}</strong>
              </div>
              <div className="next-card">
                <ShieldCheck size={19} />
                <div>
                  <strong>Next: Transfer Confidence</strong>
                  <p>
                    Fees, timing, route and recipient outcome will be explained
                    before approval.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
