import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, Rocket, Beaker, Database, Send } from "lucide-react";

const links = [
  { href: "#about", label: "SUBJECT", id: "02", icon: User },
  { href: "#projects", label: "MISSIONS", id: "03", icon: Rocket },
  { href: "#experiments", label: "LAB", id: "04", icon: Beaker },
  { href: "#records", label: "RECORDS", id: "05", icon: Database },
];

export const Nav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = links.map(l => l.href.substring(1));
      // Add records which is not in the links array but referred as section id
      if (!sections.includes("records")) sections.push("records");
      
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Nav - Logo and Contact (Always visible or desktop only) */}
      <nav className={`fixed top-0 left-0 w-full h-14 z-50 px-6 border-b transition-all duration-300 flex items-center justify-between ${
        scrolled 
          ? "bg-[#020408]/60 backdrop-blur-3xl border-[#00FFD1]/20 shadow-[0_4px_32px_rgba(0,0,0,0.4)]" 
          : "bg-transparent border-transparent"
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-pulse" />
          <a href="#" className="font-orbitron font-bold text-xs md:text-sm tracking-[0.2em] text-[#00FFD1] magnetic">
            AURORA PROTOCOL
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-[10px] transition-all flex items-center gap-2 group magnetic ${
                activeSection === l.href.substring(1) ? "text-[#00FFD1]" : "text-white/50 hover:text-[#00FFD1]"
              }`}
            >
              <span className={`transition-colors ${
                activeSection === l.href.substring(1) ? "text-[#00FFD1]/80" : "text-[#00FFD1]/30 group-hover:text-[#00FFD1]/60"
              }`}>[{l.id}]</span>
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className={`font-mono text-[10px] bg-[#00FFD1]/5 border border-[#00FFD1]/30 px-4 py-1.5 hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] transition-all text-[#00FFD1] tracking-wider magnetic ${
            isMobile ? "hidden" : "block"
          }`}
        >
          TRANSMIT →
        </a>
      </nav>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 z-50 bg-[#020408]/80 backdrop-blur-2xl border border-[#00FFD1]/30 rounded-2xl flex items-center justify-around px-4 shadow-[0_8px_32px_rgba(0,255,209,0.15)]">
          {links.map((l) => {
            const Icon = l.icon;
            const isActive = activeSection === l.href.substring(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive ? "text-[#00FFD1]" : "text-white/40 active:text-[#00FFD1]/60"
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-[#00FFD1]/10" : ""}`}>
                  <Icon size={18} />
                </div>
                <span className="font-mono text-[8px] tracking-[0.1em]">{l.label}</span>
              </a>
            );
          })}
          <a
            href="#contact"
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeSection === "contact" ? "text-[#00FFD1]" : "text-white/40 active:text-[#00FFD1]/60"
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeSection === "contact" ? "bg-[#00FFD1]/10" : ""}`}>
              <Send size={18} />
            </div>
            <span className="font-mono text-[8px] tracking-[0.1em]">CONTACT</span>
          </a>
        </nav>
      )}
    </>
  );
};
