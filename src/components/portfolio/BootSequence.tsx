import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootText = [
    "AURORA PROTOCOL v2.1",
    "INITIALIZING NEURAL BRIDGE...",
    "LOADING SUBJECT PROFILE...",
    "██████████ 100%",
    "ACCESS GRANTED"
  ];

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
      
      <button 
        onClick={() => {
          setIsDone(true);
          setTimeout(onComplete, 500);
        }}
        className="absolute top-4 right-4 text-xs font-mono text-[#00FFD1]/60 hover:text-[#00FFD1] transition-colors"
      >
        [ SKIP INTRO ]
      </button>
    </div>
  );
};
