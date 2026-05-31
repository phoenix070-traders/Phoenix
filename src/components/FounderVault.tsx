import React from "react";
import { Sparkles, Phone, Mail, Instagram, Linkedin, Trophy, ShieldCheck, Target, Award } from "lucide-react";
import { playSoftClick, playMetallicPing } from "../utils/audioUtils";

interface VaultProps {
  soundEnabled: boolean;
}

export default function FounderVault({ soundEnabled }: VaultProps) {
  const contacts = [
    {
      name: "Official WhatsApp",
      icon: Phone,
      val: "+91 9508931760",
      link: "https://wa.me/919508931760?text=Hi%20Subhojeet!%20%F0%9F%A6%85%20I%20have%20visited%20your%20Titan%20Edition%20Master%20Vault.%20Let's%20forge%20my%20empire!",
      color: "hover:text-amber-400 border-amber-500/10 hover:border-amber-500/40",
    },
    {
      name: "Founder Instagram",
      icon: Instagram,
      val: "@subhojeettt.______",
      link: "https://www.instagram.com/subhojeettt.______",
      color: "hover:text-amber-400 border-amber-500/10 hover:border-amber-500/40",
    },
    {
      name: "Founder LinkedIn",
      icon: Linkedin,
      val: "Subhojeet Kundu Profile",
      link: "https://www.linkedin.com/in/subhojeet-kundu-pq", // Custom pristine profile placeholder
      color: "hover:text-amber-400 border-amber-500/10 hover:border-amber-500/40",
    },
    {
      name: "Corporate Email",
      icon: Mail,
      val: "shiulikundu45@gmail.com",
      link: "mailto:shiulikundu45@gmail.com?subject=Empire%20Forge%20Request%20-%20Phoenix%20and%20Quill",
      color: "hover:text-amber-400 border-amber-500/10 hover:border-amber-500/40",
    },
  ];

  const stats = [
    { label: "Elite Client Base", value: "500+", desc: "Verified Global Brands", icon: Trophy },
    { label: "Aesthetic Rating", value: "4.9/5", desc: "87+ Handcrafted Reviews", icon: Award },
    { label: "Operational Tenure", value: "2+ Yrs", desc: "Forging Web Supremacy", icon: Target },
    { label: "Success Rate", value: "100%", desc: "Immediate 2-Day Release", icon: ShieldCheck },
  ];

  const handleLinkClick = () => {
    playSoftClick(soundEnabled);
  };

  return (
    <section id="founder" className="py-24 bg-black relative select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(245,158,11,0.03)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-400 uppercase mb-4 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            THE EXECUTIVE COMMAND CENTER
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFF] tracking-tight mb-4">
            The Founder’s <span className="text-amber-400 italic">Prestige Vault</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Behind every digital empire stands a master craftsman. Align directly with Subhojeet.
          </p>
        </div>

        {/* Master Bento Card */}
        <div className="max-w-4xl mx-auto bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-500/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Founder Holographic Card with Glassmorphism elevation */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div 
                className="relative w-44 h-44 rounded-2xl p-1 bg-gradient-to-tr from-amber-600/30 to-amber-450/40 hover:from-amber-500/45 hover:to-amber-300 shadow-[0_8px_32px_rgba(245,158,11,0.15)] transition-all duration-500 group"
                onMouseEnter={() => playMetallicPing(soundEnabled)}
              >
                {/* Simulated Glass screen reflection vector */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-[#FFF]/5 rounded-t-xl skew-y-6 transform origin-top-left pointer-events-none z-20 group-hover:skew-y-3 transition-transform" />
                
                {/* Photo space: elegant high-contrast vector crown placeholder inside black gold core */}
                <div className="w-full h-full bg-black rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden z-10">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-16 h-16 text-amber-500/85 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500"
                    fill="currentColor"
                  >
                    {/* Crown detailing prestige craftsmanship */}
                    <path d="M 20 80 Q 50 65 80 80 L 75 40 L 60 55 L 50 25 L 40 55 L 25 40 Z" />
                    <circle cx="50" cy="18" r="4" fill="currentColor" />
                  </svg>
                  <p className="text-[10px] font-mono tracking-widest text-[#FFF] uppercase mt-4 text-center">
                    SUBHOJEET KUNDU
                  </p>
                  <span className="text-[8px] font-mono tracking-widest text-amber-500 uppercase mt-0.5 font-black">
                    Chief Architect
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-zinc-400 text-xs font-mono tracking-wide mt-6 uppercase text-center max-w-[200px] leading-relaxed">
                "Building Digital Empires, <span className="text-amber-400 font-extrabold">One Brand</span> at a Time."
              </p>
            </div>

            {/* Right: Certified values and quick coordinates */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Grid values */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex gap-3 items-start select-none">
                      <div className="p-2 rounded bg-amber-500/5 border border-amber-500/10 text-amber-500 mt-0.5 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">
                          {s.label}
                        </div>
                        <div className="text-lg font-mono font-black text-amber-400 leading-none mb-1">
                          {s.value}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 lowercase leading-none">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connections list */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-black block mb-3">
                  DIRECT ESCALATION SECRETS // OPEN PATHWAYS:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contacts.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.name}
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleLinkClick}
                        onMouseEnter={() => playMetallicPing(soundEnabled)}
                        className={`p-3.5 rounded-xl border bg-zinc-950 hover:bg-zinc-900 text-zinc-400 group transition-all duration-300 flex items-center gap-3 ${c.color}`}
                      >
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-amber-500 group-hover:border-amber-500/20 shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                            {c.name}
                          </span>
                          <span className="text-[11px] font-mono font-black text-[#FFF] tracking-tight group-hover:text-amber-400 truncate block">
                            {c.val}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
