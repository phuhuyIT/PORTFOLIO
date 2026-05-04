import React, { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";
import { HeroOrb } from "./HeroOrb";
import { motion } from "framer-motion";

import { Typewriter } from "./Typewriter";

export const Hero = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-14">
      {/* Left side: Content */}
      <div className="w-full md:w-3/5 z-10 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[#00FFD1]/60 text-[10px] tracking-[0.3em]"
        >
          // UNIT_ID: 001 · ACTIVE
        </motion.div>

        <h1 
          className={`font-orbitron text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white ${glitch ? 'glitch-wrapper' : ''}`}
          data-text={portfolio.name}
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
            className="font-mono text-xs border border-[#00FFD1] px-6 py-3 text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all hud-corners"
          >
            [ VIEW MISSION LOGS ]
          </a>
          <a
            href="#contact"
            className="font-mono text-xs border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition-all hud-corners"
          >
            [ TRANSMIT MESSAGE ]
          </a>
        </motion.div>
      </div>

      {/* Right side: Visual */}
      <div className="w-full md:w-2/5 h-[400px] md:h-screen relative mt-10 md:mt-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroOrb />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="font-mono text-[8px] text-white/30 tracking-[0.4em]">SCROLL TO EXPLORE</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00FFD1] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
