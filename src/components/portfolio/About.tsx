import React from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export const About = () => {
  const skillsData = portfolio.skills || {};
  const allSkills = Object.values(skillsData).flat();

  return (
    <section className="container mx-auto px-6 py-24 md:py-32">
      <SectionHeader index="02" label="SUBJECT_FILE" title="ABOUT THE ARCHITECT" />
      
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
        {/* Left: Photo & Badges */}
        <div className="space-y-8">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:mx-0 group glass-panel">
            <div className="w-full h-full overflow-hidden relative">
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
              <span key={badge} className="px-3 py-1 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] font-mono text-[10px] tracking-widest glass-panel">
                [ {badge} ]
              </span>
            ))}
          </div>

          <div className="space-y-4 p-6 glass-panel max-w-md">
             <div className="font-mono text-[9px] text-white/30 tracking-[0.2em] mb-4 uppercase flex justify-between">
                <span>// TACTICAL_METRICS</span>
                <span className="animate-pulse">ONLINE</span>
             </div>
             {[
               { label: "SYNC_STABILITY", value: 94 },
               { label: "NEURAL_LOAD", value: 38 },
               { label: "LATENCY_INDEX", value: 12 },
             ].map((stat) => (
               <div key={stat.label} className="space-y-1.5">
                 <div className="flex justify-between font-mono text-[8px] tracking-wider text-white/50">
                   <span>{stat.label}</span>
                   <span>{stat.value}%</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${stat.value > 80 ? 'bg-[#00FFD1]' : stat.value > 30 ? 'bg-[#7B61FF]' : 'bg-[#FF6B35]'}`}
                   />
                 </div>
               </div>
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
            
            <div className="flex flex-wrap gap-3">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="skill-chip magnetic"
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
