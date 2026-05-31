import React, { useState } from "react";
import { CurrencyCode, CURRENCY_MAP, PRICING_PLANS, PREMIUM_ADD_ONS, PricingPlan } from "../types";
import { Check, Info, Plus, ShieldCheck, Zap, ArrowRight, Layers } from "lucide-react";
import { playSoftClick, playMetallicPing } from "../utils/audioUtils";

interface PricingEngineProps {
  currentCurrency: CurrencyCode;
  soundEnabled: boolean;
  preSelectedPlanId?: string; // support selecting from other parts of the page
}

export default function PricingEngine({
  currentCurrency,
  soundEnabled,
  preSelectedPlanId = "growth",
}: PricingEngineProps) {
  const currency = CURRENCY_MAP[currentCurrency];

  const [selectedPlanId, setSelectedPlanId] = useState<string>(preSelectedPlanId);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Convert and format currency
  const formatCost = (inrCost: number) => {
    const converted = Math.round(inrCost * currency.rate);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currentCurrency === "AED" ? "AED" : currentCurrency,
      maximumFractionDigits: 0,
    })
      .format(converted)
      .replace("AED", "د.إ");
  };

  const activePlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  // Calculate sum of add-ons
  const addOnsCostINR = selectedAddOnIds.reduce((acc, id) => {
    const item = PREMIUM_ADD_ONS.find((a) => a.id === id);
    return acc + (item ? item.basePriceINR : 0);
  }, 0);

  const totalCostINR = activePlan.basePriceINR + addOnsCostINR;

  const handleToggleAddOn = (id: string) => {
    playSoftClick(soundEnabled);
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlanSelect = (id: string) => {
    playSoftClick(soundEnabled);
    setSelectedPlanId(id);
  };

  // Compile the smart WhatsApp order link (Intelligent Automation A)
  const handleInitiateWhatsAppForge = () => {
    playSoftClick(soundEnabled);
    
    // Get formatted listing
    const planNameText = activePlan.name;
    const addOnNamesText = selectedAddOnIds.length > 0
      ? selectedAddOnIds.map(id => PREMIUM_ADD_ONS.find(a => a.id === id)?.name).join(", ")
      : "None";
    
    const formattedTotalAmount = formatCost(totalCostINR) + ` (${currentCurrency === "INR" ? "₹" : currentCurrency})`;

    const customMsg = `Hi Subhojeet! 🦅 I want to build my empire. My selection: Plan: ${planNameText} Add-ons: ${addOnNamesText} Total: ${formattedTotalAmount} Let's start the 48-hour forge!`;
    const encodedText = encodeURIComponent(customMsg);
    
    const whatsappUrl = `https://wa.me/919508931760?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="pricing" className="py-24 bg-black relative select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.04)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-amber-500 uppercase mb-4 animate-pulse">
            <Zap className="w-3.5 h-3.5" />
            REVENUE CONFIGURATION ENGINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            The Golden <span className="text-amber-400 italic">Pricing Engine</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Toggle your core bundle &amp; add-ons. Watch values adjust instantly in real-time.
          </p>
        </div>

        {/* Two-Column configuration matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Core Plans list */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    onMouseEnter={() => playMetallicPing(soundEnabled)}
                    className={`rounded-2xl border p-5 cursor-pointer relative h-full flex flex-col justify-between transition-all ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500/40 shadow-[0_4px_30px_rgba(245,158,11,0.08)] ring-2 ring-amber-500/20 scale-[1.02]"
                        : "bg-zinc-950/85 border-zinc-900/60 hover:border-zinc-800"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-4 bg-amber-500 text-black text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded border border-amber-400/35">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                        BUNDLE PLAN
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-black text-[#FFF] tracking-tight mb-2">
                        {plan.name}
                      </h4>
                      <div className="text-xl sm:text-2xl font-mono font-black text-amber-400 mb-4">
                        {formatCost(plan.basePriceINR)}
                      </div>
                    </div>

                    <div className="space-y-2 mt-2 border-t border-zinc-900 pt-3">
                      <div className="text-[9px] font-mono tracking-widest text-[#FFF] uppercase font-semibold mb-2">
                        Included features:
                      </div>
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-[11px] text-zinc-400 leading-tight uppercase">
                          <Check className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Premium Add-ons matrix */}
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6">
              <h4 className="text-xs font-mono tracking-widest text-[#FFF] uppercase mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Select Premium Add-ons to boost your empire:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREMIUM_ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddOn(addon.id)}
                      onMouseEnter={() => playMetallicPing(soundEnabled)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-amber-500/5 border-amber-500/30 text-amber-400"
                          : "bg-zinc-900/10 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 pr-2">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? "bg-amber-500 text-black border-amber-500" : "bg-zinc-950 border-zinc-800"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider leading-tight text-[#FFF]">
                            {addon.name}
                          </p>
                          <p className="text-[9px] text-zinc-500 font-mono uppercase mt-1 leading-normal">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-amber-500 shrink-0">
                        + {formatCost(addon.basePriceINR)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Revenue Summary and WhatsApp Forge CTA */}
          <div className="lg:col-span-4 bg-gradient-to-b from-zinc-950 via-zinc-950 to-amber-950/20 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between items-stretch">
            
            <div>
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4 text-center">
                REAL-TIME TRANSACTION LEDGER
              </div>

              {/* Formula Breakdown */}
              <div className="space-y-4 border-b border-zinc-900 pb-5 mb-5 uppercase font-mono text-[11px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Selected Bundle:</span>
                  <span className="text-zinc-200">{activePlan.name}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Bundle Base Cost:</span>
                  <span className="text-[#FFF] font-black">{formatCost(activePlan.basePriceINR)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Add-ons Surcharges:</span>
                  <span className="text-amber-500 font-black">+ {formatCost(addOnsCostINR)}</span>
                </div>
                {selectedAddOnIds.length > 0 && (
                  <div className="text-[9px] text-zinc-500 space-y-1 pl-2 border-l border-amber-500/20">
                    {selectedAddOnIds.map((id) => (
                      <div key={id} className="flex justify-between">
                        <span>• {PREMIUM_ADD_ONS.find((a) => a.id === id)?.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Calculation Display */}
              <div className="text-center py-6">
                <div className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase font-black mb-1 animate-pulse">
                  ESTIMATED EMPIRE TOTAL
                </div>
                <h2 className="text-3xl sm:text-5xl font-mono font-black text-amber-400 tracking-tighter mb-2">
                  {formatCost(totalCostINR)}
                </h2>
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  Includes 2-Day Forge &amp; 100% Quality Guard
                </p>
              </div>
            </div>

            {/* Smart automation submissions */}
            <div className="space-y-4 mt-6">
              
              <button
                onClick={handleInitiateWhatsAppForge}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase rounded-lg shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Harness 48h Forge Now</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform font-bold" />
              </button>

              <div className="bg-zinc-900/30 border border-zinc-900 p-3.5 rounded-lg flex gap-2.5 items-start">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-mono text-zinc-500 leading-normal uppercase">
                  <strong className="text-[#FFF]">SEE FIRST, PAY LATER GUARANTEE:</strong> We formulate, code, and execute your live portal first. You inspect layout and performance. You only commit payments once we confirm deep perfection.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
