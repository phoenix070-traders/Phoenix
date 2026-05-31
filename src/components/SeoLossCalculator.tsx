import React, { useState, useEffect } from "react";
import { CurrencyCode, CURRENCY_MAP } from "../types";
import { ShieldAlert, Info, TrendingUp, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { playSoftClick, playMetallicPing } from "../utils/audioUtils";

interface SeoLossCalculatorProps {
  currentCurrency: CurrencyCode;
  soundEnabled: boolean;
  onFixLeak: (leakFormatted: string) => void;
}

export default function SeoLossCalculator({
  currentCurrency,
  soundEnabled,
  onFixLeak,
}: SeoLossCalculatorProps) {
  const currency = CURRENCY_MAP[currentCurrency];
  
  // Base ranges in INR: 50k to 10M
  const minBase = 50000;
  const maxBase = 10000000;
  const stepBase = 50000;

  const [revenueBaseINR, setRevenueBaseINR] = useState(1500000); // Default 15 Lakhs
  const [lossPercent, setLossPercent] = useState(45); // Standard leak percentage

  // Format currency with symbol in current currency rate
  const formatValue = (inrValue: number) => {
    const converted = Math.round(inrValue * currency.rate);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currentCurrency === "AED" ? "AED" : currentCurrency,
      maximumFractionDigits: 0,
    })
      .format(converted)
      .replace("AED", "د.إ");
  };

  const currentRevenueFormatted = formatValue(revenueBaseINR);
  const projectedLossBaseINR = revenueBaseINR * (lossPercent / 100);
  const projectedLossFormatted = formatValue(projectedLossBaseINR);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenueBaseINR(Number(e.target.value));
  };

  const handlePercentChange = (val: number) => {
    playSoftClick(soundEnabled);
    setLossPercent(val);
  };

  return (
    <section id="seo-loss" className="py-24 bg-black relative select-none overflow-hidden">
      {/* Dynamic background layers */}
      <div className="absolute inset-0 bg-gold-grid-elegant opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix-gold opacity-40 pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-red-500/5 blur-[110px] top-[15%] left-[5%] animate-drift-slow-1 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[100px] bottom-[15%] right-[5%] animate-drift-slow-3 pointer-events-none" />

      {/* Sparks */}
      <div className="absolute w-1 h-1 bg-red-400 rounded-full top-[20%] left-[15%] animate-flicker-star pointer-events-none" />
      <div className="absolute w-1 h-1 bg-amber-500/80 rounded-full top-[10%] right-[25%] animate-flicker-star [animation-delay:1.5s] pointer-events-none" />
      <div className="absolute w-1 h-1 bg-yellow-500 rounded-full bottom-[18%] left-[30%] animate-flicker-star [animation-delay:2.8s] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-red-500" />
            OMINOUS LEEDS &amp; ORGANIC DEFICIT AUDIT
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            Calculate Your <span className="text-red-500 italic">"SEO Loss"</span> Deficit
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            If your brand isn’t commanding Page 1, you are paying your competitors to exist. Let us look at the hard mathematical facts.
          </p>
        </div>

        {/* Content Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left panel: interactive parameters */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8 h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  Your Current Monthly Revenue
                </label>
                <span className="text-lg sm:text-2xl font-mono font-black text-amber-400">
                  {currentRevenueFormatted}
                </span>
              </div>

              {/* Slider scale */}
              <input
                type="range"
                min={minBase}
                max={maxBase}
                step={stepBase}
                value={revenueBaseINR}
                onChange={handleSliderChange}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none mb-4"
              />

              <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase">
                <span>{formatValue(minBase)}</span>
                <span>{formatValue(maxBase / 2)}</span>
                <span>{formatValue(maxBase)}</span>
              </div>
            </div>

            {/* Severity settings */}
            <div>
              <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
                Select Search Gaps Deficit Severity:
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Moderate Gap (30%)", desc: "Ranking in pages 2-3", val: 30 },
                  { label: "Critical Leak (45%)", desc: "No schema, low index", val: 45 },
                  { label: "Absolute Deficit (70%)", desc: "Completely invisible", val: 70 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handlePercentChange(item.val)}
                    onMouseEnter={() => playMetallicPing(soundEnabled)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      lossPercent === item.val
                        ? "bg-red-500/10 border-red-500/40 text-red-400 ring-2 ring-red-500/20"
                        : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold uppercase">{item.label}</div>
                    <div className="text-[9px] font-mono leading-tight mt-1 text-zinc-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Core diagnostic insights */}
            <div className="bg-zinc-900/30 border border-zinc-900/80 rounded-xl p-4 flex items-start gap-3.5 mt-2">
              <Info className="w-5 h-5 text-amber-500/70 shrink-0 mt-0.5" />
              <div className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase">
                <strong className="text-amber-400">WHY THIS LEAKS:</strong> 72% of all organic conversion clicks land on the top 3 spots of Google Page 1. If your architecture is loaded with slow load times, unoptimized indexing, or stale schema configurations, Google prioritizes your direct rivals, filtering high-value client intent away from you.
              </div>
            </div>
          </div>

          {/* Right panel: dramatic counter calculation */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-950 via-zinc-950 to-red-950/20 border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden h-full">
            {/* Ominous glow grids */}
            <div className="absolute inset-x-0 top-0 h-24 bg-red-500/5 blur-xl pointer-events-none" />

            <div className="w-full flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                <TrendingUp className="w-5 h-5 animate-bounce" />
              </div>

              <span className="text-[10px] font-mono tracking-[0.25em] text-red-500 uppercase font-black mb-2 animate-pulse">
                ESTIMATED MONTHLY REVENUE LEAKING
              </span>

              <h2 className="text-3xl sm:text-5xl font-mono font-black text-red-500 tracking-tighter drop-shadow-[0_4px_10px_rgba(239,68,68,0.2)] mb-4">
                {projectedLossFormatted}
              </h2>

              <p className="text-xs font-mono text-zinc-500 max-w-xs uppercase leading-relaxed mb-6">
                That amounts to <strong className="text-red-400">{formatValue(projectedLossBaseINR * 12)}</strong> of capital slipping directly to your rivals every fiscal year.
              </p>
            </div>

            {/* CTA action to fix SEO gap immediately */}
            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  playSoftClick(soundEnabled);
                  onFixLeak(projectedLossFormatted);
                }}
                onMouseEnter={() => playMetallicPing(soundEnabled)}
                className="w-full py-4 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 rounded-xl text-red-400 hover:text-red-300 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Plug This Leak with Subhojeet</span>
                <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-zinc-500 tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
                Guaranteed 100% Core Web SEO audits applied
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
