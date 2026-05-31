import React, { useState } from "react";
import { BRAND_QUIZ_QUESTIONS, ARCHETYPE_DETAILS, BrandQuizQuestion } from "../types";
import { Shield, Sparkles, User, Key, ArrowRight, RefreshCw, Smartphone, Star } from "lucide-react";
import { playSoftClick, playMetallicPing, playGoldenChime } from "../utils/audioUtils";

interface BrandQuizProps {
  soundEnabled: boolean;
}

export default function BrandQuiz({ soundEnabled }: BrandQuizProps) {
  // Lead states
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [leadRegistered, setLeadRegistered] = useState(false);

  // Quiz progression states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultsActive, setResultsActive] = useState(false);
  const [dominantArchetype, setDominantArchetype] = useState<string>("");

  const handleRegisterLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userContact.trim()) return;
    
    playSoftClick(soundEnabled);
    playGoldenChime(soundEnabled);
    setLeadRegistered(true);
  };

  const handleAnswerSelect = (archetype: string) => {
    playSoftClick(soundEnabled);
    const newAnswers = [...answers, archetype];
    setAnswers(newAnswers);

    if (currentQuestionIndex < BRAND_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate archetype distribution
      const tally: Record<string, number> = {};
      newAnswers.forEach((b) => {
        tally[b] = (tally[b] || 0) + 1;
      });

      // Find highest score
      let topArchetype = "Sovereign";
      let maxCount = 0;
      Object.keys(tally).forEach((key) => {
        if (tally[key] > maxCount) {
          maxCount = tally[key];
          topArchetype = key;
        }
      });

      playGoldenChime(soundEnabled);
      setDominantArchetype(topArchetype);
      setResultsActive(true);
    }
  };

  const handleResetQuiz = () => {
    playSoftClick(soundEnabled);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultsActive(false);
    setDominantArchetype("");
  };

  const handleAcquireBlueprint = () => {
    playSoftClick(soundEnabled);
    const archetypeObj = ARCHETYPE_DETAILS[dominantArchetype];
    const message = `Hi Subhojeet! I just took the Phoenix & Quill Digital Brand Archetype Quiz. My brand profile is "${archetypeObj?.title}" emphasizing "${archetypeObj?.trait}". Let's arrange a 48h launch aligned with this! My name is ${userName}.`;
    const url = `https://wa.me/919508931760?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="archetype" className="py-24 bg-black relative select-none overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-gold-grid-elegant opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix-gold opacity-30 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[100px] top-[10%] right-[5%] animate-drift-slow-1 pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-yellow-500/5 blur-[90px] bottom-[15%] left-[5%] animate-drift-slow-2 pointer-events-none" />

      {/* Sparks */}
      <div className="absolute w-1 h-1 bg-amber-400 rounded-full top-[15%] right-[20%] animate-flicker-star pointer-events-none" />
      <div className="absolute w-1 h-1 bg-yellow-500/80 rounded-full bottom-[20%] right-[10%] animate-flicker-star [animation-delay:1.2s] pointer-events-none" />
      <div className="absolute w-1 h-1 bg-amber-500 rounded-full bottom-[10%] left-[25%] animate-flicker-star [animation-delay:2.4s] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-amber-500 uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            BRAND ARCHEPLAY AUDITS
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            The Brand <span className="text-amber-400 italic">Archetype Quiz</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Unravel your brand’s psychological archetype and unlock your custom strategic Next.js code signature.
          </p>
        </div>

        {/* Master Interface Frame */}
        <div className="max-w-2xl mx-auto bg-zinc-950/75 border border-zinc-900 rounded-3xl p-6 sm:p-10 relative">
          <div className="absolute top-0 right-10 w-24 h-24 bg-amber-500/5 blur-2xl pointer-events-none" />

          {/* Phase 1: Lead capture gate */}
          {!leadRegistered ? (
            <form onSubmit={handleRegisterLead} className="space-y-6">
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono tracking-widest text-[#FFF] uppercase font-black bg-zinc-900 px-3 py-1.5 rounded">
                  🛡️ CREDENTIAL VERIFICATION REQUIRED
                </span>
                <p className="text-xs text-zinc-500 font-mono uppercase mt-4 max-w-md mx-auto">
                  Provide your coordinates to load your interactive session and generate your personalized archetype coordinates.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-2 block">
                    Your Name or Brand Title
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subhojeet Kundu"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-2 block">
                    Phone or Contact Coordinates
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 9508931760 or mailto"
                      value={userContact}
                      onChange={(e) => setUserContact(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => playMetallicPing(soundEnabled)}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Initiate Audit Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Lead Registered - Show Active Quiz */
            <div className="space-y-6">
              
              {!resultsActive ? (
                /* Question screen */
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center mb-6 uppercase font-mono text-[10px] text-zinc-500">
                    <span>Active Candidate: {userName}</span>
                    <span className="text-amber-500 font-bold">
                      Question {currentQuestionIndex + 1} of {BRAND_QUIZ_QUESTIONS.length}
                    </span>
                  </div>

                  {/* Question Box */}
                  <h3 className="text-lg sm:text-xl font-serif text-[#FFF] font-bold tracking-tight mb-8">
                    {BRAND_QUIZ_QUESTIONS[currentQuestionIndex].text}
                  </h3>

                  {/* Options Stack */}
                  <div className="space-y-3">
                    {BRAND_QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt) => (
                      <button
                        key={opt.text}
                        onClick={() => handleAnswerSelect(opt.archetype)}
                        onMouseEnter={() => playMetallicPing(soundEnabled)}
                        className="w-full p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-amber-500/30 text-left text-xs sm:text-sm font-mono uppercase tracking-wide text-zinc-400 hover:text-[#FFF] h-full transition-all flex items-center justify-between"
                      >
                        <span className="leading-relaxed pr-3">{opt.text}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Results screen */
                <div className="space-y-6 text-center">
                  
                  <div className="inline-flex bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-mono tracking-widest text-amber-500 uppercase rounded-full mb-2">
                    <Star className="w-3.5 h-3.5 animate-spin mr-1.5" />
                    DEEP MATRIX REVEALED
                  </div>

                  <h3 className="text-[#FFF] font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-none mb-1">
                    {ARCHETYPE_DETAILS[dominantArchetype].title}
                  </h3>
                  
                  <p className="text-amber-500 font-mono text-xs uppercase tracking-widest font-black">
                    Primary Trait: {ARCHETYPE_DETAILS[dominantArchetype].trait}
                  </p>

                  <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto uppercase font-mono text-left">
                    {ARCHETYPE_DETAILS[dominantArchetype].description}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleAcquireBlueprint}
                      onMouseEnter={() => playMetallicPing(soundEnabled)}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Acquire {dominantArchetype} Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-amber-500 uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3 animate-reverse" />
                      Re-calibrate Aura Parameters
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
