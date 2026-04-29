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

    // Cache hero center + half-extents; refresh only on resize/scroll, not per move.
    let cx = 0;
    let cy = 0;
    let halfW = 1;
    let halfH = 1;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
      halfW = rect.width / 2 || 1;
      halfH = rect.height / 2 || 1;
    };
    measure();

    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX - cx) / halfW;
      const dy = (e.clientY - cy) / halfH;
      let dist = Math.hypot(dx, dy);
      if (dist > 1) dist = 1;
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

    // Unified pointer handling — works for mouse, pen, and touch.
    // pointermove fires for touch while the finger is down; pointerup releases.
    const onTouchRelease = () => {
      // When the finger lifts, ease hands back to their resting (apart) state.
      target.current.x = 1;
      target.current.y = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") onMove(e);
    };

    // Tap detection: a quick, low-movement touch snaps hands to mirrored center,
    // then eases them back apart on release.
    let tapStartX = 0;
    let tapStartY = 0;
    let tapStartT = 0;
    let isTap = false;
    const TAP_MAX_MS = 250;
    const TAP_MAX_DIST = 10; // px

    const onTapStart = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      tapStartX = e.clientX;
      tapStartY = e.clientY;
      tapStartT = performance.now();
      isTap = true;
    };

    const onTapMove = (e: PointerEvent) => {
      if (!isTap || e.pointerType !== "touch") return;
      if (Math.hypot(e.clientX - tapStartX, e.clientY - tapStartY) > TAP_MAX_DIST) {
        isTap = false;
      }
    };

    const onTapEnd = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      if (isTap && performance.now() - tapStartT <= TAP_MAX_MS) {
        // Quick tap: snap to center, then release back apart shortly after.
        target.current.x = 0;
        target.current.y = 0;
        window.setTimeout(() => {
          target.current.x = 1;
          target.current.y = 0;
        }, 450);
      }
      isTap = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerdown", onTapStart, { passive: true });
    window.addEventListener("pointermove", onTapMove, { passive: true });
    window.addEventListener("pointerup", onTapEnd, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerup", onTouchRelease);
    window.addEventListener("pointercancel", onTouchRelease);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    let roCleanup: (() => void) | null = null;
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(hero);
      roCleanup = () => ro.disconnect();
    }

    if (reduceMotion.current) {
      target.current.x = 0.55;
      target.current.y = 0;
    }

    // initial: hands apart
    current.current.x = 1;
    target.current.x = 1;

    let lastT = performance.now();
    let lastPushX = Number.NaN;
    let lastLiftY = Number.NaN;
    let lastRotate = Number.NaN;
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

      const inv = 1 - dist;
      // Quantize to ~2 decimals to skip writes that wouldn't change pixels.
      const pushX = Math.round(inv * 50 * 100) / 100;
      const liftY = Math.round((inv * 2 + yDrift * 1.5) * 100) / 100;
      const rotate = Math.round(inv * 3 * 100) / 100;

      if (pushX !== lastPushX || liftY !== lastLiftY || rotate !== lastRotate) {
        const ty = -liftY;
        if (leftRef.current) {
          leftRef.current.style.transform =
            "translate3d(" + pushX + "%," + ty + "%,0) rotate(" + rotate + "deg)";
        }
        if (rightRef.current) {
          rightRef.current.style.transform =
            "translate3d(" + -pushX + "%," + ty + "%,0) rotate(" + -rotate + "deg)";
        }
        lastPushX = pushX;
        lastLiftY = liftY;
        lastRotate = rotate;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerdown", onTapStart);
      window.removeEventListener("pointermove", onTapMove);
      window.removeEventListener("pointerup", onTapEnd);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerup", onTouchRelease);
      window.removeEventListener("pointercancel", onTouchRelease);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      if (roCleanup) roCleanup();
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative halftone-bg overflow-hidden min-h-screen flex flex-col items-center justify-center pt-28 pb-0 touch-none"
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