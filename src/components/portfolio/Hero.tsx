import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import handRobot from "@/assets/hand-robot.png";
import handHuman from "@/assets/hand-human.png";

/**
 * Hero with cursor-reactive halftone hands.
 * - Cursor far from hero center => hands pulled apart
 * - Cursor near hero center     => hands move together (mirror motion)
 */
export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // animated state
  const target = useRef({ x: 0, y: 0 }); // -1..1 normalized distance from center
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isTouch = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    isTouch.current = window.matchMedia("(hover: none)").matches;

    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      let dist = Math.min(1, Math.hypot(dx, dy));
      // Deadzone near center → snap to exact 0 so hands meet perfectly mirrored
      const DEADZONE = 0.12;
      if (dist < DEADZONE) {
        dist = 0;
      } else {
        dist = (dist - DEADZONE) / (1 - DEADZONE);
      }
      target.current.x = dist;
      target.current.y = dy * 0.5;
    };

    const onLeave = () => {
      target.current.x = 1;
      target.current.y = 0;
    };

    if (!isTouch.current) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    } else {
      // Touch: gentle automatic loop
      let t = 0;
      const loop = () => {
        t += 0.015;
        target.current.x = 0.5 + Math.sin(t) * 0.5;
        target.current.y = Math.sin(t * 0.7) * 0.3;
        rafId.current = requestAnimationFrame(loop);
      };
      loop();
    }

    if (reduceMotion.current) {
      target.current.x = 0.55;
      target.current.y = 0;
    }

    // initial: hands apart
    current.current.x = 1;
    target.current.x = isTouch.current ? target.current.x : 1;

    let lastT = performance.now();
    const animate = (now: number) => {
      const dt = Math.min(64, now - lastT);
      lastT = now;
      // Frame-rate independent smoothing (critically-damped feel)
      // Higher = snappier. ~12 gives smooth, responsive follow.
      const k = 1 - Math.exp(-dt / 1000 * 12);

      current.current.x += (target.current.x - current.current.x) * k;
      current.current.y += (target.current.y - current.current.y) * k;

      // Snap when extremely close to target to guarantee exact mirror at center
      if (Math.abs(current.current.x - target.current.x) < 0.001) {
        current.current.x = target.current.x;
      }

      const dist = current.current.x; // 0 (center) .. 1 (far)
      const yDrift = current.current.y;

      // dist=0 -> hands meet at exact mirrored midpoint (translate to 50% inward)
      // dist=1 -> hands rest at their natural anchored position
      // Hand container is 55vw wide and anchored at left/right edges with -2vw offset.
      // To bring inner edges to screen center we need to translate by ~ (50% - container_edge).
      // Empirically 50% inward translation lands the wrists at the centerline.
      const MAX_PUSH = 50; // percent of hand width
      const pushX = (1 - dist) * MAX_PUSH;
      const liftY = (1 - dist) * 2 + yDrift * 1.5;
      const rotate = (1 - dist) * 3;

      if (leftRef.current) {
        leftRef.current.style.transform =
          `translate3d(${pushX}%, ${-liftY}%, 0) rotate(${rotate}deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform =
          `translate3d(${-pushX}%, ${-liftY}%, 0) rotate(${-rotate}deg)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative halftone-bg overflow-hidden min-h-screen flex flex-col items-center justify-center pt-28 pb-0"
    >
      <div className="grain absolute inset-0" aria-hidden />

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto text-center px-4 animate-fade-in-up">
        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
          {portfolio.heroHeadline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
          {portfolio.heroSubtitle}
        </p>
        <a
          href="#contact"
          className="pill bg-primary text-primary-foreground mt-8 text-base hover:bg-accent hover:text-accent-foreground"
        >
          {portfolio.heroCta}
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      {/* Hands — anchored to bottom edges */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-between">
        <div
          ref={leftRef}
          className="w-[55vw] max-w-[780px] -ml-[2vw] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src={handRobot}
            alt=""
            width={1280}
            height={896}
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>
        <div
          ref={rightRef}
          className="w-[55vw] max-w-[780px] -mr-[2vw] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src={handHuman}
            alt=""
            width={1280}
            height={896}
            className="w-full h-auto select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};