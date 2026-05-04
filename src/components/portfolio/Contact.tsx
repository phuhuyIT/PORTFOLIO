import React from "react";
import { portfolio } from "@/content/portfolio";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export const Contact = () => (
  <section id="contact" className="container mx-auto px-6 py-24 md:py-40 scroll-mt-20">
    <div className="max-w-3xl mx-auto text-center space-y-12">
      <SectionHeader index="06" label="OPEN_CHANNEL" title="INITIATE TRANSMISSION" />
      
      <div className="space-y-6">
        <h3 className="font-orbitron text-2xl md:text-4xl text-white font-bold tracking-tight">
          READY TO COLLABORATE?
        </h3>
        <p className="text-white/50 font-mono text-xs tracking-widest uppercase">
          Neural bridge established. Awaiting input.
        </p>
      </div>

      {/* Terminal Form Style */}
      <div className="bg-[#020408] border border-[#00FFD1]/20 p-8 space-y-6 text-left font-mono text-sm max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-[#00FFD1]">{'> '} NAME:</span>
          <input type="text" className="bg-transparent border-b border-white/10 outline-none flex-1 text-white/80 focus:border-[#00FFD1] transition-colors" placeholder="IDENTIFY_SELF" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#00FFD1]">{'> '} CHANNEL:</span>
          <input type="email" className="bg-transparent border-b border-white/10 outline-none flex-1 text-white/80 focus:border-[#00FFD1] transition-colors" placeholder="COMM_ADDR" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#00FFD1]">{'> '} MESSAGE:</span>
          <textarea className="bg-transparent border border-white/10 outline-none w-full h-32 p-3 text-white/80 focus:border-[#00FFD1] transition-colors resize-none" placeholder="ENTER_DATA_PACKET..." />
        </div>
        
        <button className="w-full bg-[#00FFD1]/10 border border-[#00FFD1]/40 text-[#00FFD1] py-4 hover:bg-[#00FFD1]/20 transition-all font-bold tracking-[0.2em]">
          [ TRANSMIT MESSAGE ──→ ]
        </button>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 pt-12">
        {portfolio.socials.github && (
          <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00FFD1] transition-colors">
            <Github className="size-6" />
          </a>
        )}
        {portfolio.socials.linkedin && (
          <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00FFD1] transition-colors">
            <Linkedin className="size-6" />
          </a>
        )}
        {portfolio.socials.twitter && (
          <a href={portfolio.socials.twitter} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00FFD1] transition-colors">
            <Twitter className="size-6" />
          </a>
        )}
        <a href={`mailto:${portfolio.email}`} className="text-white/40 hover:text-[#00FFD1] transition-colors">
          <Mail className="size-6" />
        </a>
      </div>
    </div>
  </section>
);
