import React, { useEffect, useState } from 'react';
import { toggleAudio, playSound, isAudioEnabled } from '@/lib/audio';
import { Volume2, Power } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
  onStart?: () => void;
}

const bootText = [
  "AURORA PROTOCOL v2.1",
  "INITIALIZING NEURAL BRIDGE...",
  "LOADING SUBJECT PROFILE...",
  "██████████ 100%",
  "ACCESS GRANTED"
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, onStart }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    await toggleAudio(true);
    setStarted(true);
    onStart?.();
  };

  useEffect(() => {
    // Try to autoplay if the browser allows (e.g. user refreshed or has high MEI)
    const tryAutoplay = async () => {
      await toggleAudio(true);
      if (isAudioEnabled()) {
        setStarted(true);
        onStart?.();
      }
    };
    tryAutoplay();
  }, [onStart]);

  useEffect(() => {
    if (!started) return;

    let currentLine = 0;
    
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootText[currentLine]]);
      
      // Increase pitch with each line
      playSound('boot_beep', 0.1 + (currentLine * 0.05));
      
      currentLine++;
      
      if (currentLine >= bootText.length) {
        clearInterval(interval);
        
        setTimeout(() => playSound('access_granted'), 200);

        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete, started]);

  if (!started) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020408] text-[#00FFD1] font-mono p-8">
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#00FFD1]/20 rounded-full blur-xl group-hover:bg-[#00FFD1]/40 transition-all duration-500 animate-pulse" />
          <button 
            onClick={handleStart}
            className="relative flex flex-col items-center gap-6 p-12 border border-[#00FFD1]/30 rounded-full bg-[#020408] hover:border-[#00FFD1] transition-all duration-300 group"
          >
            <div className="w-16 h-16 border-2 border-[#00FFD1]/50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-t-2 border-[#00FFD1] rounded-full animate-spin" />
              <Power className="w-8 h-8 text-[#00FFD1]" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm tracking-[0.3em] font-bold uppercase">Initialize System</span>
              <span className="text-[10px] text-[#00FFD1]/40 tracking-widest uppercase">Biometric Auth Required</span>
            </div>
          </button>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-40">
           <div className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
             <Volume2 className="w-3 h-3" />
             AUDIO_SYNC_ENABLED
           </div>
           <button 
              onClick={() => {
                setStarted(true);
                setIsDone(true);
                setTimeout(onComplete, 100);
              }}
              className="text-[9px] hover:text-[#00FFD1] transition-colors"
            >
              [ SKIP_SEQUENCE ]
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-center bg-[#020408] text-[#00FFD1] p-8 font-mono transition-opacity duration-700 ${isDone ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto w-full">
        {lines.map((line, i) => (
          <div key={i} className="mb-2 text-sm md:text-base">
            {'> '} {line}
          </div>
        ))}
        {!isDone && lines.length < bootText.length && (
          <div className="w-2 h-5 bg-[#00FFD1] inline-block animate-pulse mt-2"></div>
        )}
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono text-[#00FFD1] opacity-50">
          <Volume2 className="w-3 h-3" />
          [ AUDIO ACTIVE ]
        </div>

        <button 
          onClick={() => {
            setIsDone(true);
            setTimeout(onComplete, 500);
          }}
          className="text-[10px] font-mono text-[#00FFD1]/40 hover:text-[#00FFD1] transition-colors"
        >
          [ SKIP INTRO ]
        </button>
      </div>
    </div>
  );
};
