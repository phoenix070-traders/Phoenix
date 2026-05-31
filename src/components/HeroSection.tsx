import React, { useRef, useEffect, useState } from "react";
import { Sparkles, MessageCircle, ArrowDown, MapPin } from "lucide-react";
import { playMetallicPing, playSoftClick } from "../utils/audioUtils";

interface HeroSectionProps {
  soundEnabled: boolean;
  onOpenChat: () => void;
  onExplorePlans: () => void;
}

export default function HeroSection({ soundEnabled, onOpenChat, onExplorePlans }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Custom interactive destination list for region customization
  const locations = [
    { name: "Jamshedpur", text: "Jamshedpur's Industrial digital Frontier" },
    { name: "Mumbai", text: "Mumbai's high-speed commercial Frontier" },
    { name: "Dubai", text: "Dubai's luxurious Innovation Frontier" },
    { name: "London", text: "London's Elite digital markets" },
    { name: "New York", text: "Manhattan's high-scale digital Frontier" },
    { name: "Singapore", text: "Singapore's rapid digital tech Hub" },
  ];
  
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [hoveringCore, setHoveringCore] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Fullscreen subtle premium starfield parallax effect
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    // Track mouse offset for parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface Star {
      x: number;
      y: number;
      size: number;
      depth: number;
      alpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
    }

    const stars: Star[] = [];
    const starCount = 130;

    const colors = [
      "rgba(245, 158, 11, alpha)", // Amber
      "rgba(255, 255, 255, alpha)", // Clear White
      "rgba(253, 230, 138, alpha)", // Champagne Gold/Yellow
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        depth: Math.random() * 0.9 + 0.1, // Depth
        alpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach((star) => {
        // Star Twinkle state modulation
        star.phase += star.twinkleSpeed;
        const currentAlpha = star.alpha * (0.35 + Math.sin(star.phase) * 0.4);

        // Compute coordinate displacement based on mouse offset from center, scaled by depth for parallax
        const offsetX = (mouseX - centerX) * star.depth * 0.045;
        const offsetY = (mouseY - centerY) * star.depth * 0.045;

        let renderX = star.x - offsetX;
        let renderY = star.y - offsetY;

        // Wrap stars around boundaries seamlessly
        if (renderX < 0) {
          renderX = (renderX % width) + width;
        } else if (renderX > width) {
          renderX = renderX % width;
        }

        if (renderY < 0) {
          renderY = (renderY % height) + height;
        } else if (renderY > height) {
          renderY = renderY % height;
        }

        ctx.fillStyle = star.color.replace("alpha", currentAlpha.toFixed(3));
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);

        // Glow highlighting for premium stars
        if (star.size > 1.2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(245, 158, 11, 0.45)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  // Canvas interactive geometry (Phoenix Core particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = 450);
    let height = (canvas.height = 450);

    // Coordinate resize
    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    interface Node {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      radius: number;
      angle: number;
      speed: number;
    }

    // Spawn concentric geometric layers to construct the "Phoenix Core"
    const nodes: Node[] = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const ring = idxToRing(i);
      const radius = ring * 35 + 20;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      
      nodes.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1.5,
        angle,
        speed: (0.01 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    function idxToRing(idx: number): number {
      if (idx < 6) return 1;
      if (idx < 15) return 2;
      return 3;
    }

    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;

    // Track relative coordinates in boundaries
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      // Magnetic pull coordinates
      targetX = relativeX;
      targetY = relativeY;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    // Frame loops draw premium glass geometry connections
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth coordinate decay for fluid magnetic glide
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Draw golden dust halo
      const radialGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, width / 2
      );
      radialGrad.addColorStop(0, "rgba(245, 158, 11, 0.06)");
      radialGrad.addColorStop(0.5, "rgba(180, 83, 9, 0.02)");
      radialGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.fill();

      // Core center pulse
      const pulseRadius = 15 + Math.sin(Date.now() * 0.003) * 3;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
      const centerGrad = ctx.createRadialGradient(
        width / 2, height / 2, 1,
        width / 2, height / 2, pulseRadius
      );
      centerGrad.addColorStop(0, "rgba(255, 230, 0, 0.9)");
      centerGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.4)");
      centerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGrad;
      ctx.fill();

      // Update nodes
      const time = Date.now() * 0.0005;
      nodes.forEach((node, i) => {
        // Simple orbiting animation
        node.angle += node.speed;
        const ring = idxToRing(i);
        const radius = ring * 35 + 20 + Math.sin(time + ring) * 15;
        
        const orbitX = width / 2 + Math.cos(node.angle) * radius;
        const orbitY = height / 2 + Math.sin(node.angle) * radius;

        // Interaction coordinates with magnetic attractor cursor
        const dx = currentX - node.x;
        const dy = currentY - node.y;
        const dist = Math.hypot(dx, dy);
        
        let forceX = 0;
        let forceY = 0;

        if (dist < 120) {
          const forcePower = (120 - dist) / 120;
          // React smoothly pushing or pulling based on state
          forceX = (dx / dist) * forcePower * 3.5;
          forceY = (dy / dist) * forcePower * 3.5;
        }

        // Return forces
        node.x += (orbitX - node.x) * 0.05 + forceX;
        node.y += (orbitY - node.y) * 0.05 + forceY;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${0.4 + Math.sin(time + i) * 0.25})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#F59E0B";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Render web connections to neighboring nodes (golden constellation outline)
      ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render web strands linking the cursor position inside core space
      const coreDx = currentX - (width / 2);
      const coreDy = currentY - (height / 2);
      const coreDist = Math.hypot(coreDx, coreDy);
      if (coreDist < width / 2) {
        ctx.strokeStyle = "rgba(255, 215, 0, 0.05)";
        nodes.forEach((node) => {
          const nodeDist = Math.hypot(currentX - node.x, currentY - node.y);
          if (nodeDist < 100) {
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  const handleLocationClick = (loc: typeof locations[0]) => {
    playSoftClick(soundEnabled);
    setSelectedLocation(loc);
  };

  const notifyCoreHover = () => {
    if (!hoveringCore) {
      playMetallicPing(soundEnabled);
      setHoveringCore(true);
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background canvas for the premium subtle interactive star-field */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Background textures & Premium animated layers to fill up empty space */}
      <div className="absolute inset-0 bg-gold-grid-elegant opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix-gold opacity-50 pointer-events-none" />
      
      {/* Floating Gorgeous Cosmic/Amber Blobs */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px] top-[15%] left-[5%] animate-drift-slow-1 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-yellow-500/5 blur-[140px] bottom-[20%] right-[10%] animate-drift-slow-2 pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-600/5 blur-[90px] top-[45%] left-[45%] animate-drift-slow-3 pointer-events-none" />

      {/* Sparkling Amber Star Fireflies */}
      <div className="absolute w-1 h-1 bg-amber-400 rounded-full top-[12%] left-[18%] animate-flicker-star pointer-events-none" />
      <div className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full top-[35%] left-[8%] animate-flicker-star [animation-delay:1.5s] pointer-events-none" />
      <div className="absolute w-1 h-1 bg-amber-500 rounded-full top-[65%] left-[25%] animate-flicker-star [animation-delay:3s] pointer-events-none" />
      <div className="absolute w-2 h-2 bg-yellow-400/80 rounded-full top-[25%] right-[22%] animate-flicker-star [animation-delay:0.7s] pointer-events-none" />
      <div className="absolute w-1 h-1 bg-amber-400 rounded-full top-[55%] right-[10%] animate-flicker-star [animation-delay:2.2s] pointer-events-none" />
      <div className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full bottom-[15%] left-[40%] animate-flicker-star [animation-delay:4s] pointer-events-none" />
      <div className="absolute w-1 h-1 bg-amber-500 rounded-full bottom-[28%] right-[35%] animate-flicker-star [animation-delay:1.8s] pointer-events-none" />

      <div className="absolute inset-[radial-gradient(circle_at_0%_0%,rgba(180,83,9,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Prestigious Copy & Interactive Niche */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 relative select-none">
          {/* Elite Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-amber-500 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            2-Day Delivery • 4.9/5 Rated • See First, Pay Later
          </div>

          {/* Dynamic Geographic Destination */}
          <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-400">
            <span className="text-[10px] font-mono tracking-widest uppercase">Forge Region:</span>
            <div className="flex flex-wrap gap-1">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => handleLocationClick(loc)}
                  className={`px-2 py-1 text-[10px] font-mono rounded transition-all flex items-center gap-1 ${
                    selectedLocation.name === loc.name
                      ? "bg-amber-500 text-black font-semibold"
                      : "bg-zinc-900/50 hover:bg-zinc-900 hover:text-zinc-200"
                  }`}
                >
                  <MapPin className="w-2.5 h-2.5" />
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Title paired with Playfair Display headings */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif text-[#FFF] leading-[1.08] tracking-tight">
            Building Digital <span className="italic font-normal text-amber-400 font-serif relative">Empires</span>,<br />
            One Premium Brand at a Time.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base tracking-wide max-w-xl font-normal leading-relaxed">
            Dominating <strong className="text-amber-400 font-mono font-medium brightness-125 uppercase">{selectedLocation.text}</strong>. 
            We do not manufacture standard websites or common landing sheets; we forge legendary speed architectures crafted to seize absolute page-one supremacy.
          </p>

          {/* Luxury core stats block */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-b border-zinc-800/60 py-4 w-full max-w-md">
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-amber-400">500+</div>
              <div className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">Happy Clients</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#FFF] flex items-center">
                4.9<span className="text-amber-500 text-sm ml-1">★</span>
              </div>
              <div className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">Rating (87+ Revs)</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#FFF]">48 <span className="text-amber-500 text-sm">Hrs</span></div>
              <div className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">Average Forge</div>
            </div>
          </div>

          {/* Dual CTAs and WhatsApp Prompt */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                playSoftClick(soundEnabled);
                onOpenChat();
              }}
              onMouseEnter={() => playMetallicPing(soundEnabled)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase px-6 py-3.5 rounded-lg shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-black font-extrabold shrink-0" />
              PQ AI Concierge Room
            </button>
            <button
              onClick={() => {
                playSoftClick(soundEnabled);
                onExplorePlans();
              }}
              onMouseEnter={() => playMetallicPing(soundEnabled)}
              className="flex items-center justify-center gap-2 bg-zinc-950/80 hover:bg-zinc-900 text-[#FFF] border border-zinc-800 hover:border-amber-500/40 text-xs font-mono tracking-widest uppercase px-6 py-3.5 rounded-lg transition-all cursor-pointer"
            >
              <span>Review Forge Plans</span>
              <ArrowDown className="w-4 h-4 text-amber-500 shrink-0" />
            </button>
          </div>
        </div>

        {/* Right Column: Mesmerizing Phoenix Core with relative spatial depth */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] sm:min-h-[450px]">
          <div 
            className="relative w-full max-w-[400px] aspect-square rounded-full border border-amber-500/10 bg-black/40 flex items-center justify-center cursor-crosshair overflow-hidden group transition-all"
            onMouseEnter={notifyCoreHover}
            onMouseLeave={() => setHoveringCore(false)}
          >
            {/* Spinning Golden Orbit Rings */}
            <div className="absolute inset-8 rounded-full border border-dashed border-amber-500/20 animate-[spin_50s_linear_infinite] group-hover:border-amber-500/40 transition-colors" />
            <div className="absolute inset-16 rounded-full border border-dashed border-amber-500/10 animate-[spin_30s_linear_infinite_reverse] group-hover:border-amber-500/30 transition-colors" />
            
            {/* Overlay Gradient Screen */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

            {/* Interactive Canvas Grid */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full z-10"
            />

            {/* Float-over Tech Indicator */}
            <div className="absolute bottom-5 z-20 text-center select-none bg-black/90 border border-zinc-800/80 px-3 py-1.5 rounded-lg backdrop-blur">
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                {hoveringCore ? "● MAGNETIC COUPLING ACTIVE" : "⌖ HOVER TO HARNESS PHOENIX CORE"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator footer bubble */}
      <div 
        onClick={onExplorePlans}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer select-none text-zinc-600 hover:text-amber-500 transition-colors duration-300"
      >
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase">Begin Audit Ascent</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
