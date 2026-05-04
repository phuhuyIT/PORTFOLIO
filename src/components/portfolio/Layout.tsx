import { ReactNode, useState, useEffect } from "react";
import { Nav } from "./Nav";
import { BootSequence } from "./BootSequence";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden aurora-bg ${bootComplete ? 'bg-grid-pattern' : ''}`}>
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}
      
      {bootComplete && (
        <>
          <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(transparent_50%,#00FFD1_50%)] bg-[length:100%_4px]" />
          
          <Nav />
          
          <main className="relative z-10">
            {children}
          </main>
          
          <footer className="relative z-10 py-8 px-6 border-t border-white/5 text-center font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
            AURORA PROTOCOL v2.1  ·  SYSTEM_ID: 001  ·  2026
          </footer>
        </>
      )}
    </div>
  );
};
