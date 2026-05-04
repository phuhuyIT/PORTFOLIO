import React from "react";

const links = [
  { href: "#about", label: "SUBJECT", id: "02" },
  { href: "#projects", label: "MISSIONS", id: "03" },
  { href: "#experiments", label: "LAB", id: "04" },
  { href: "#records", label: "RECORDS", id: "05" },
];

export const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-14 z-50 px-6 border-b border-[#00FFD1]/10 bg-[#020408]/80 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-pulse" />
        <a href="#" className="font-orbitron font-bold text-xs md:text-sm tracking-[0.2em] text-[#00FFD1]">
          AURORA PROTOCOL
        </a>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[10px] text-white/50 hover:text-[#00FFD1] transition-colors flex items-center gap-2 group"
          >
            <span className="text-[#00FFD1]/30 group-hover:text-[#00FFD1]/60 transition-colors">[{l.id}]</span>
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="font-mono text-[10px] bg-[#00FFD1]/5 border border-[#00FFD1]/30 px-4 py-1.5 hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] transition-all text-[#00FFD1] tracking-wider"
      >
        TRANSMIT →
      </a>
      
      {/* Mobile Menu Placeholder - keeping it simple for now as per plan */}
    </nav>
  );
};
