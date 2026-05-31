import React, { useState } from "react";
import { Search, BookOpen, Share2, Code2, Check, ArrowRight } from "lucide-react";
import { playSoftClick, playMetallicPing } from "../utils/audioUtils";

interface PillarProps {
  soundEnabled: boolean;
  onSelectService: (serviceName: string) => void;
}

export default function PillarServices({ soundEnabled, onSelectService }: PillarProps) {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 1,
      title: "Page-1 SEO Strategy",
      subtitle: "Secure Absolute Search Dominance",
      icon: Search,
      metrics: "Average 140% organic lead boost in 60 days",
      bullets: [
        "Rigorous technical crawl audits & speed optimization schema",
        "Strategic competitor content gap mapping",
        "High-intent keyword matrix capture",
        "Search Console index locks, preventing crawler index dropouts",
      ],
      pricingHint: "Included in Growth & Elite bundles",
    },
    {
      id: 2,
      title: "Content Marketing",
      subtitle: "High-Authority Storytelling assets",
      icon: BookOpen,
      metrics: "Engineered to convert clicks into high-value clients",
      bullets: [
        "Thought leadership articles with deep market authority",
        "Tailored monthly newsletter campaigns",
        "High-conversion editorial landing copy",
        "Bespoke brand story blueprints for founder positioning",
      ],
      pricingHint: "Available via content writing add-ons",
    },
    {
      id: 3,
      title: "Social Media Management",
      subtitle: "Scroll-Stopping Paid & Organic Channels",
      icon: Share2,
      metrics: "Community building with 4.9/5 brand prestige",
      bullets: [
        "Bespoke design kits for Instagram & LinkedIn layout feeds",
        "High-ROI lead generation ad layout coordinates",
        "Interactive story scripts & brand narrative assets",
        "Real-time social listening & engagement protocols",
      ],
      pricingHint: "Available via social branding add-on sets",
    },
    {
      id: 4,
      title: "Web Architecture",
      subtitle: "Blazing Fast Next.js & React Apps",
      icon: Code2,
      metrics: "Average 99+ Core Web Vitals score verified",
      bullets: [
        "Modern custom code using Next.js and pure Tailwind CSS",
        "Fluid vector graphics, 3D CSS structures & instant routing",
        "Complete responsive touch target alignment (44px mobile scale)",
        "Zero backend bloat; clean clean SEO indexing ready",
      ],
      pricingHint: "Starts at only ₹9,999 ($120)",
    },
  ];

  const handlePillarClick = (idx: number, title: string) => {
    playSoftClick(soundEnabled);
    setActivePillar(idx);
    onSelectService(title);
  };

  return (
    <section id="pillars" className="py-24 bg-black relative select-none">
      {/* Background radial overlays */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-zinc-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(245,158,11,0.03)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-amber-500 uppercase mb-4">
            THE 4-PILLAR DEFENSE
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            Master-Grade <span className="text-amber-400 italic">Pillar Services</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Painstakingly designed modules configured to secure market dominance.
          </p>
        </div>

        {/* Pillar Showcase grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Vertical Selection Menu */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePillarClick(idx, p.title)}
                  onMouseEnter={() => playMetallicPing(soundEnabled)}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-amber-500/10 border-amber-500/40 text-[#FFF] shadow-[0_4px_20px_rgba(245,158,11,0.06)]"
                      : "bg-zinc-950/85 border-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg border transition-colors ${
                      isActive ? "bg-amber-500 text-black border-amber-500" : "bg-zinc-900 text-zinc-500 border-zinc-800"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-black">
                        Pillar 0{p.id}
                      </div>
                      <div className={`text-sm sm:text-base font-serif font-bold ${
                        isActive ? "text-amber-400" : "text-[#FFF]"
                      }`}>
                        {p.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed visual specifications panel */}
          <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl pointer-events-none" />

            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-amber-500 uppercase font-black mb-1">
                SOLUTIONS PORTAL // PILLAR 0{pillars[activePillar].id}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FFF] font-bold tracking-tight mb-2">
                {pillars[activePillar].title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono uppercase tracking-wider mb-6">
                ~ {pillars[activePillar].subtitle}
              </p>

              {/* Bold metrics */}
              <div className="border bg-zinc-900/40 border-zinc-900 rounded-xl px-4 py-3 mb-6 flex items-center justify-between text-[11px] font-mono text-amber-500 tracking-wider">
                <span className="uppercase">VALIDATED CORE IMPACT:</span>
                <span className="font-extrabold text-[#FFF] shrink-0 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  {pillars[activePillar].metrics}
                </span>
              </div>

              {/* Core capabilities list */}
              <ul className="space-y-3.5 mb-8">
                {pillars[activePillar].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-300 leading-normal">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price hint coordinate info */}
            <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[10px] font-mono tracking-widest text-[#FFF] uppercase bg-zinc-900 px-3 py-1.5 rounded">
                ⚙️ {pillars[activePillar].pricingHint}
              </span>
              <button
                onClick={() => {
                  playSoftClick(soundEnabled);
                  onSelectService(pillars[activePillar].title);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 group cursor-pointer"
              >
                <span>Harness this pillar</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform text-amber-500" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
