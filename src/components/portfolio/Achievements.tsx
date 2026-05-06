import React from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export const Achievements = () => (
  <section id="records" className="container mx-auto px-6 py-24 md:py-32 scroll-mt-20">
    <SectionHeader index="05" label="CLEARANCE_RECORDS" title="VERIFIED ACHIEVEMENTS" />
    
    <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00FFD1] via-[#00FFD1]/20 to-transparent md:-translate-x-1/2" />
      
      <div className="space-y-16">
        {portfolio.experience.map((e, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 ${
              i % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Pulsing Dot */}
            <div className="absolute left-[-36px] md:left-1/2 top-2 w-4 h-4 rounded-full bg-[#020408] border border-[#00FFD1] md:-translate-x-1/2 z-10">
              <div className="absolute inset-0 rounded-full bg-[#00FFD1] animate-ping opacity-40" />
            </div>

            {/* Year */}
            <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
              <div className="font-orbitron text-xl md:text-2xl text-[#00FFD1] font-bold">
                {e.period}
              </div>
            </div>

            {/* Content Card */}
            <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
              <div className="space-y-4 glass-panel p-6 hover:border-[#00FFD1]/30 transition-all group">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg md:text-xl text-white font-sans uppercase tracking-tight group-hover:text-[#00FFD1] transition-colors">{e.role}</h3>
                  <div className="font-mono text-[10px] text-[#7B61FF] uppercase tracking-widest">
                    {e.org}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                    {e.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
