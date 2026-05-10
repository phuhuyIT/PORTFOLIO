import { ReactNode, useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Nav } from "./Nav";
import { BootSequence } from "./BootSequence";
import { CustomCursor } from "./CustomCursor";
import { CursorTrail } from "./CursorTrail";
import { LiquidGlassFilter } from "./LiquidGlassFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import { resumeAudioContext } from "@/lib/audio";

// Lazy load heavy Three.js component
const AuroraScene = lazy(() => import("./three/Scene").then(module => ({ default: module.AuroraScene })));

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [bootComplete, setBootComplete] = useState(false);
  const isMobile = useIsMobile();

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    resumeAudioContext();
  }, []);

  useEffect(() => {
    // Resume audio context on first interaction
    const resumeAudio = () => {
      resumeAudioContext();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
    };

    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);
    window.addEventListener('touchstart', resumeAudio);

    if (!bootComplete || isMobile) return;

    // Shockwave effect
    const handleClick = (e: MouseEvent) => {
      const ring = document.createElement('div');
      ring.className = 'shockwave';
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
      document.body.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove());
    };

    // Button Energy Charge effect - Cache elements for performance
    let chargeElements: HTMLElement[] = [];
    const updateElementsCache = () => {
      chargeElements = Array.from(document.querySelectorAll('.btn-charge, button, .nav-link, a.magnetic')) as HTMLElement[];
    };
    
    // Initial cache
    updateElementsCache();
    
    // Update cache occasionally as new elements might appear (e.g. after lazy loading)
    const cacheInterval = setInterval(updateElementsCache, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      if (chargeElements.length === 0) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const maxDist = 160;

      for (let i = 0; i < chargeElements.length; i++) {
        const btn = chargeElements[i];
        const rect = btn.getBoundingClientRect();
        
        // Simple distance check before more expensive calculations
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        
        // Quick check: if mouse is far outside the bounding box + maxDist, skip
        if (Math.abs(dx) > maxDist + rect.width / 2 || Math.abs(dy) > maxDist + rect.height / 2) {
          if (btn.style.getPropertyValue('--charge') !== '0') {
            btn.style.setProperty('--charge', '0');
          }
          continue;
        }

        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const intensity = 1 - dist / maxDist;
          btn.style.setProperty('--charge', intensity.toString());
        } else {
          if (btn.style.getPropertyValue('--charge') !== '0') {
            btn.style.setProperty('--charge', '0');
          }
        }
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', throttledMouseMove);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', throttledMouseMove);
      clearInterval(cacheInterval);
      cancelAnimationFrame(rafId);
    };
  }, [bootComplete, isMobile]);

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden aurora-bg ${bootComplete ? 'bg-grid-pattern' : ''}`}>
      <LiquidGlassFilter />
      <Suspense fallback={<div className="fixed inset-0 bg-[#020408] z-[-1]" />}>
        <AuroraScene />
      </Suspense>

      {!bootComplete && (
        <BootSequence onComplete={handleBootComplete} />
      )}
      
      {bootComplete && (
        <>
          {!isMobile && (
            <>
              <CustomCursor />
              <CursorTrail />
            </>
          )}
          
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
