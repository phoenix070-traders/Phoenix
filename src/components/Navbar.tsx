import React from "react";
import { CurrencyCode, CURRENCY_MAP } from "../types";
import { Volume2, VolumeX, Sparkles, Instagram, Linkedin, Mail, Zap, Globe, ChevronDown, Search } from "lucide-react";
import { playSoftClick, playMetallicPing, toggleAmbientCinemaHum } from "../utils/audioUtils";

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  ambientHumEnabled: boolean;
  onToggleAmbientHum: () => void;
}

export default function Navbar({
  currentCurrency,
  onCurrencyChange,
  soundEnabled,
  onToggleSound,
  ambientHumEnabled,
  onToggleAmbientHum,
}: NavbarProps) {
  const [tickerIndex, setTickerIndex] = React.useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const tickers = [
    "⚡ ONLY 2 SLOTS REMAIN FOR OUR GUARANTEED 48-HOUR EMPIRE LAUNCH THIS WEEK.",
    "🏆 RATED 4.9/5 BY OVER 87+ GLOBAL BRAND FOUNDERS.",
    "🛡️ THE PRESTIGE PROMISE: SEE FIRST, PAY LATER. ZERO COMMITTED RISK.",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const filteredCurrencies = Object.entries(CURRENCY_MAP).filter(([code, config]) => {
    const q = searchQuery.toLowerCase();
    return (
      code.toLowerCase().includes(q) ||
      config.label.toLowerCase().includes(q) ||
      config.symbol.toLowerCase().includes(q)
    );
  }) as [CurrencyCode, typeof CURRENCY_MAP[CurrencyCode]][];

  const handleCurrencySelect = (code: CurrencyCode) => {
    playSoftClick(soundEnabled);
    onCurrencyChange(code);
  };

  const handleScrollTo = (id: string) => {
    playSoftClick(soundEnabled);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-amber-500/10 transition-colors duration-300">
      {/* Dynamic Scarcity Top Banner */}
      <div className="bg-gradient-to-r from-black via-amber-950 to-black border-b border-amber-500/10 py-1.5 text-center overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-amber-400 select-none uppercase">
            <Zap className="w-3 h-3 text-amber-500 animate-pulse shrink-0" />
            <span className="transition-all duration-500 ease-in-out">
              {tickers[tickerIndex]}
            </span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Animated Golden Phoenix Logo */}
        <div 
          onClick={() => handleScrollTo("hero")} 
          onMouseEnter={() => playMetallicPing(soundEnabled)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Pulsing glow ring */}
            <div className="absolute inset-x-[-4px] inset-y-[-4px] rounded-full bg-amber-500/10 blur-md group-hover:bg-amber-500/25 group-hover:scale-110 transition-all duration-500" />
            
            <svg 
              viewBox="0 0 100 100" 
              className="w-10 h-10 transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
            >
              <defs>
                <linearGradient id="phoenix-gold-mst" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="35%" stopColor="#d97706" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
              
              {/* Back Soft Flame Arc */}
              <path 
                d="M 50 12 C 32 25, 32 48, 50 64 C 68 48, 68 25, 50 12 Z" 
                fill="url(#phoenix-gold-mst)" 
                opacity="0.12" 
                className="group-hover:opacity-20 transition-opacity"
              />
              
              {/* Head Flamboyant Crown */}
              <circle cx="50" cy="8" r="1.5" fill="#fef08a" />
              <path d="M 50 10 C 47 18, 53 18, 50 25 Z" fill="url(#phoenix-gold-mst)" />
              <path d="M 50 19 L 54 21 L 50 23 L 46 21 Z" fill="url(#phoenix-gold-mst)" />
              
              {/* Left Feather Wings (Intricate layer stacks matching gold grade) */}
              <path d="M 46 26 C 30 19, 14 26, 4 42 C 18 41, 32 37, 44 37 Z" fill="url(#phoenix-gold-mst)" opacity="0.95" />
              <path d="M 45 35 C 27 34, 12 43, 8 56 C 20 50, 32 46, 43 44 Z" fill="url(#phoenix-gold-mst)" opacity="0.8" />
              <path d="M 45 43 C 28 46, 16 57, 12 70 C 22 62, 32 55, 43 51 Z" fill="url(#phoenix-gold-mst)" opacity="0.65" />
              
              {/* Right Feather Wings */}
              <path d="M 54 26 C 70 19, 86 26, 96 42 C 82 41, 68 37, 56 37 Z" fill="url(#phoenix-gold-mst)" opacity="0.95" />
              <path d="M 55 35 C 73 34, 88 43, 92 56 C 80 50, 68 46, 57 44 Z" fill="url(#phoenix-gold-mst)" opacity="0.8" />
              <path d="M 55 43 C 72 46, 84 57, 88 70 C 78 62, 68 55, 57 51 Z" fill="url(#phoenix-gold-mst)" opacity="0.65" />
              
              {/* Center Royal Body Shield */}
              <path d="M 50 24 L 55 42 L 50 66 L 45 42 Z" fill="url(#phoenix-gold-mst)" />
              <circle cx="50" cy="35" r="2.5" fill="#000" />
              <circle cx="50" cy="35" r="1" fill="#fef08a" />
              
              {/* Twin Royal Tail Feathers */}
              <path d="M 50 66 L 42 90 L 50 78 L 58 90 Z" fill="url(#phoenix-gold-mst)" />
              <path d="M 48 68 L 34 88 L 44 77 L 46 73 Z" fill="url(#phoenix-gold-mst)" opacity="0.7" />
              <path d="M 52 68 L 66 88 L 56 77 L 54 73 Z" fill="url(#phoenix-gold-mst)" opacity="0.7" />
              
              {/* Floating sparks */}
              <circle cx="28" cy="18" r="0.8" fill="#fef08a" className="animate-ping" />
              <circle cx="72" cy="18" r="0.8" fill="#fef08a" className="animate-ping" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black tracking-widest text-[#FFF] text-sm uppercase group-hover:text-amber-400 transition-colors duration-300">
              PHOENIX &amp; QUILL
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-amber-500 uppercase font-black">
              Digital Empire Forge
            </span>
          </div>
        </div>

        {/* Anchors / Navigation */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest uppercase text-zinc-400">
          <button 
            onClick={() => handleScrollTo("seo-loss")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            SEO Losses
          </button>
          <button 
            onClick={() => handleScrollTo("pillars")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            Pillar Solutions
          </button>
          <button 
            onClick={() => handleScrollTo("pricing")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            Forge Plans
          </button>
          <button 
            onClick={() => handleScrollTo("roadmap")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            48h Roadmap
          </button>
          <button 
            onClick={() => handleScrollTo("archetype")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            Brand Quiz
          </button>
          <button 
            onClick={() => handleScrollTo("founder")} 
            className="hover:text-amber-400 cursor-pointer transition-colors"
            onMouseEnter={() => playMetallicPing(soundEnabled)}
          >
            The Vault
          </button>
        </div>

        {/* Action controls (Currency, Ambient audio, Links) */}
        <div className="flex items-center gap-3">
          {/* Searchable Global Country & Currency Selector Dropdown */}
          <div className="relative" id="country-currency-picker">
            <button
              onClick={() => {
                playSoftClick(soundEnabled);
                setIsDropdownOpen(!isDropdownOpen);
              }}
              onMouseEnter={() => playMetallicPing(soundEnabled)}
              className="px-2.5 sm:px-3 py-1.5 bg-zinc-950 border border-zinc-805 hover:border-amber-500/40 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-1.5 sm:gap-2 text-amber-400 cursor-pointer transition-all"
            >
              <span className="text-sm leading-none select-none shrink-0">
                {CURRENCY_MAP[currentCurrency].flag}
              </span>
              <span className="tracking-wider">
                {currentCurrency} ({CURRENCY_MAP[currentCurrency].symbol})
              </span>
              <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform duration-300 shrink-0 ${isDropdownOpen ? "rotate-180 text-amber-400" : ""}`} />
            </button>

            {isDropdownOpen && (
              <>
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 z-40 bg-black/5" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                {/* Dropdown Container */}
                <div className="absolute right-0 mt-2.5 w-64 sm:w-72 bg-zinc-950 border border-zinc-900 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.92)] z-50 flex flex-col overflow-hidden backdrop-blur-xl animate-fade-in max-h-[360px]">
                  {/* Luxury accent crown line */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                  
                  {/* Search box panel */}
                  <div className="p-2.5 bg-zinc-900/40 border-b border-zinc-900">
                    <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-widest text-[#FFF]/40 uppercase mb-1.5">
                      <Globe className="w-3 h-3 text-amber-500" />
                      GLOBAL FORGE MARKETS ({Object.keys(CURRENCY_MAP).length} COUNTRIES)
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-650" />
                      <input
                        type="text"
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Country / Currency..."
                        className="w-full pl-8 pr-3 py-1.5 bg-black border border-zinc-800 focus:border-amber-500/40 focus:outline-none rounded-md text-[10px] font-mono uppercase text-zinc-300 placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  {/* List items */}
                  <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar min-h-0">
                    {filteredCurrencies.length > 0 ? (
                      filteredCurrencies.map(([code, config]) => {
                        const isSelected = currentCurrency === code;
                        return (
                          <button
                            key={code}
                            type="button"
                            onClick={() => {
                              handleCurrencySelect(code);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full px-2 py-2 rounded-md flex items-center justify-between text-left transition-all ${
                              isSelected
                                ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-base leading-none select-none shrink-0">
                                {config.flag}
                              </span>
                              <div className="truncate shrink leading-tight">
                                <p className="text-[10px] font-mono font-bold uppercase truncate text-zinc-200">
                                  {config.label}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right shrink-0 ml-1">
                              <span className="text-[9px] font-mono font-black text-amber-500 group-hover:text-amber-400">
                                {config.symbol} {code}
                              </span>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-[10px] font-mono text-zinc-600 uppercase">
                        No matchmaking regions found.
                      </div>
                    )}
                  </div>
                  
                  {/* Dropdown footer info */}
                  <div className="p-1.5 bg-black border-t border-zinc-900 text-center text-[7.5px] font-mono text-zinc-500 uppercase leading-none">
                    🔒 Real-Time 2026 Fiscal Exchange Registry
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sound Effect Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-zinc-950/80 text-zinc-600 border-zinc-800"
            }`}
            title={soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Ambient Cinema Audio Toggle */}
          <button
            onClick={onToggleAmbientHum}
            className={`p-2 rounded-lg border transition-all ${
              ambientHumEnabled
                ? "bg-amber-500/20 text-amber-300 border-amber-400/40 animate-pulse"
                : "bg-zinc-950/80 text-zinc-600 border-zinc-800"
            }`}
            title={ambientHumEnabled ? "Mute Acoustic Atmospheric Hum" : "Unmute Acoustic Atmospheric Hum"}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
