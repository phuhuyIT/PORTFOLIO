import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  index: number;
  project: {
    title: string;
    summary: string;
    tech: string[];
    image?: string;
  };
}

export const ProjectCard = ({ index, project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isScanning, setIsScanning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setShine({ x, y });
  };

  const handleMouseLeave = () => {
    setShine({ x: 50, y: 50 });
  };

  const handleClick = (e: React.MouseEvent) => {
    // Scan pulse effect before opening
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Here would be the logic to open the drawer/modal
    }, 600);
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="min-w-[300px] md:min-w-[400px] glass-panel p-6 flex flex-col gap-4 cursor-pointer snap-center group transition-all duration-300 ease-out relative"
      style={{ 
        "--spot-x": `${shine.x}%`,
        "--spot-y": `${shine.y}%`
      } as React.CSSProperties}
    >
      {/* Tracked Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(0, 255, 209, 0.07) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 65%)`
        }}
      />

      {/* Click Scan Pulse */}
      {isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-inherit">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-aurora-1 shadow-[0_0_15px_rgba(0,255,209,0.8)] animate-scan-pulse" />
        </div>
      )}

      <div className="flex justify-between items-start font-mono text-[10px] text-[#00FFD1]/60">
        <span>MISSION-{(index + 1).toString().padStart(3, '0')}</span>
        <span className="group-hover:text-[#00FFD1] transition-colors">[ DETAILS ]</span>
      </div>
      
      <div className="aspect-video bg-[#0D1B2A] relative overflow-hidden rounded-md border border-white/5">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-[#00FFD1]/10">
            <div className="w-12 h-12 border border-[#00FFD1]/20 rounded-full animate-pulse" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
        
        {/* Scan line sweep on hover */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,209,0)_50%,rgba(0,255,209,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:animate-scanline" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-[#00FFD1] transition-colors">{project.title}</h3>
          <ArrowUpRight className="size-4 text-[#00FFD1] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
        </div>
        <div className="w-full h-[1px] bg-white/10" />
        <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="skill-chip">
              {t}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center font-mono text-[9px]">
          <span className="text-white/30">STATUS:</span>
          <span className="text-[#00FFD1]">[ DEPLOYED ]</span>
        </div>
      </div>
    </article>
  );
};
