import { useState, useEffect } from "react";

export const LiquidGlassFilter = () => {
  const [filterSeed, setFilterSeed] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilterSeed(prev => (prev % 100) + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg style={{ display: 'none' }}>
      <defs>
        <filter id="liquid-glass">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed={filterSeed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
};
