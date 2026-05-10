import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export type TierLevel = 'A' | 'B' | 'C' | 'D';

interface QualityConfig {
  particles: number;
  blur: number;
  shadows: boolean;
  enableThree: boolean;
  enableAudio: boolean;
  reducedMotion: boolean;
}

export const tierConfigs: Record<TierLevel, QualityConfig> = {
  A: { particles: 3000, blur: 20, shadows: true,  enableThree: true,  enableAudio: true,  reducedMotion: false },
  B: { particles: 1500, blur: 12, shadows: false, enableThree: true,  enableAudio: true,  reducedMotion: false },
  C: { particles: 0,    blur: 0,  shadows: false, enableThree: false, enableAudio: false, reducedMotion: false },
  D: { particles: 0,    blur: 0,  shadows: false, enableThree: false, enableAudio: false, reducedMotion: true  },
};

interface PerformanceContextType {
  tier: TierLevel;
  setTier: (tier: TierLevel) => void;
  config: QualityConfig;
}

export const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

function detectTier(): TierLevel {
  if (typeof window === 'undefined') return 'A';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return 'D';

  const gpu = (() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return '';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '';
  })();

  const isLowEnd =
    /Mali-4|Mali-T|Adreno [23]|PowerVR|Intel HD 3000/i.test(gpu) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

  if (isLowEnd) return 'C';
  
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return 'B';

  return 'A';
}

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [tier, setTierState] = useState<TierLevel>(() => detectTier());

  const setTier = useCallback((level: TierLevel) => {
    setTierState(level);
    document.documentElement.dataset.tier = level;
    console.log(`[Performance] Tier set to: ${level}`);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.tier = tier;
  }, [tier]);

  return (
    <PerformanceContext.Provider value={{ tier, setTier, config: tierConfigs[tier] }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
