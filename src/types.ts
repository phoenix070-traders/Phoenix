export type CurrencyCode = 
  | "INR" | "USD" | "AED" | "GBP" | "EUR" | "CAD" | "AUD" | "SGD" | "JPY" | "CHF" 
  | "HKD" | "SAR" | "QAR" | "OMR" | "BHD" | "KWD" | "MYR" | "THB" | "NZD" | "ZAR" 
  | "BRL" | "MXN" | "IDR" | "PHP" | "VND" | "TRY" | "SEK" | "NOK" | "DKK" | "PLN" 
  | "KRW" | "CNY";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier from base currency (INR)
  label: string;
  flag: string; // Emoji representing the country/region
}

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", rate: 1, label: "India (INR)", flag: "🇮🇳" },
  USD: { code: "USD", symbol: "$", rate: 0.012, label: "United States (USD)", flag: "🇺🇸" },
  AED: { code: "AED", symbol: "د.إ", rate: 0.044, label: "United Arab Emirates (AED)", flag: "🇦🇪" },
  GBP: { code: "GBP", symbol: "£", rate: 0.0094, label: "United Kingdom (GBP)", flag: "🇬🇧" },
  EUR: { code: "EUR", symbol: "€", rate: 0.011, label: "European Union (EUR)", flag: "🇪🇺" },
  CAD: { code: "CAD", symbol: "C$", rate: 0.016, label: "Canada (CAD)", flag: "🇨🇦" },
  AUD: { code: "AUD", symbol: "A$", rate: 0.018, label: "Australia (AUD)", flag: "🇦🇺" },
  SGD: { code: "SGD", symbol: "S$", rate: 0.016, label: "Singapore (SGD)", flag: "🇸🇬" },
  JPY: { code: "JPY", symbol: "¥", rate: 1.88, label: "Japan (JPY)", flag: "🇯🇵" },
  CHF: { code: "CHF", symbol: "CHF", rate: 0.011, label: "Switzerland (CHF)", flag: "🇨🇭" },
  HKD: { code: "HKD", symbol: "HK$", rate: 0.094, label: "Hong Kong (HKD)", flag: "🇭🇰" },
  SAR: { code: "SAR", symbol: "SR", rate: 0.045, label: "Saudi Arabia (SAR)", flag: "🇸🇦" },
  QAR: { code: "QAR", symbol: "QR", rate: 0.044, label: "Qatar (QAR)", flag: "🇶🇦" },
  OMR: { code: "OMR", symbol: "RO", rate: 0.0046, label: "Oman (OMR)", flag: "🇴🇲" },
  BHD: { code: "BHD", symbol: "BD", rate: 0.0045, label: "Bahrain (BHD)", flag: "🇧🇭" },
  KWD: { code: "KWD", symbol: "KD", rate: 0.0037, label: "Kuwait (KWD)", flag: "🇰🇼" },
  MYR: { code: "MYR", symbol: "RM", rate: 0.057, label: "Malaysia (MYR)", flag: "🇲🇾" },
  THB: { code: "THB", symbol: "฿", rate: 0.44, label: "Thailand (THB)", flag: "🇹🇭" },
  NZD: { code: "NZD", symbol: "NZ$", rate: 0.020, label: "New Zealand (NZD)", flag: "🇳🇿" },
  ZAR: { code: "ZAR", symbol: "R", rate: 0.22, label: "South Africa (ZAR)", flag: "🇿🇦" },
  BRL: { code: "BRL", symbol: "R$", rate: 0.062, label: "Brazil (BRL)", flag: "🇧🇷" },
  MXN: { code: "MXN", symbol: "Mex$", rate: 0.20, label: "Mexico (MXN)", flag: "🇲🇽" },
  IDR: { code: "IDR", symbol: "Rp", rate: 195.0, label: "Indonesia (IDR)", flag: "🇮🇩" },
  PHP: { code: "PHP", symbol: "₱", rate: 0.70, label: "Philippines (PHP)", flag: "🇵🇭" },
  VND: { code: "VND", symbol: "₫", rate: 305.0, label: "Vietnam (VND)", flag: "🇻🇳" },
  TRY: { code: "TRY", symbol: "₺", rate: 0.39, label: "Turkey (TRY)", flag: "🇹🇷" },
  SEK: { code: "SEK", symbol: "kr", rate: 0.13, label: "Sweden (SEK)", flag: "🇸🇪" },
  NOK: { code: "NOK", symbol: "kr", rate: 0.13, label: "Norway (NOK)", flag: "🇳🇴" },
  DKK: { code: "DKK", symbol: "kr", rate: 0.082, label: "Denmark (DKK)", flag: "🇩🇰" },
  PLN: { code: "PLN", symbol: "zł", rate: 0.047, label: "Poland (PLN)", flag: "🇵🇱" },
  KRW: { code: "KRW", symbol: "₩", rate: 16.5, label: "South Korea (KRW)", flag: "🇰🇷" },
  CNY: { code: "CNY", symbol: "¥", rate: 0.087, label: "China (CNY)", flag: "🇨🇳" },
};

