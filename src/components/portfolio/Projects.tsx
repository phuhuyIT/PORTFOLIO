import React from "react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { ArrowUpRight, Github } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { playSound } from "@/lib/audio";

export const Projects = () => {
  const projects = portfolio.projects || [];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      playSound('card_close');
    }
  };
  
  return (
    <section id="projects" className="container mx-auto px-6 py-24 md:py-32 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader index="03" label="MISSION_LOGS" title="DEPLOYED OPERATIONS" />
        <div className="font-mono text-[10px] text-[#00FFD1] bg-[#00FFD1]/10 px-4 py-2 border border-[#00FFD1]/30 self-start md:self-auto glass-panel">
          [ {projects.length.toString().padStart(3, '0')} MISSIONS LOGGED ]
        </div>
      </div>

      <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x snap-mandatory">
        {projects.map((p, i) => (
          <Sheet key={i} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
              <div>
                <ProjectCard index={i} project={p} />
              </div>
            </SheetTrigger>

            <SheetContent className="glass-sheet border-l border-[#00FFD1]/20 text-white w-full sm:max-w-xl overflow-y-auto">
              <SheetHeader className="space-y-4 pt-10">
                <div className="font-mono text-[10px] text-[#00FFD1]/60">// MISSION_BRIEFING</div>
                <SheetTitle className="font-orbitron text-3xl text-white uppercase tracking-tight">{p.title}</SheetTitle>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="skill-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </SheetHeader>

              <div className="mt-12 space-y-12 pb-12">
                <div className="aspect-video bg-[#0D1B2A] border border-[#00FFD1]/20 relative overflow-hidden rounded-lg">
                   {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-[10px] text-white/20">VISUAL_FEED_NOT_AVAILABLE</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0)_50%,rgba(0,255,209,0.05)_50%)] bg-[length:100%_4px]" />
                </div>

                <div className="space-y-6">
                  <h4 className="font-mono text-xs text-[#00FFD1] border-b border-[#00FFD1]/20 pb-2">LOG_ENTRY</h4>
                  <p className="text-white/70 leading-relaxed italic font-serif text-lg">
                    {p.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playSound('ui_hover')}
                      onClick={() => playSound('ui_click')}
                      className="flex items-center justify-center gap-2 font-mono text-xs bg-[#00FFD1] text-[#020408] py-4 hover:bg-[#00FFD1]/90 transition-all magnetic"
                    >
                      ACCESS_LIVE_NODE <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playSound('ui_hover')}
                      onClick={() => playSound('ui_click')}
                      className="flex items-center justify-center gap-2 font-mono text-xs border border-white/20 text-white py-4 hover:bg-white/5 transition-all magnetic"
                    >
                      <Github className="size-4" /> REPOSITORY
                    </a>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </section>
  );
};
