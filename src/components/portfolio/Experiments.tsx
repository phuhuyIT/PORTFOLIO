import React from "react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";

const experiments = [
  { title: "Neural Link v1", description: "Early prototype of browser-based brain-machine interface simulation.", status: "ARCHIVED" },
  { title: "Ghost Shell", description: "Stealth routing protocol for decentralized communication nodes.", status: "ACTIVE" },
  { title: "Aurora Engine", description: "Procedural shader library for atmospheric space environments.", status: "PROTOTYPE" },
  { title: "Data Weaver", description: "Real-time visualization of global satellite transmission packets.", status: "ACTIVE" },
  { title: "Void OS", description: "Minimalist terminal-only operating system built on top of WebAssembly.", status: "PROTOTYPE" },
];

export const Experiments = () => {
  return (
    <section id="experiments" className="container mx-auto px-6 py-24 md:py-32 scroll-mt-20">
      <SectionHeader index="04" label="LAB_PROTOCOLS" title="EXPERIMENTAL ARTIFACTS" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiments.map((exp, i) => {
          const randomRot = (Math.random() * 2 - 1).toFixed(1);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => playSound('ui_hover')}
              onClick={() => playSound('ui_click')}
              className={`glass-panel p-6 flex flex-col justify-between gap-6 hover:border-[#00FFD1]/50 transition-all group magnetic ${
                i === 0 ? "md:col-span-2 md:row-span-1" : ""
              } ${i === 3 ? "md:col-span-1 md:row-span-1" : ""}`}
              style={{ transform: `rotate(${randomRot}deg)` }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
            >
              <div className="flex justify-between items-start">
                <span className={`font-mono text-[9px] px-2 py-0.5 border glass-panel ${
                  exp.status === 'ACTIVE' ? 'border-[#00FFD1] text-[#00FFD1] bg-[#00FFD1]/10' :
                  exp.status === 'PROTOTYPE' ? 'border-[#7B61FF] text-[#7B61FF] bg-[#7B61FF]/10' :
                  'border-white/20 text-white/40 bg-white/5'
                }`}>
                  [ {exp.status} ]
                </span>
                <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#00FFD1] transition-colors" />
              </div>

              <div className="space-y-2">
                <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-[#00FFD1] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="flex justify-between items-end font-mono text-[8px] text-white/20">
                <span>PRTL_REF: 00{i + 1}</span>
                <span className="group-hover:text-[#00FFD1] transition-colors cursor-pointer">INIT_NODE →</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
