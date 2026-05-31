import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SeoLossCalculator from "./components/SeoLossCalculator";
import SgOptimizer from "./components/SgOptimizer";
import PillarServices from "./components/PillarServices";
import PricingEngine from "./components/PricingEngine";
import BrandQuiz from "./components/BrandQuiz";
import FounderVault from "./components/FounderVault";
import Roadmap from "./components/Roadmap";
import ChatbotConcierge from "./components/ChatbotConcierge";
import FloatingControls from "./components/FloatingControls";
import { CurrencyCode } from "./types";
import { playSoftClick, playMetallicPing, playGoldenChime, toggleAmbientCinemaHum } from "./utils/audioUtils";
import { Eye, ShieldCheck, Terminal, Heart, Sparkles, MessageCircle, Info } from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientHumEnabled, setAmbientHumEnabled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("growth");
  
  // Custom interactive addition: X-Ray code lens toggle
  const [xrayMode, setXrayMode] = useState(false);
  const [lastHoveredTelemetry, setLastHoveredTelemetry] = useState<string>("SYSTEM_IDLE: Hover anywhere in X-Ray Lens mode.");

  // Toggle ambient humming soundscape
  const handleToggleAmbientHum = () => {
    playSoftClick(soundEnabled);
    const newVal = !ambientHumEnabled;
    setAmbientHumEnabled(newVal);
    toggleAmbientCinemaHum(newVal);
  };

  const handleToggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    playSoftClick(newVal);
  };

  // Intercepting SEO loss calculation leaks (CTA mapping)
  const handleFixLeak = (leakAmountFormatted: string) => {
    setSelectedPlanId("growth");
    
    // Smooth scroll down to pricing configurator
    const pricingEl = document.getElementById("pricing");
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: "smooth" });
    }

    // Alert user we locked in Growth plan to plug leak
    setLastHoveredTelemetry(`CALIBRATING ENGINES: PLUGGING REVENUE DEFICIT OF ${leakAmountFormatted} USING NEXT.JS SHELL.`);
  };

  // Intercepting Service Pillar activations
  const handleSelectService = (serviceName: string) => {
    setChatOpen(true);
    setLastHoveredTelemetry(`CONCIERGE ACCESSING: '${serviceName.toUpperCase()}' SOLUTION BLUEPRINT CODES.`);
  };

  // Safe window tracking for global telemetry demo when X-Ray Lens is active (Unique Addition 2)
  const handleTelemetryHover = (elementName: string, domDepth: number, seoScore: string) => {
    if (!xrayMode) return;
    playSoftClick(soundEnabled);
    setLastHoveredTelemetry(`ELEMENT: <${elementName.toUpperCase()}> // DOM_DEPTH: ${domDepth} // SEO_CREDIT: ${seoScore} // CORA_SPEED_INDEX: 100/100 (EXCELLENT).`);
  };

  return (
    <div className={`min-h-screen bg-black text-[#FFF] selection:bg-amber-500/30 selection:text-amber-300 font-sans ${xrayMode ? "cursor-help" : ""}`}>
      
      {/* Prime Header Space */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        ambientHumEnabled={ambientHumEnabled}
        onToggleAmbientHum={handleToggleAmbientHum}
      />

      {/* Global Interactive Addition: Elegant HUD displaying X-Ray system telemetry */}
      <div className="fixed bottom-6 left-6 z-40 max-w-[280px] sm:max-w-sm hidden md:block">
        <div className={`p-4 rounded-xl border bg-black/95 backdrop-blur-md transition-all ${
          xrayMode ? "border-amber-500/40 shadow-[0_4px_24px_rgba(245,158,11,0.15)] text-amber-400" : "border-zinc-900/80 text-zinc-500"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                playSoftClick(soundEnabled);
                setXrayMode(!xrayMode);
              }}
              onMouseEnter={() => playMetallicPing(soundEnabled)}
              className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-black px-2.5 py-1.5 rounded transition-all cursor-pointer ${
                xrayMode ? "bg-amber-500 text-black" : "bg-zinc-900 hover:text-zinc-300"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{xrayMode ? "X-Ray Mode Active" : "Reveal X-Ray Code Matrix"}</span>
            </button>
            <span className="text-[8px] font-mono text-zinc-650 tracking-wider">
              PRD ADDITION 02
            </span>
          </div>
          
          <div className="flex items-start gap-2 border-t border-zinc-900 pt-2.5 mt-1">
            <Terminal className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <span className="text-[9px] font-mono leading-tight uppercase select-none">
              {lastHoveredTelemetry}
            </span>
          </div>
        </div>
      </div>

      {/* Core Landing Canvas View */}
      <div 
        onMouseEnter={() => handleTelemetryHover("HeroSection", 3, "SEO_OPTIMAL")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <HeroSection
          soundEnabled={soundEnabled}
          onOpenChat={() => {
            setChatOpen(true);
            playGoldenChime(soundEnabled);
          }}
          onExplorePlans={() => {
            const el = document.getElementById("pricing");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* Real-time Ominous SEO Loss Evaluator */}
      <div 
        onMouseEnter={() => handleTelemetryHover("SeoCalculator", 4, "FOMO_CALIBRATED")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <SeoLossCalculator
          currentCurrency={currency}
          soundEnabled={soundEnabled}
          onFixLeak={handleFixLeak}
        />
      </div>

      {/* Dynamic Google SERP & Schema Rank Calibration Engine */}
      <div 
        onMouseEnter={() => handleTelemetryHover("GoogleSerpOptimizer", 5, "GOOGLE_PAGE1_CALCULATED")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <SgOptimizer
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Domain Pillars Interactive Showcase */}
      <div 
        onMouseEnter={() => handleTelemetryHover("PillarMatrix", 4, "SCHEMA_ROBUST")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <PillarServices
          soundEnabled={soundEnabled}
          onSelectService={handleSelectService}
        />
      </div>

      {/* Comprehensive Revenue Pricing Configuration Space */}
      <div 
        onMouseEnter={() => handleTelemetryHover("PricingConfigurator", 5, "LEDGER_VAL_99%")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <PricingEngine
          currentCurrency={currency}
          soundEnabled={soundEnabled}
          preSelectedPlanId={selectedPlanId}
        />
      </div>

      {/* Chronometrical 48h Strategic Roadmap */}
      <div 
        onMouseEnter={() => handleTelemetryHover("AscensionRoadmap", 3, "HOUR_PROTOCOL")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <Roadmap
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Lead Qualifying Quiz Paradigm */}
      <div 
        onMouseEnter={() => handleTelemetryHover("BrandQuizFrame", 4, "LEAD_CAPTURE_ACTIVE")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <BrandQuiz
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Glassmorphic Profile Vault for founder Subhojeet */}
      <div 
        onMouseEnter={() => handleTelemetryHover("FounderPrestigeCard", 4, "PRESTIGE_VERIFIED")}
        className={xrayMode ? "ring-1 ring-amber-500/10 transition-all" : ""}
      >
        <FounderVault
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Persistent intelligent Chatbot Concierge Room */}
      <ChatbotConcierge
        currentCurrency={currency}
        soundEnabled={soundEnabled}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => setChatOpen(true)}
      />

      {/* Floating Price Engine & WhatsApp direct message badge controls */}
      <FloatingControls
        currentCurrency={currency}
        soundEnabled={soundEnabled}
      />

      {/* Luxury Footer panel */}
      <footer className="py-12 bg-black border-t border-zinc-900/60 select-none">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 uppercase font-mono text-[10px] text-zinc-500">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-[#FFF] font-bold tracking-widest">
              PHOENIX &amp; QUILL DIGITAL
            </span>
            <span>Jamshedpur, Jharkhand, India. All credits registered 2026.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted with pure confidence by the artisans of the Golden Forge.</span>
          </div>

          <div className="flex items-center gap-2 border border-zinc-805/85 px-3 py-1.5 rounded-lg bg-zinc-950/40 text-amber-500">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Prestige Assured 100% Quality Code Checkpoint</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