export interface PricingPlan {
  id: string;
  name: string;
  basePriceINR: number;
  badge?: string;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Bundle",
    basePriceINR: 9999,
    features: [
      "1-3 Pages Tailored Architecture",
      "Perfect WhatsApp & Gmail Lead Integrations",
      "3 Comprehensive Revisions",
      "6 Months Support & Setup Guard",
      "Speed Optimized Core Structures",
    ],
  },
  {
    id: "growth",
    name: "Growth Bundle",
    basePriceINR: 14999,
    badge: "Best Value",
    features: [
      "5-8 Pages Dynamic Architecture",
      "Free Domain & Cloud Hosting Setup",
      "Integrated Smart AI Concierge Bot",
      "Page-1 Ready Professional SEO Tuning",
      "Custom Graphic Accents",
      "Unlimited Operational Consults",
    ],
  },
  {
    id: "elite",
    name: "Elite Transform",
    basePriceINR: 19999,
    features: [
      "10+ Pages Custom High-End Architecture",
      "Complete Brand Visual Strategy & Assets",
      "Cinematic Motion & Fluid Soundscapes",
      "Unlimited Revision Cycles till Launch",
      "Lifetime Priority Strategic Support",
      "Professional Copywriting & Brand Storytelling",
    ],
  },
];

export interface AddOnItem {
  id: string;
  name: string;
  basePriceINR: number;
  description: string;
}

export const PREMIUM_ADD_ONS: AddOnItem[] = [
  { id: "ai_bot", name: "AI Chatbot 24/7 Integration", basePriceINR: 1599, description: "Capture prospective leads & questions around the clock." },
  { id: "logo", name: "Premium Logo & Brand Identity", basePriceINR: 2000, description: "Deluxe visual styling, corporate themes, and assets." },
  { id: "social", name: "Social Media Branding Kit", basePriceINR: 3000, description: "Aesthetic cover art, templates, and highlight themes." },
  { id: "seo", name: "SEO & Google console Setup", basePriceINR: 2000, description: "Complete indexing, Google Maps link, and page tracking." },
  { id: "email", name: "3 Months email Marketing Strategy", basePriceINR: 2000, description: "Designed sales funnels & high-conversion copy sequences." },
  { id: "writing", name: "Pro copywriting & Column Assets", basePriceINR: 3000, description: "Persuasive elite brand messages written by copy masters." },
];

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface BrandQuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    archetype: string; // "Sovereign" | "Outlaw" | "Explorer" | "Visionary" | "Creator"
  }[];
}

