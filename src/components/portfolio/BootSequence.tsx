import React, { useEffect, useState } from 'react';
import { resumeAudioContext } from '@/lib/audio';
import { Volume2, VolumeX } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootText = [
  "AURORA PROTOCOL v2.1",
  "INITIALIZING NEURAL BRIDGE...",
  "LOADING SUBJECT PROFILE...",
  "██████████ 100%",
  "ACCESS GRANTED"
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleEnableAudio = async () => {
    await resumeAudioContext();
    setAudioEnabled(true);
  };

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootText[currentLine]]);
      currentLine++;
      
      if (currentLine >= bootText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

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
        {!audioEnabled ? (
          <button 
            onClick={handleEnableAudio}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#00FFD1]/30 rounded-sm text-[10px] font-mono text-[#00FFD1]/60 hover:text-[#00FFD1] hover:border-[#00FFD1] transition-all bg-[#00FFD1]/5"
          >
            <VolumeX className="w-3 h-3" />
            [ ENABLE AUDIO ]
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono text-[#00FFD1] opacity-50">
            <Volume2 className="w-3 h-3" />
            [ AUDIO ACTIVE ]
          </div>
        )}

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
