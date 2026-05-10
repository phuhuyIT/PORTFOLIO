import React from "react";
import { portfolio } from "@/content/portfolio";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { playSound } from "@/lib/audio";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('form_submit');
  };

  return (
    <section className="container mx-auto px-6 py-24 md:py-40">
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
        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-8 text-left font-mono text-sm max-w-xl mx-auto shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <span className="text-[#00FFD1] group-focus-within:animate-pulse">{'> '} NAME:</span>
              <input type="text" className="bg-transparent border-b border-white/10 outline-none flex-1 text-white/80 focus:border-[#00FFD1] transition-colors" placeholder="IDENTIFY_SELF" />
            </div>
            <div className="flex items-center gap-4 group">
              <span className="text-[#00FFD1] group-focus-within:animate-pulse">{'> '} CHANNEL:</span>
              <input type="email" className="bg-transparent border-b border-white/10 outline-none flex-1 text-white/80 focus:border-[#00FFD1] transition-colors" placeholder="COMM_ADDR" />
            </div>
            <div className="flex flex-col gap-4 group">
              <span className="text-[#00FFD1] group-focus-within:animate-pulse">{'> '} MESSAGE:</span>
              <textarea className="bg-transparent border border-white/10 outline-none w-full h-32 p-4 text-white/80 focus:border-[#00FFD1] transition-colors resize-none glass-panel" placeholder="ENTER_DATA_PACKET..." />
            </div>
          </div>
          
          <button 
            type="submit"
            onMouseEnter={() => playSound('ui_hover')}
            className="w-full bg-[#00FFD1]/10 border border-[#00FFD1]/40 text-[#00FFD1] py-4 hover:bg-[#00FFD1]/20 transition-all font-bold tracking-[0.2em] magnetic"
          >
            [ TRANSMIT MESSAGE ──→ ]
          </button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-8 pt-12">
          {portfolio.socials.github && (
            <a 
              href={portfolio.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              onMouseEnter={() => playSound('ui_hover')}
              onClick={() => playSound('ui_click')}
              className="text-white/40 hover:text-[#00FFD1] transition-colors magnetic"
            >
              <Github className="size-6" />
            </a>
          )}
          {portfolio.socials.linkedin && (
            <a 
              href={portfolio.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              onMouseEnter={() => playSound('ui_hover')}
              onClick={() => playSound('ui_click')}
              className="text-white/40 hover:text-[#00FFD1] transition-colors magnetic"
            >
              <Linkedin className="size-6" />
            </a>
          )}
          {portfolio.socials.twitter && (
            <a 
              href={portfolio.socials.twitter} 
              target="_blank" 
              rel="noreferrer" 
              onMouseEnter={() => playSound('ui_hover')}
              onClick={() => playSound('ui_click')}
              className="text-white/40 hover:text-[#00FFD1] transition-colors magnetic"
            >
              <Twitter className="size-6" />
            </a>
          )}
          <a 
            href={`mailto:${portfolio.email}`} 
            onMouseEnter={() => playSound('ui_hover')}
            onClick={() => playSound('ui_click')}
            className="text-white/40 hover:text-[#00FFD1] transition-colors magnetic"
          >
            <Mail className="size-6" />
          </a>
        </div>
      </div>
    </section>
  );
};
