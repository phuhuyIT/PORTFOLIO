import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  startDelay?: number;
}

export const Typewriter = ({ 
  text, 
  delay = 30, 
  onComplete, 
  className = "",
  startDelay = 0 
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  const playClick = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtx.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        playClick();
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete, isStarted]);

  return <span className={className}>{displayedText}</span>;
};
