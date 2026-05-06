import React, { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";
import { HeroOrb } from "./HeroOrb";
import { motion } from "framer-motion";

import { Typewriter } from "./Typewriter";

export const Hero = () => {
  const [glitch, setGlitch] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-14">
      {/* Left side: Content */}
      <div 
        className="w-full md:w-3/5 z-10 space-y-6 hero-content"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[#00FFD1]/60 text-[10px] tracking-[0.3em]"
        >
          // UNIT_ID: 001 · ACTIVE
        </motion.div>

        <h1 
          className={`font-orbitron text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white hero-name ${glitch ? 'glitch-wrapper' : ''}`}
          data-text={portfolio.name}
          style={{ 
            transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` 
          }}
        >
          {portfolio.name}
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-mono text-[#00FFD1] text-sm md:text-lg tracking-widest border-l-2 border-[#00FFD1] pl-4 py-1 h-8"
        >
          <Typewriter text={portfolio.role} startDelay={1500} />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-lg text-white/60 text-sm md:text-base leading-relaxed"
        >
          {portfolio.heroSubtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <a
            href="#projects"
            className="font-mono text-xs border border-[#00FFD1] px-6 py-3 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all hud-corners magnetic"
          >
            [ VIEW MISSION LOGS ]
          </a>
          <a
            href="#contact"
            className="font-mono text-xs border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition-all hud-corners magnetic"
          >
            [ TRANSMIT MESSAGE ]
          </a>
        </motion.div>
      </div>

      {/* Right side: Visual */}
      <div 
        className="w-full md:w-2/5 h-[400px] md:h-screen relative mt-10 md:mt-0 hero-visual"
      >
        <div 
          className="absolute inset-0 flex items-center justify-center hero-orb"
          style={{ 
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` 
          }}
        >
          <HeroOrb />
        </div>
        
        {/* Floating particles layer */}
        <div 
          className="absolute inset-0 pointer-events-none hero-particles"
          style={{ 
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)` 
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="font-mono text-[8px] text-white/30 tracking-[0.4em]">SCROLL TO EXPLORE</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00FFD1] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
