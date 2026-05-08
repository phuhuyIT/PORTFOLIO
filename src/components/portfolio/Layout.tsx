import { ReactNode, useState, useEffect, useCallback } from "react";
import { Nav } from "./Nav";
import { BootSequence } from "./BootSequence";
import { CustomCursor } from "./CustomCursor";
import { CursorTrail } from "./CursorTrail";
import { LiquidGlassFilter } from "./LiquidGlassFilter";
import { AuroraScene } from "./three/Scene";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    // Shockwave effect
    const handleClick = (e: MouseEvent) => {
      const ring = document.createElement('div');
      ring.className = 'shockwave';
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
      document.body.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove());
    };

    // Button Energy Charge effect
    const handleMouseMove = (e: MouseEvent) => {
      const chargeElements = document.querySelectorAll('.btn-charge, button, .nav-link, a.magnetic');
      chargeElements.forEach(el => {
        const btn = el as HTMLElement;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const maxDist = 160;

        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          btn.style.setProperty('--charge', intensity.toString());
        } else {
          btn.style.setProperty('--charge', '0');
        }
      });
    };

    const throttledMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', throttledMouseMove);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [bootComplete]);

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden aurora-bg ${bootComplete ? 'bg-grid-pattern' : ''}`}>
      <LiquidGlassFilter />
      <AuroraScene />

      {!bootComplete && (
        <BootSequence onComplete={handleBootComplete} />
      )}
      
      {bootComplete && (
        <>
          <CustomCursor />
          <CursorTrail />
          
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
