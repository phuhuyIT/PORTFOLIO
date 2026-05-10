import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { resumeAudioContext } from "@/lib/audio";

interface SciFiIntroProps {
  onComplete: () => void;
}

export const SciFiIntro = ({ onComplete }: SciFiIntroProps) => {
  const [status, setStatus] = useState<"idle" | "booting" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const playSciFiSound = async () => {
    const ctx = await resumeAudioContext();
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 2);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 2);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.5);
  };

  const startBootSequence = () => {
    setStatus("booting");
    playSciFiSound();

    const start = performance.now();
    const duration = 2500;

    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setStatus("complete");
          setTimeout(onComplete, 500);
        }, 500);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${
        status === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      </div>

      <div className="relative z-20 flex flex-col items-center space-y-8 max-w-md w-full px-6">
        <div className={`transition-all duration-700 ${status === "idle" ? "scale-100" : "scale-110 blur-sm opacity-50"}`}>
          <div className="w-20 h-20 border-2 border-green-500/30 rounded-full flex items-center justify-center relative">
             <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin" />
             <Terminal className="text-green-500 w-8 h-8" />
          </div>
        </div>

        {status === "idle" ? (
          <button
            onClick={startBootSequence}
            className="group relative px-8 py-3 bg-transparent border border-green-500/50 text-green-500 font-mono text-sm tracking-[0.2em] uppercase hover:bg-green-500/10 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Initialize System</span>
            <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        ) : (
          <div className="w-full space-y-4 font-mono text-xs tracking-widest text-green-500/70 uppercase">
            <div className="flex justify-between">
              <span>Syncing Neural Link...</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-[2px] w-full bg-green-500/10 overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="h-4 overflow-hidden">
                <div className="animate-pulse">
                    {progress > 0.3 && "> Loading Core Modules..."}
                    {progress > 0.6 && " OK"}
                </div>
                <div className="animate-pulse">
                    {progress > 0.8 && "> Calibrating Haptic Interface..."}
                    {progress > 0.95 && " OK"}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
