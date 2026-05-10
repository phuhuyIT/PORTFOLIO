import { useState, useEffect } from "react";
import { playSound } from "@/lib/audio";

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

  const playClick = () => {
    playSound('boot_beep', 0.2);
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
