import React from "react";
import { Sparkles, Calendar, Zap, LayoutGrid, Rocket, Compass } from "lucide-react";
import { playSoftClick, playMetallicPing } from "../utils/audioUtils";

interface RoadmapProps {
  soundEnabled: boolean;
}

export default function Roadmap({ soundEnabled }: RoadmapProps) {
  const steps = [
    {
      hours: "Hours 0 - 4",
      title: "Strategic Audit & Blueprinting",
      subtitle: "Securing the Foundations",
      icon: Compass,
      desc: "Subhojeet triggers a comprehensive organic footprint scan. We analyze search gap deficits, crawl errors on your contemporary domains, and design the customized user experience blueprint.",
      badge: "Discovery State",
    },
    {
      hours: "Hours 4 - 24",
      title: "Core Architecture & Coding",
      subtitle: "High-Speed Forge",
      icon: LayoutGrid,
      desc: "Our code artisans construct a custom, high-performance Next.js shell styled with premium Obsidian & Gold, meeting standard strict 44px responsive touch targets on mobile viewports.",
      badge: "Development Active",
    },
    {
      hours: "Hours 24 - 40",
      title: "SEO Infusion & Optimization",
      subtitle: "Page 1 Calibration",
      icon: Zap,
      desc: "We embed professional structured schema grids, register technical XML sitemaps inside Search Console, calibrate meta tags with high-intent keywords, and dial core page speed performance to 99+.",
      badge: "Optimization Phase",
    },
    {
      hours: "Hour 48",
      title: "EMPIRE LAUNCH",
      subtitle: "Domain Ascension",
      icon: Rocket,
      desc: "Your live platform is officially unleashed onto the global web domain. You review the functional speeds, check search response paths, and celebrate the birth of your online digital empire.",
      badge: "Launch Triumph",
    },
  ];

  return (
    <section id="roadmap" className="py-24 bg-black relative select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-500 uppercase mb-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            CHRONOMETRIC PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            The 48-Hour <span className="text-amber-400 italic">Ascension Roadmap</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Painstakingly mapped from initial blueprint to live domain launch. No delays.
          </p>
        </div>

        {/* Timeline Map Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch relative">
          
          {/* Timeline background track line */}
          <div className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-zinc-900 via-amber-500/20 to-zinc-900 pointer-events-none" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onMouseEnter={() => playMetallicPing(soundEnabled)}
                className="bg-zinc-950/70 border border-zinc-900 hover:border-amber-500/30 rounded-2xl p-5 hover:translate-y-[-4px] transition-all duration-300 relative flex flex-col justify-between group"
              >
                {/* Visual marker inside timeline */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="text-[10px] font-mono font-black text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full uppercase leading-none">
                    {s.hours}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">
                    0{idx + 1}
                  </span>
                </div>

                {/* Spherical glowing central anchor */}
                <div className="relative w-12 h-12 rounded-full border border-zinc-800 bg-black flex items-center justify-center text-zinc-500 group-hover:text-amber-400 group-hover:border-amber-500/40 shadow-inner mb-6 transition-colors duration-500">
                  <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors opacity-40 blur-sm" />
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 whitespace-normal">
                  <h3 className="text-sm sm:text-base font-serif font-black text-[#FFF] tracking-tight mb-1">
                    {s.title}
                  </h3>
                  <p className="text-[9px] font-mono text-amber-500 uppercase tracking-widest mb-4">
                    {s.subtitle}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono uppercase text-left">
                    {s.desc}
                  </p>
                </div>

                <div className="border-t border-zinc-900 mt-5 pt-3 flex justify-between items-center">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-500">
                    Phase Guard
                  </span>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">
                    {s.badge}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
