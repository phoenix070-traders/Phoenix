import React, { useState, useRef, useEffect } from "react";
import { Message, CURRENCY_MAP, CurrencyCode } from "../types";
import { MessageSquareCode, Send, X, Bot, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { playSoftClick, playMetallicPing, playGoldenChime } from "../utils/audioUtils";

interface ChatbotProps {
  currentCurrency: CurrencyCode;
  soundEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ChatbotConcierge({
  currentCurrency,
  soundEnabled,
  isOpen,
  onClose,
  onOpen,
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      role: "assistant",
      text: "### Welcome to the Inner Sanctum of Phoenix & Quill Digital. 🦅\n\nI am the **PQ AI Concierge**, the digital sentinel of our empire. Chief Strategist **Subhojeet Kundu** and our elite digital artisans stand ready to elevate your brand layout.\n\nTell me, **what is the name of your brand, and what niche are you dominating?** Let us determine how we can forge your 48-hour masterpiece.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsgText = inputText;
    setInputText("");
    playSoftClick(soundEnabled);

    // Create unique ID
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userMsgText,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Map history payload
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      // Call Express custom backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyPayload }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "My digital core is reflecting. Speak of your empire's objectives.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      playGoldenChime(soundEnabled);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        text: "🚨 *A communication dropout occurred inside our digital core. Please coordinate directly with Subhojeet at +91 9508931760!*",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating sphere toggle */}
      {!isOpen && (
        <button
          onClick={() => {
            playGoldenChime(soundEnabled);
            onOpen();
          }}
          onMouseEnter={() => playMetallicPing(soundEnabled)}
          className="relative w-14 h-14 rounded-full bg-black border border-amber-500/25 flex items-center justify-center cursor-pointer group shadow-[0_8px_32px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_40px_rgba(245,158,11,0.45)] hover:scale-105 transition-all duration-300"
          id="chat-toggle"
        >
          {/* Glowing Animated Outer Pulse Spheres */}
          <span className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping opacity-75" />
          <span className="absolute inset-1 rounded-full bg-gradient-to-tr from-amber-600/20 via-[#000] to-amber-400/20 blur" />
          
          <Bot className="w-6 h-6 text-amber-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {/* Actual Chat Window Card */}
      {isOpen && (
        <div 
          className="w-[92vw] sm:w-[420px] h-[550px] bg-zinc-950/95 border border-zinc-900 rounded-2xl shadow-[0_12px_44px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden relative"
          id="chat-container"
        >
          {/* Subtle Golden Glow Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Header */}
          <div className="bg-zinc-900/60 border-b border-zinc-900/80 px-4 py-3.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-black border border-amber-500/30 flex items-center justify-center">
                <span className="absolute inset-0.5 rounded-full bg-amber-500/20 animate-pulse" />
                <Bot className="w-4.5 h-4.5 text-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-black text-[#FFF] uppercase tracking-wider">
                  PQ AI CONCIERGE
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest text-[#FFF]/40 uppercase">
                    Sentinel Online
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSoftClick(soundEnabled);
                onClose();
              }}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-zinc-950/90 flex flex-col">
            {messages.map((m) => {
              const isAssistant = m.role === "assistant";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[85%] ${
                    isAssistant ? "self-start items-start" : "self-end items-end"
                  }`}
                >
                  <span className="text-[8px] font-mono text-zinc-600 uppercase mb-1 px-1">
                    {isAssistant ? "SENTINEL" : "CANDIDATE"} •{" "}
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>

                  <div
                    className={`rounded-xl px-4 py-3 text-xs leading-relaxed uppercase font-mono text-left whitespace-pre-wrap select-text ${
                      isAssistant
                        ? "bg-zinc-900/40 border border-zinc-900 text-zinc-300"
                        : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {/* Basic Markdown check */}
                    {m.text.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("### ")) {
                        return (
                          <h5 key={pIdx} className="font-serif font-bold text-sm text-[#FFF] tracking-tight mb-2 uppercase">
                            {para.replace("### ", "")}
                          </h5>
                        );
                      }
                      
                      // Highlight bullet list lines
                      if (para.startsWith("- ")) {
                        return (
                          <ul key={pIdx} className="space-y-1 my-2">
                            {para.split("\n").map((li, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-2 text-zinc-400 text-[11px] leading-tight mb-1">
                                <span className="text-amber-500 shrink-0 select-none">•</span>
                                <span>{li.replace("- ", "").replace(/\*\*/g, "")}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      // Dynamic word highlighting (replace bold syntax with colored font)
                      const cleanPara = para.replace(/\*\*(.*?)\*\*/g, "$1");
                      return (
                        <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                          {cleanPara}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {loading && (
              <div className="self-start flex flex-col items-start max-w-[85%] select-none">
                <span className="text-[8px] font-mono text-zinc-600 uppercase mb-1 px-1">
                  SENTINEL IS CALIBRATING
                </span>
                <div className="bg-zinc-900/45 border border-zinc-900/80 rounded-xl px-4 py-3 text-xs font-mono text-zinc-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-zinc-900/80 bg-zinc-900/30 p-2.5 flex items-center gap-2 select-none"
          >
            <input
              type="text"
              disabled={loading}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask PQ Concierge..."
              className="flex-1 bg-black/80 border border-zinc-800 text-xs font-mono uppercase tracking-wide text-zinc-300 placeholder-zinc-700 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500/40"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                inputText.trim() && !loading
                  ? "bg-amber-500 text-black shadow-[0_2px_10px_rgba(245,158,11,0.2)]"
                  : "bg-zinc-900 text-zinc-700 border border-zinc-950"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer security tag */}
          <div className="bg-zinc-950 border-t border-zinc-900/40 p-2 text-center text-[7.5px] font-mono text-zinc-650 uppercase select-none flex items-center justify-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            Quantum Security Encrypted Channel // shiulikundu45@gmail.com Gaps indexer active
          </div>

        </div>
      )}

    </div>
  );
}
