import React, { useState } from "react";
import { MessageSquare, Tag, PhoneCall, Check, Sparkles } from "lucide-react";
import { playSoftClick, playMetallicPing, playGoldenChime } from "../utils/audioUtils";
import { CurrencyCode, CURRENCY_MAP } from "../types";

interface FloatingControlsProps {
  currentCurrency: CurrencyCode;
  soundEnabled: boolean;
}

export default function FloatingControls({ currentCurrency, soundEnabled }: FloatingControlsProps) {
  const [showTooltip, setShowTooltip] = useState<"whatsapp" | "price" | null>(null);
  
  const currencySymbol = CURRENCY_MAP[currentCurrency]?.symbol || "₹";

  const handleWhatsAppClick = () => {
    playGoldenChime(soundEnabled);
    // WhatsApp direct message URL to +919508931760
    const message = encodeURIComponent("Hello! I am visiting your Phoenix & Quill platform and would love to build a high-conversion Google Page-1 ranking website.");
    const whatsappUrl = `https://wa.me/919508931760?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePriceClick = () => {
    playSoftClick(soundEnabled);
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[99] flex flex-col gap-3 select-none pointer-events-none md:bottom-8 md:left-8">
      {/* 1. Floating Pricing Anchor Trigger (gently floating with custom pulse) */}
      <div 
        className="pointer-events-auto relative group flex items-center"
        onMouseEnter={() => {
          playMetallicPing(soundEnabled);
          setShowTooltip("price");
        }}
        onMouseLeave={() => setShowTooltip(null)}
      >
        {/* Glowing Back-pulse ring */}
        <div className="absolute inset-x-[-2px] inset-y-[-2px] rounded-full bg-amber-500/15 blur-sm group-hover:scale-115 transition-all duration-300 animate-pulse" />
        
        {/* Floating Button Container */}
        <button
          onClick={handlePriceClick}
          className="relative w-12 h-12 bg-zinc-950 border border-zinc-805 hover:border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 group-hover:text-amber-300 shadow-[0_8px_24px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Tag className="w-5 h-5" />
          
          {/* Micro currency mini-badge */}
          <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black font-mono text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black uppercase">
            {currencySymbol}
          </span>
        </button>

        {/* Premium Obsidian Tooltip */}
        {(showTooltip === "price" || showTooltip === null) && (
          <div className={`absolute left-14 bg-zinc-950 border border-zinc-900 text-[10px] font-mono uppercase font-black tracking-widest text-[#FFF] py-1.5 px-3.5 rounded-lg shadow-xl shrink-0 pointer-events-none transition-all duration-300 whitespace-nowrap ${
            showTooltip === "price" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}>
            <span className="text-amber-400 font-extrabold mr-1">🏷️ CHECK RATES ({currentCurrency})</span>
            <span className="text-zinc-500">| GO TO PRICING</span>
          </div>
        )}
      </div>

      {/* 2. Floating WhatsApp direct secure connection badge */}
      <div 
        className="pointer-events-auto relative group flex items-center"
        onMouseEnter={() => {
          playMetallicPing(soundEnabled);
          setShowTooltip("whatsapp");
        }}
        onMouseLeave={() => setShowTooltip(null)}
      >
        {/* Glowing emerald ripple halo */}
        <div className="absolute inset-x-[-3px] inset-y-[-3px] rounded-full bg-emerald-500/20 blur-md group-hover:scale-120 transition-all duration-500 animate-pulse" />
        
        {/* WhatsApp Core Trigger */}
        <button
          onClick={handleWhatsAppClick}
          className="relative w-12 h-12 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center text-white shadow-[0_8px_32px_rgba(16,185,129,0.3)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:rotate-3 active:scale-95"
        >
          {/* Custom refined WhatsApp look using Lucide's PhoneCall */}
          <MessageSquare className="w-5 h-5 fill-white/10" />
          
          {/* Online status indicator dot */}
          <span className="absolute top-0.5 right-0.5 bg-emerald-400 w-2.5 h-2.5 rounded-full border border-zinc-950 animate-ping" />
          <span className="absolute top-0.5 right-0.5 bg-emerald-300 w-2.5 h-2.5 rounded-full border border-zinc-950" />
        </button>

        {/* Premium Hover Notification Banner */}
        {(showTooltip === "whatsapp" || showTooltip === null) && (
          <div className={`absolute left-14 bg-zinc-950 border border-zinc-900 text-[10px] font-mono uppercase font-black tracking-widest text-emerald-400 py-1.5 px-3.5 rounded-lg shadow-xl shrink-0 pointer-events-none transition-all duration-300 whitespace-nowrap ${
            showTooltip === "whatsapp" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}>
            <span className="text-emerald-400">🟢 INSTANT CHAT</span>
            <span className="text-zinc-500 ml-1">| SUBHOJEET KUNDU</span>
          </div>
        )}
      </div>
    </div>
  );
}
