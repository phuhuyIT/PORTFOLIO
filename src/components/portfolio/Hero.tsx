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
      // distance from center, normalized to -1..1 by half-dimension
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      // distance magnitude 0..~1.4, clamp to 1
      const dist = Math.min(1, Math.hypot(dx, dy));
      target.current.x = dist;
      target.current.y = dy; // for slight vertical drift
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

    const animate = () => {
      // lerp toward target for smoothness
      const ease = 0.08;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      const dist = current.current.x; // 0 (center) .. 1 (far)
      const yDrift = current.current.y;

      // Translate amounts (in % of hand width)
      // dist=0 -> hands meet (translate 0)
      // dist=1 -> hands pulled apart (translate -X for left, +X for right)
      const pushX = dist * 18; // percent
      const liftY = (1 - dist) * 1.5 + yDrift * 1.5; // small lift when meeting
      const rotate = (1 - dist) * 2;

      if (leftRef.current) {
        leftRef.current.style.transform =
          `translate3d(${-pushX}%, ${-liftY}%, 0) rotate(${-rotate}deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform =
          `translate3d(${pushX}%, ${-liftY}%, 0) rotate(${rotate}deg)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    animate();

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
          style={{ transform: "translate3d(-18%, 0, 0)" }}
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
          style={{ transform: "translate3d(18%, 0, 0)" }}
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