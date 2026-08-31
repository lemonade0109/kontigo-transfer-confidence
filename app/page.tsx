"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Landmark, Route, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

type Step = 1 | 2 | 3;
const countries = ["Colombia", "Mexico", "Argentina", "Peru", "Brazil", "Venezuela"];
const deliveryMethods = ["Bank account", "Kontigo wallet", "Local payout"];

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState("200");
  const [currency] = useState("USDC");
  const [country, setCountry] = useState("Colombia");
  const [recipient, setRecipient] = useState("Sofia Martinez");
  const [deliveryMethod, setDeliveryMethod] = useState("Bank account");

  const numericAmount = Number(amount) || 0;
  const fee = numericAmount > 0 ? Math.max(1.25, numericAmount * 0.008) : 0;
  const recipientUsd = Math.max(0, numericAmount - fee);
  const copRate = 3980; // illustrative demo rate only
  const recipientLocal = recipientUsd * copRate;
  const canContinue = useMemo(() => Number.isFinite(numericAmount) && numericAmount > 0 && country.length > 0, [numericAmount, country]);

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
          <div className="step-copy"><span>Step {step} of 5</span><strong>{step === 1 ? "Start transfer" : step === 2 ? "Recipient" : "Transfer confidence"}</strong></div>
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
              <div className="ai-card"><div className="ai-icon"><Sparkles size={18}/></div><p className="eyebrow">Something unclear?</p><h3>Ask about this transfer.</h3><p>In Phase 3, the assistant will explain fees, route, timing and failure states using only this transfer’s structured data.</p><button className="secondary-button" onClick={()=>alert("AI explanation panel arrives in Phase 3.")}>Ask AI <Sparkles size={16}/></button></div>
              <button className="primary-button" onClick={()=>alert("Phase 2 complete. Next: AI explanation + final review.")}>Review transfer <ArrowRight size={18}/></button>
              <p className="prototype-note">Illustrative values only. No real transfer is executed.</p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
