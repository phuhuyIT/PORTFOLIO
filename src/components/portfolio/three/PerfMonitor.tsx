import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { Html } from '@react-three/drei';
import * as Tone from 'tone';

export const PerfMonitor = () => {
  const { gl } = useThree();
  const { tier, setTier } = usePerformance();
  
  const stats = useRef({
    fps: 0,
    drawCalls: 0,
    triangles: 0,
  });

  const frames = useRef(0);
  const lastTime = useRef(performance.now());
  const [displayStats, setDisplayStats] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Automatic quality downgrade logic (A -> B -> C)
      if (stats.current.fps > 0) {
        if (stats.current.fps < 45 && tier === 'A') {
          setTier('B');
        } else if (stats.current.fps < 30 && tier === 'B') {
          setTier('C');
        }
      }

      if (import.meta.env.DEV) {
        setDisplayStats(
          `FPS: ${stats.current.fps} | Draws: ${stats.current.drawCalls} | Tris: ${stats.current.triangles} | Audio: ${Tone.getContext() ? Tone.getContext().state : 'N/A'} | Tier: ${tier}`
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [tier, setTier]);

  useFrame(() => {
    // FPS measurement
    frames.current++;
    const now = performance.now();
    if (now - lastTime.current >= 1000) {
      stats.current.fps = frames.current;
      frames.current = 0;
      lastTime.current = now;
    }

    // Three.js info
    stats.current.drawCalls = gl.info.render.calls;
    stats.current.triangles = gl.info.render.triangles;
  });

  if (!import.meta.env.DEV) return null;

  return (
    <Html 
      fullscreen 
      pointerEvents="none" 
      zIndexRange={[9999, 10000]}
    >
      <div 
        className="fixed top-2 left-2 bg-black/80 text-[#00FFD1] font-mono text-[9px] px-2 py-1 border border-[#00FFD1]/30"
      >
        {displayStats}
      </div>
    </Html>
  );
};