export const BRAND_QUIZ_QUESTIONS: BrandQuizQuestion[] = [
  {
    id: 1,
    text: "How do you want your clients to feel when they first visit your website?",
    options: [
      { text: "Empowered, secure, and holding a symbol of absolute prestige.", archetype: "Sovereign" },
      { text: "Liberated, bold, and ready to disrupt standard industry rules.", archetype: "Outlaw" },
      { text: "Curious, inspired, and embarking on a global discovery voyage.", archetype: "Explorer" },
      { text: "Awestruck, forward-looking, and connecting with the future.", archetype: "Visionary" },
      { text: "Inspired to craft, mold, and customize their bespoke lifestyle.", archetype: "Creator" },
    ],
  },
  {
    id: 2,
    text: "What is your main strategy to beat the intense commercial competition?",
    options: [
      { text: "Establish an unshakeable, elite legacy with undeniable quality.", archetype: "Sovereign" },
      { text: "Rewrite the game, break conventions, and move incredibly fast.", archetype: "Outlaw" },
      { text: "Pioneer new frontiers and discover completely untapped blue oceans.", archetype: "Explorer" },
      { text: "Leverage advanced AI automation and high-speed tech solutions.", archetype: "Visionary" },
      { text: "Deliver stunning, handcrafted designs that are unique masterpieces.", archetype: "Creator" },
    ],
  },
  {
    id: 3,
    text: "Choose the word-pair that best summarizes your master brand aesthetic:",
    options: [
      { text: "Minimal Obsidian & Polished Liquid Gold.", archetype: "Sovereign" },
      { text: "Raw Brutalist & Glowing Electric Crimson.", archetype: "Outlaw" },
      { text: "Organic, Clean Sandstone & Sage Green.", archetype: "Explorer" },
      { text: "Hyper-minimal & Radiant Electric Cyan.", archetype: "Visionary" },
      { text: "Intimate, Warm Craft Textured Charcoal.", archetype: "Creator" },
    ],
  },
];

export interface ArchetypeResult {
  title: string;
  description: string;
  trait: string;
  color: string;
}

export const ARCHETYPE_DETAILS: Record<string, ArchetypeResult> = {
  Sovereign: {
    title: "The Sovereign Profile",
    trait: "Prestige, Legacy, and Unmatched Quality Control.",
    description: "Your brand is a digital empire. You demand high-contrast liquid golds, breathtaking layouts, and custom prestige interfaces. The Sovereign commands the top of the market by offering deep security and supreme luxury.",
    color: "from-amber-600 to-amber-400",
  },
  Outlaw: {
    title: "The Outlaw Profile",
    trait: "Disruption, Ultimate Freedom, and Bold Standpoints.",
    description: "You don't play by ordinary rules. Your brand is designed to rattle competitors and start revolutions. The Outlaw uses hyper-fast Next.js architecture and scroll-stopping visuals to disrupt the status quo.",
    color: "from-red-600 to-red-400",
  },
  Explorer: {
    title: "The Explorer Profile",
    trait: "Discovery, Freedom, and Continuous Innovation.",
    description: "Your brand is meant to go where others fear to step. You value clean global reach, modular sections, and dynamic interactive elements that invite clients to dig deeper into your digital ecosystem.",
    color: "from-emerald-600 to-emerald-400",
  },
  Visionary: {
    title: "The Visionary Profile",
    trait: "Intuition, Future-Proof tech, and Global Transformation.",
    description: "You see where the world is going and build solutions for 2030, today. Your brand calls for integrated smart AI systems, blazing speeds, and futuristic 3D geometry accents that feel high-tech.",
    color: "from-indigo-600 to-amber-500",
  },
  Creator: {
    title: "The Creator Profile",
    trait: "Self-expression, Imagination, and Artisanal Craft.",
    description: "You give structure to beautiful ideas. Your brand is a masterclass in custom details, tailored storytelling, and precision visual accents. Every component is designed with painstaking intention.",
    color: "from-yellow-500 to-orange-400",
  },
};
