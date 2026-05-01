import { useEffect, useRef } from "react";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import handRobot from "@/assets/hand-robot.png";
import handHuman from "@/assets/hand-human.png";
import { Typewriter } from "./Typewriter";

/**
 * Hero with cursor-reactive halftone hands and a central project icon.
 * - Cursor closer to center => hands move together & icon lights up.
 * - Improved radial tracking for smoother motion.
 */
export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const releaseTimeout = useRef<number | null>(null);
  const snapToCenter = useRef<() => void>(() => {});

  // animated state
  const target = useRef({ x: 0, y: 0 }); // 0..1 normalized distance (0=center, 1=far)
  const current = useRef({ x: 1, y: 0 });
  const rafId = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const hero = heroRef.current;
    if (!hero) return;

    let cx = 0;
    let cy = 0;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    };
    measure();

    const onMove = (e: PointerEvent) => {
      if (reduceMotion.current) return;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const pixelDist = Math.hypot(dx, dy);

      // Radial tracking: Hands start moving together within 600px radius
      const MAX_RADIUS = 600;
      let dist = pixelDist / MAX_RADIUS;
      if (dist > 1) dist = 1;

      // Deadzone for perfect touch
      const DEADZONE = 0.05;
      if (dist < DEADZONE) {
        dist = 0;
      } else {
        dist = (dist - DEADZONE) / (1 - DEADZONE);
      }

      target.current.x = dist;
      target.current.y = (dy / MAX_RADIUS) * 0.3;
    };

    const onLeave = () => {
      if (reduceMotion.current) return;
      target.current.x = 1;
      target.current.y = 0;
    };

    const onTouchRelease = () => {
      if (reduceMotion.current) return;
      target.current.x = 1;
      target.current.y = 0;
    };

    // Shared snap helper
    snapToCenter.current = () => {
      if (reduceMotion.current) return;
      target.current.x = 0;
      target.current.y = 0;
      if (releaseTimeout.current) window.clearTimeout(releaseTimeout.current);
      releaseTimeout.current = window.setTimeout(() => {
        target.current.x = 1;
        target.current.y = 0;
        releaseTimeout.current = null;
      }, 800);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerup", onTouchRelease);
    window.addEventListener("pointercancel", onTouchRelease);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });

    let lastT = performance.now();
    const animate = (now: number) => {
      const dt = Math.min(64, now - lastT);
      lastT = now;

      // Smoother follow factor (increased slightly for better responsiveness)
      const k = 1 - Math.exp(-dt / 1000 * 10);

      current.current.x += (target.current.x - current.current.x) * k;
      current.current.y += (target.current.y - current.current.y) * k;

      const dist = current.current.x; // 0 (center) .. 1 (far)
      const inv = 1 - dist; // 1 (center) .. 0 (far)

      const pushX = inv * 12; // Reduced from 48
      const liftY = inv * 12 + current.current.y * 5; // Increased from 2
      const rotate = inv * 10; // Increased from 2.5

      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${pushX}%, ${-liftY}%, 0) rotate(${rotate}deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${-pushX}%, ${-liftY}%, 0) rotate(${-rotate}deg)`;
      }

      // Icon lighting logic
      if (iconRef.current) {
        const glowIntensity = Math.pow(inv, 2); // Quadratic for more dramatic reveal
        iconRef.current.style.opacity = (0.2 + glowIntensity * 0.8).toString();
        iconRef.current.style.filter = `drop-shadow(0 0 ${glowIntensity * 20}px rgba(255, 45, 45, 0.8))`;
        iconRef.current.style.transform = `scale(${0.9 + glowIntensity * 0.2})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (releaseTimeout.current) window.clearTimeout(releaseTimeout.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerup", onTouchRelease);
      window.removeEventListener("pointercancel", onTouchRelease);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center pt-28 pb-0 touch-none"
    >
      {/* Foreground content */}
      <div className="relative z-30 container mx-auto text-center px-4 animate-fade-in-up">
        <div className="inline-block mb-4 px-3 py-1 border border-accent/30 bg-accent/5 rounded text-[10px] uppercase tracking-[0.3em] text-accent animate-pulse font-mono liquid-glass">
          System Initialized // Neural Link Active
        </div>
        <h1 className="font-mono text-[clamp(2.5rem,8vw,7rem)] leading-[1] tracking-tighter uppercase font-black italic">
          {portfolio.heroHeadline.map((line, i) => (
            <span key={i} className="block last:text-accent drop-shadow-[0_0_15px_rgba(255,45,45,0.3)]">
              <Typewriter text={line} startDelay={1000 + i * 1500} />
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-sm md:text-base font-mono text-muted-foreground/80 leading-relaxed uppercase tracking-wider">
          <Typewriter text={portfolio.heroSubtitle} startDelay={4000} delay={20} />
        </p>
        <a
          href="#contact"
          className="pill liquid-glass-accent mt-10 text-sm font-mono uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both"
          style={{ animationDelay: '6000ms' }}
        >
          {portfolio.heroCta}
          <ArrowUpRight className="size-4" />
        </a>

        <button
          type="button"
          onClick={() => snapToCenter.current()}
          className="sr-only focus:not-sr-only focus:fixed focus:left-1/2 focus:-translate-x-1/2 focus:top-24 focus:z-50 focus:pill focus:bg-primary focus:text-primary-foreground"
        >
          Activate neural link
        </button>
      </div>

      {/* Reactive Project Icon - Centered between hands vertically */}
      <div className="absolute left-1/2 bottom-[20%] -translate-x-1/2 translate-y-1/2 z-[5] pointer-events-none">
        <div 
          ref={iconRef}
          className="text-accent"
          style={{ opacity: 0.2 }}
        >
          <LayoutGrid className="size-20 md:size-32" />
        </div>
      </div>

      {/* Hands — anchored to bottom edges */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-between">
        <div
          ref={leftRef}
          className="w-[75vw] max-w-[950px] -ml-[10vw] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src={handRobot}
            alt=""
            width={1280}
            height={896}
            className="w-full h-auto select-none opacity-90"
            draggable={false}
          />
        </div>
        <div
          ref={rightRef}
          className="w-[75vw] max-w-[950px] -mr-[10vw] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src={handHuman}
            alt=""
            width={1280}
            height={896}
            className="w-full h-auto select-none opacity-90"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};