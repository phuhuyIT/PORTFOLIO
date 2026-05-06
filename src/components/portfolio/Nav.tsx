import React, { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "SUBJECT", id: "02" },
  { href: "#projects", label: "MISSIONS", id: "03" },
  { href: "#experiments", label: "LAB", id: "04" },
  { href: "#records", label: "RECORDS", id: "05" },
];

export const Nav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = links.map(l => l.href.substring(1));
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
        className="font-mono text-[10px] bg-[#00FFD1]/5 border border-[#00FFD1]/30 px-4 py-1.5 hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] transition-all text-[#00FFD1] tracking-wider magnetic"
      >
        TRANSMIT →
      </a>
    </nav>
  );
};
