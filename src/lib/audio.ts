
let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  return sharedAudioCtx;
};

export const initAudioContext = () => {
  if (typeof window === "undefined") return null;
  
  if (!sharedAudioCtx) {
    try {
      const AudioContextClass = window.AudioContext || (window as (typeof window & { webkitAudioContext?: typeof AudioContext })).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    } catch (e) {
      console.warn("AudioContext could not be initialized:", e);
    }
  }
  return sharedAudioCtx;
};

export const resumeAudioContext = async () => {
  if (typeof window === "undefined") return null;
  
  // Only initialize if we are likely in a user gesture or already have it
  const ctx = initAudioContext();
  
  if (ctx && ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (e) {
      // This is expected if called without user gesture
    }
  }
  return ctx;
};
