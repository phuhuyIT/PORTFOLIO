export type TierLevel = 'A' | 'B' | 'C' | 'D';

export interface QualityConfig {
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
