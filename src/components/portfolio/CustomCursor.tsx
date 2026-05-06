import React, { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "btn" | "card" | "text">("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .magnetic, .btn-charge')) {
        setCursorType("btn");
      } else if (target.closest('.project-card, .sci-fi-card')) {
        setCursorType("card");
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, li, span:not(.skill-chip)')) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;
    const animateOuter = () => {
      setOuterPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12
      }));
      animationId = requestAnimationFrame(animateOuter);
    };
    animationId = requestAnimationFrame(animateOuter);
    return () => cancelAnimationFrame(animationId);
  }, [position]);

  return (
    <>
      <div 
        className={`cursor-ring ${
          cursorType === "btn" ? "hovering-btn" : 
          cursorType === "card" ? "hovering-card" : 
          cursorType === "text" ? "hovering-text" : ""
        }`}
        style={{ left: `${outerPosition.x}px`, top: `${outerPosition.y}px` }}
      >
        {cursorType === "card" && (
          <span className="cursor-text text-[8px] font-mono text-aurora-1 absolute inset-0 flex items-center justify-center opacity-0 animate-fade-in whitespace-nowrap">
            [ OPEN ]
          </span>
        )}
      </div>
      <div 
        className="cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};
