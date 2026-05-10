
let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  return sharedAudioCtx;
};

export const initAudioContext = () => {
  if (typeof window === "undefined") return null;
  
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  return sharedAudioCtx;
};

export const resumeAudioContext = async () => {
  const ctx = initAudioContext();
  if (ctx && ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (e) {
      // Ignore errors if called without user gesture
    }
  }
  return ctx;
};
