import React from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export const About = () => {
  const allSkills = Object.values(portfolio.skills).flat();

  return (
    <section id="about" className="container mx-auto px-6 py-24 md:py-32 scroll-mt-20">
      <SectionHeader index="02" label="SUBJECT_FILE" title="ABOUT THE ARCHITECT" />
      
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
        {/* Left: Photo & Badges */}
        <div className="space-y-8">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:mx-0 group">
            {/* HUD Corners */}
            <div className="absolute -inset-2 border border-[#00FFD1]/20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FFD1] -translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FFD1] translate-x-1 translate-y-1" />
            
            <div className="w-full h-full overflow-hidden bg-[#1A2535] relative">
              {/* Placeholder/Photo with filter */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7B61FF]/40 to-[#00FFD1]/40 mix-blend-color" />
              <div className="w-full h-full flex items-center justify-center bg-black/40">
                <span className="font-orbitron text-8xl opacity-10 select-none">{portfolio.initials}</span>
              </div>
              
              {/* Scanline effect on photo */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,209,0)_50%,rgba(0,255,209,0.1)_50%)] bg-[length:100%_4px] animate-pulse" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {["HUMAN", "DEVELOPER", "AI COLLABORATOR"].map((badge) => (
              <span key={badge} className="px-3 py-1 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] font-mono text-[10px] tracking-widest">
                [ {badge} ]
              </span>
            ))}
          </div>
        </div>

        {/* Right: Bio & Skills */}
        <div className="space-y-12">
          <div className="space-y-6 text-white/70 leading-relaxed">
            {portfolio.aboutBody.map((p, i) => (
              <p key={i} className="text-lg">
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-xs text-[#00FFD1] tracking-[0.2em] border-b border-[#00FFD1]/20 pb-2">
              LOADED MODULES
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="px-4 py-2 bg-[#020408] border border-[#00FFD1]/20 text-white/80 font-mono text-[11px] hover:border-[#00FFD1] hover:shadow-[0_0_15px_rgba(0,255,209,0.3)] transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
