"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Landmark, Route, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;
const countries = ["Colombia", "Mexico", "Argentina", "Peru", "Brazil", "Venezuela"];
const deliveryMethods = ["Bank account", "Kontigo wallet", "Local payout"];

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState("200");
  const [currency] = useState("USDC");
  const [country, setCountry] = useState("Colombia");
  const [recipient, setRecipient] = useState("Sofia Martinez");
  const [deliveryMethod, setDeliveryMethod] = useState("Bank account");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const numericAmount = Number(amount) || 0;
  const fee = numericAmount > 0 ? Math.max(1.25, numericAmount * 0.008) : 0;
  const recipientUsd = Math.max(0, numericAmount - fee);
  const copRate = 3980; // illustrative demo rate only
  const recipientLocal = recipientUsd * copRate;
  const canContinue = useMemo(() => Number.isFinite(numericAmount) && numericAmount > 0 && country.length > 0, [numericAmount, country]);

  const askTransferAI = async (question: string) => {
    const clean = question.trim();
    if (!clean) return;

    setAiLoading(true);
    setAiAnswer("");
    await new Promise((resolve) => setTimeout(resolve, 550));

    const q = clean.toLowerCase();
    let answer = "";
    if (q.includes("fee")) {
      answer = `This demo shows a ${fee.toFixed(2)} USDC fee before confirmation. The purpose is to make the cost visible up front rather than letting the user discover it after sending.`;
    } else if (q.includes("fail") || q.includes("wrong")) {
      answer = "In this prototype, a failed transfer would not be marked as delivered. A production version should clearly show whether funds are pending, returned, or need support review. This demo does not execute a real transfer.";
    } else if (q.includes("route")) {
      answer = `The prototype explains the path as: your ${currency} → conversion route → local payout → ${recipient}. The route is illustrative, but the product idea is to expose the path clearly enough that the user understands it before approval.`;
    } else if (q.includes("receive") || q.includes("amount")) {
      answer = "The recipient amount is calculated from the demo transfer amount minus the illustrative fee, then converted using a static demo rate. It is not a live Kontigo quote.";
    } else if (q.includes("time") || q.includes("arrival") || q.includes("long")) {
      answer = "The displayed arrival time is an illustrative estimate. In a real product, this should come from the actual transfer rail and transaction status rather than from the AI itself.";
    } else {
      answer = `For this transfer, the structured data says you are sending ${numericAmount.toFixed(2)} ${currency} to ${recipient} in ${country} via ${deliveryMethod}. The assistant only explains known details and does not invent live rates, fees, or settlement guarantees.`;
    }
    setAiAnswer(answer);
    setAiLoading(false);
  };

  const goBack = () => {
    if (step === 3) setStep(2);
    if (step === 2) setStep(1);
  };

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="prototype-card">
        <header className="topbar">
          <div className="brand-wrap"><div className="brand-mark">K</div><div><p className="brand-name">Kontigo</p><p className="brand-subtitle">Transfer confidence prototype</p></div></div>
          <div className="exploration-badge"><Sparkles size={14}/> Product exploration</div>
        </header>

        <div className="step-row">
          <div className="step-copy"><span>Step {step} of 5</span><strong>{step === 1
                ? "Start transfer"
                : step === 2
                  ? "Recipient"
                  : step === 3
                    ? "Transfer confidence"
                    : step === 4
                      ? "Review & confirm"
                      : "Complete"}</strong></div>
          <div className="progress-track"><div className="progress-fill" style={{width:`${step*20}%`}}/></div>
        </div>

        {step === 1 && (
          <div className="content-grid">
            <section className="form-panel">
              <button className="ghost-back" disabled><ArrowLeft size={18}/></button>
              <p className="eyebrow">Send money</p><h1>Where should your money go?</h1>
              <p className="lede">Start with the amount and destination. We’ll make the route, fees and recipient outcome clear before anything is confirmed.</p>
              <div className="field-stack">
                <label className="field-label">Amount<div className="money-field"><span className="currency-symbol">$</span><input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="decimal"/><div className="currency-pill">{currency}<ChevronDown size={15}/></div></div></label>
                <label className="field-label">Recipient country<div className="select-shell"><select value={country} onChange={e=>setCountry(e.target.value)}>{countries.map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={17}/></div></label>
              </div>
              <button className="primary-button" disabled={!canContinue} onClick={()=>setStep(2)}>Continue <ArrowRight size={18}/></button>
              <p className="prototype-note">Demo only. No real funds are moved.</p>
            </section>
            <aside className="context-panel"><div className="context-icon"><ShieldCheck size={24}/></div><p className="eyebrow">Confidence before confirmation</p><h2>Know what happens before you send.</h2><p>This prototype explores a clearer transfer experience for cross-border payments.</p><div className="mini-list"><div><Check size={16}/> Fees shown before approval</div><div><Check size={16}/> Recipient outcome explained</div><div><Check size={16}/> Delivery route made understandable</div></div></aside>
          </div>
        )}

        {step === 2 && (
          <div className="content-grid">
            <section className="form-panel">
              <button className="ghost-back" onClick={goBack}><ArrowLeft size={18}/> Back</button>
              <p className="eyebrow">Recipient</p><h1>Who are you sending to?</h1><p className="lede">We’ll use these details to prepare the transfer confidence preview next.</p>
              <div className="field-stack">
                <label className="field-label">Recipient name<input className="text-field" value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="Recipient name"/></label>
                <label className="field-label">Delivery method<div className="select-shell"><select value={deliveryMethod} onChange={e=>setDeliveryMethod(e.target.value)}>{deliveryMethods.map(d=><option key={d}>{d}</option>)}</select><ChevronDown size={17}/></div></label>
              </div>
              <button className="primary-button" onClick={()=>setStep(3)}>See transfer confidence <ArrowRight size={18}/></button>
              <p className="prototype-note">Demo only. Recipient details are simulated.</p>
            </section>
            <aside className="summary-panel"><p className="eyebrow">Transfer so far</p><div className="summary-amount"><span>${amount || "0"}</span><small>{currency}</small></div><div className="summary-divider"/><div className="summary-row"><span>Destination</span><strong>{country}</strong></div><div className="summary-row"><span>Recipient</span><strong>{recipient || "Not entered"}</strong></div><div className="summary-row"><span>Delivery</span><strong>{deliveryMethod}</strong></div><div className="next-card"><ShieldCheck size={19}/><div><strong>Next: Transfer Confidence</strong><p>Fees, timing, route and recipient outcome will be explained before approval.</p></div></div></aside>
          </div>
        )}

        {step === 3 && (
          <div className="confidence-layout">
            <section className="confidence-main">
              <button className="ghost-back" onClick={goBack}><ArrowLeft size={18}/> Back</button>
              <div className="confidence-heading"><div><p className="eyebrow">Before you send</p><h1>Transfer Confidence</h1><p className="lede">A clear preview of what is expected to happen before you approve this transfer.</p></div><div className="score-ring"><strong>92</strong><span>Confidence</span></div></div>
              <div className="transfer-hero"><div><span>You send</span><strong>{numericAmount.toFixed(2)} {currency}</strong></div><ArrowRight size={22}/><div className="align-right"><span>{recipient} receives</span><strong>{country === "Colombia" ? `COP ${recipientLocal.toLocaleString("en-US", {maximumFractionDigits:0})}` : `${recipientUsd.toFixed(2)} USD equiv.`}</strong></div></div>
              <div className="fact-grid">
                <div className="fact-card"><WalletCards size={19}/><span>Transfer fee</span><strong>{fee.toFixed(2)} USDC</strong><small>Shown before approval</small></div>
                <div className="fact-card"><Clock3 size={19}/><span>Estimated arrival</span><strong>Within minutes</strong><small>Demo estimate</small></div>
                <div className="fact-card"><Landmark size={19}/><span>Delivery</span><strong>{deliveryMethod}</strong><small>{country}</small></div>
              </div>
              <div className="route-card"><div className="section-title-row"><div><p className="eyebrow">How your money gets there</p><h3>One route, explained plainly.</h3></div><Route size={22}/></div><div className="route-line"><div className="route-node active"><span>1</span><strong>Your USDC</strong><small>{numericAmount.toFixed(2)} USDC</small></div><div className="route-connector"/><div className="route-node"><span>2</span><strong>Conversion route</strong><small>Demo settlement path</small></div><div className="route-connector"/><div className="route-node"><span>3</span><strong>Local payout</strong><small>{deliveryMethod}</small></div><div className="route-connector"/><div className="route-node"><span>4</span><strong>{recipient}</strong><small>{country}</small></div></div></div>
            </section>
            <aside className="confidence-side">
              <div className="check-card"><p className="eyebrow">Transfer checks</p><div className="check-list"><div><span className="check-dot"><Check size={14}/></span><p><strong>Recipient details present</strong><small>{recipient} · {country}</small></p></div><div><span className="check-dot"><Check size={14}/></span><p><strong>Fee visible</strong><small>{fee.toFixed(2)} USDC before confirmation</small></p></div><div><span className="check-dot"><Check size={14}/></span><p><strong>Delivery route explained</strong><small>No hidden step in this demo flow</small></p></div><div><span className="check-dot"><Check size={14}/></span><p><strong>Recipient outcome shown</strong><small>Expected payout displayed up front</small></p></div></div></div>
              <div className="ai-card"><div className="ai-icon"><Sparkles size={18}/></div><p className="eyebrow">Something unclear?</p><h3>Ask about this transfer.</h3><p>The assistant explains fees, route, timing and failure states using only this transfer’s structured data.</p><button className="secondary-button" onClick={()=>setAiOpen(true)}>Ask AI <Sparkles size={16}/></button></div>
              <button className="primary-button" onClick={()=>setStep(4)}>Review transfer <ArrowRight size={18}/></button>
              <p className="prototype-note">Illustrative values only. No real transfer is executed.</p>
            </aside>
          </div>
        )}

        {step === 4 && (
          <div className="review-layout">
            <section className="review-main">
              <button className="ghost-back" onClick={goBack}>
                <ArrowLeft size={18} />
                Back
              </button>

              <p className="eyebrow">Final review</p>
              <h1>Review before you confirm.</h1>
              <p className="lede">
                One last look at the transfer details and the checks that made this transfer understandable.
              </p>

              <div className="review-amount-card">
                <div>
                  <span>You send</span>
                  <strong>{numericAmount.toFixed(2)} {currency}</strong>
                </div>
                <ArrowRight size={21} />
                <div className="align-right">
                  <span>{recipient} receives</span>
                  <strong>
                    {country === "Colombia"
                      ? `COP ${recipientLocal.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                      : `${recipientUsd.toFixed(2)} USD equiv.`}
                  </strong>
                </div>
              </div>

              <div className="review-details">
                <div><span>Recipient</span><strong>{recipient}</strong></div>
                <div><span>Destination</span><strong>{country}</strong></div>
                <div><span>Delivery method</span><strong>{deliveryMethod}</strong></div>
                <div><span>Illustrative fee</span><strong>{fee.toFixed(2)} USDC</strong></div>
                <div><span>Estimated arrival</span><strong>Within minutes</strong></div>
              </div>

              <div className="review-confidence">
                <div className="review-confidence-top">
                  <div>
                    <p className="eyebrow">Confidence summary</p>
                    <h3>You know what happens next.</h3>
                  </div>
                  <strong className="review-score">92%</strong>
                </div>

                <div className="review-check-grid">
                  <div><Check size={15} /> Recipient reviewed</div>
                  <div><Check size={15} /> Fee visible</div>
                  <div><Check size={15} /> Route explained</div>
                  <div><Check size={15} /> Recipient outcome shown</div>
                </div>
              </div>
            </section>

            <aside className="confirm-panel">
              <div className="confirm-icon">
                <ShieldCheck size={25} />
              </div>
              <p className="eyebrow">Ready to confirm</p>
              <h2>{numericAmount.toFixed(2)} {currency}</h2>
              <p className="confirm-copy">
                You’ve reviewed the recipient, illustrative fee, expected payout, delivery route and timing.
              </p>

              <div className="confirm-recipient">
                <span>Sending to</span>
                <strong>{recipient}</strong>
                <small>{country} · {deliveryMethod}</small>
              </div>

              <button className="primary-button" onClick={() => setStep(5)}>
                Confirm prototype transfer
                <Check size={18} />
              </button>
              <p className="prototype-note">
                Demo only. Clicking confirm will not move real funds.
              </p>
            </aside>
          </div>
        )}

        {step === 5 && (
          <div className="success-layout">
            <div className="success-check">
              <Check size={34} />
            </div>
            <p className="eyebrow">Prototype transfer confirmed</p>
            <h1>Clear before confirmed.</h1>
            <p className="success-lede">
              The demo journey is complete. No real funds were moved.
            </p>

            <div className="success-card">
              <div className="success-amount">
                <span>{numericAmount.toFixed(2)} {currency}</span>
                <small>to {recipient}</small>
              </div>
              <div className="success-divider" />
              <div className="success-row"><span>Status</span><strong>Prototype confirmed</strong></div>
              <div className="success-row"><span>Destination</span><strong>{country}</strong></div>
              <div className="success-row"><span>Delivery</span><strong>{deliveryMethod}</strong></div>
              <div className="success-row"><span>Confidence reviewed</span><strong>92%</strong></div>
            </div>

            <div className="success-message">
              <ShieldCheck size={19} />
              <p>
                This concept explores how a transfer experience can make fees, routes,
                recipient outcomes and uncertainty understandable before approval.
              </p>
            </div>

            <button
              className="secondary-button success-reset"
              onClick={() => {
                setStep(1);
                setAiOpen(false);
                setAiQuestion("");
                setAiAnswer("");
              }}
            >
              Start another demo
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {aiOpen && (
          <div className="ai-overlay" onClick={() => setAiOpen(false)}>
            <aside className="ai-drawer" onClick={(event) => event.stopPropagation()}>
              <div className="ai-drawer-header">
                <div><p className="eyebrow">Transfer assistant</p><h2>Ask about this transfer</h2></div>
                <button className="drawer-close" onClick={() => setAiOpen(false)} aria-label="Close">×</button>
              </div>
              <div className="ai-context-strip">
                <ShieldCheck size={18} />
                <div><strong>{numericAmount.toFixed(2)} {currency} → {recipient}</strong><span>{country} · {deliveryMethod}</span></div>
              </div>
              <p className="drawer-intro">The assistant only explains the structured transfer information already shown in this prototype.</p>
              <div className="suggestion-list">
                {["Why is there a fee?","What happens if the transfer fails?","Why is this route being used?","Why does the recipient receive this amount?"].map((question) => (
                  <button key={question} onClick={() => { setAiQuestion(question); askTransferAI(question); }}>
                    {question}<ArrowRight size={15} />
                  </button>
                ))}
              </div>
              <div className="ask-box">
                <textarea value={aiQuestion} onChange={(event) => setAiQuestion(event.target.value)} placeholder="Ask something about this transfer..." rows={3} />
                <button className="primary-button" disabled={!aiQuestion.trim() || aiLoading} onClick={() => askTransferAI(aiQuestion)}>
                  {aiLoading ? "Explaining..." : "Ask"}{!aiLoading && <Sparkles size={16} />}
                </button>
              </div>
              {(aiLoading || aiAnswer) && (
                <div className="ai-response">
                  <div className="ai-response-title"><Sparkles size={16} /><strong>Kontigo Assistant</strong></div>
                  {aiLoading ? <div className="typing-row"><span/><span/><span/></div> : <p>{aiAnswer}</p>}
                </div>
              )}
              <div className="ai-safety-note"><ShieldCheck size={16} /><p>Demo behavior only. The assistant does not calculate or promise live exchange rates, fees, settlement times, or financial outcomes.</p></div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
