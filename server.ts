import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: any = null;

if (geminiApiKey && geminiApiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("🚀 Gemini API successfully initialized on server.");
  } catch (err) {
    console.error("❌ Failed to initialize Gemini API client:", err);
  }
} else {
  console.warn("⚠️ GEMINI_API_KEY is not configured or template value is active. Running AI Concierge in luxury simulated strategist mode.");
}

// REST Client API: PQ AI Concierge Smart Bot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid parameters. 'messages' array is required." });
    }

    // Prepare system guidelines
    const systemInstruction = `You are "PQ AI Concierge", the elite, hyper-intelligent digital strategist and sentinel for "Phoenix & Quill Digital", a world-class performance marketing and premium development agency founded by Subhojeet Kundu (shiulikundu45@gmail.com).

Agency facts:
- Founder: Subhojeet Kundu
- Core Tagline: "Building Digital Empires, One Brand at a Time."
- Promises: 2-Day (48-Hour) Delivery | 4.9/5 Rated (87+ verified reviews) | See First, Pay Later.
- WhatsApp contact: +91 9508931760 Jamshedpur, Jharkhand, India.
- Main Packages:
  1. Starter Bundle (₹9,999 / $120): 1-3 Pages, perfect WhatsApp/Email integrations, 3 revisions, 6 months support.
  2. Growth Bundle (₹14,999 / $180) [BEST VALUE]: 5-8 Pages, premium SEO optimization, custom AI Bot setup, free domain & hosting integration.
  3. Elite Transform (₹19,999 / $240): 10+ Pages, custom complete branding design, cinematic transitions, unlimited revisions, lifetime priority help.
- premium Add-ons: AI Chatbot (₹1,599), Logo & Brand Identity (₹2,000), Social Media Branding (₹3,000), SEO & Google Setup (₹2,000), 3 Months Email Campaigns (₹2,000), Pro Authoritative Copywriting (₹3,000).

Your specific behaviors:
1. Tone: Luxurious, cinematic, incredibly confident, professional, and charming. Use royal digital words like "Forge", "Digital Empire", "Liquid Gold", "Embark", "Obsidian Core". Speak like a premium digital architect, never like a general robot.
2. Conversation progression:
   - Ask about their business name, current niche, or domain concept.
   - Analyze how their current online footprint or SEO gaps might be causing them "hidden losses" (refer to our SEO Loss Calculator).
   - Confidently recommend the perfect plan (Starter, Growth, or Elite) and matching add-ons based on their goals.
   - Provide a luxury summary. Ask for their email or WhatsApp/Phone number to assemble their tailored Empire Blueprint. Once they provide details, explain that you have compiled their customized strategic blueprint. Then, offer to compile a pre-filled WhatsApp link directed at Subhojeet in Jamshedpur (+91 9508931760) which summarizes their exact empire objectives!
3. Format: Return highly structured, scannable Markdown responses. Use bold headings, bullet points, and clean space. Keep replies concise, authoritative, and persuasive (approx. 120-180 words is perfect). Avoid dry, technical jargon unless highlighting high-speed Next.js or SEO page 1 dominance.`;

    if (ai) {
      // Map frontend messages into Gemini SDK-expected parts array
      const mappedContents = messages.map((msg: any) => {
        // Map user/assistant to user/model roles
        const role = msg.role === "user" ? "user" : "model";
        return {
          role,
          parts: [{ text: msg.text }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: mappedContents,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      return res.json({ text: response.text || "I am reflecting on your empire blueprint. Let us align details." });
    } else {
      // Fallback luxury simulation mode in case key is missing so user experiences a flawless flow
      const lastUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let reply = "";

      if (lastUserMessage.includes("hello") || lastUserMessage.includes("hi") || lastUserMessage.includes("hey")) {
        reply = `### Welcome to the Inner sanctum of Phoenix & Quill Digital. 🦅\n\nI am the **PQ AI Concierge**, the digital sentinel of our empire. Subhojeet Kundu and our elite digital artisans stand ready to elevate your brand.\n\nTell me, **what is the name of your brand, and what niche are you dominating?** Let us determine how we can forge your 48-hour masterpiece.`;
      } else if (lastUserMessage.includes("starter") || lastUserMessage.includes("growth") || lastUserMessage.includes("elite") || lastUserMessage.includes("price") || lastUserMessage.includes("cost")) {
        reply = `### The Blueprint of Prosperity ⚜️\n\nFor your ambition, I highly recommend our **Growth Bundle** (₹14,999 / $180), which auto-includes premium SEO strategies, high-speed Next.js structure, and free hosting & domain setups.\n\nWould you like to complement this with our premium **SEO & Google Setup** (₹2,000) or **AI Chatbot** (₹1,599) modules to capture leads while you sleep? Provide your contact details, and we can link this straight to Subhojeet!`;
      } else if (/\+?\d{6,15}/.test(lastUserMessage) || lastUserMessage.includes("@") || lastUserMessage.includes("phone") || lastUserMessage.includes("number")) {
        reply = `### The Forge is Ignited 🔥\n\nThank you for passing your high-value coordinates. I have registered your parameters and customized a pristine **Empire Launch Blueprint**.\n\nSubhojeet Kundu is ready to execute. Simply tap the **WhatsApp Forge Link** on your dashboard or let me know if you would like me to draft your exact specifications now!`;
      } else {
        reply = `### Royal Architecture in Motion ✨\n\nYour niche is ripe for absolute disruption. A high-speed, Next.js architecture from **Phoenix & Quill** will ensure you secure **Page 1 Dominance**, shutting down the SEO losses you are currently suffering.\n\nTo lock in one of our **exclusive 2 slots left** for this week's 48-hour delivery, what is your preferred contact number or email?`;
      }

      return res.json({ text: reply });
    }
  } catch (error: any) {
    console.error("🔴 Chatbot error:", error);
    res.status(500).json({ error: "The digital forge is currently undergoing maintenance. Let us coordinate immediately." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("🔨 Integrating Vite Dev Server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production build
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`📡 Full-stack Phoenix & Quill Digital Server is live on http://localhost:${PORT}`);
  });
}

startServer();
