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

export const Projects = () => {
  return (
    <section id="projects" className="container mx-auto px-6 py-24 md:py-32 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader index="03" label="MISSION_LOGS" title="DEPLOYED OPERATIONS" />
        <div className="font-mono text-[10px] text-[#00FFD1] bg-[#00FFD1]/10 px-4 py-2 border border-[#00FFD1]/30 self-start md:self-auto">
          [ {portfolio.projects.length.toString().padStart(3, '0')} MISSIONS LOGGED ]
        </div>
      </div>

      <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x snap-mandatory">
        {portfolio.projects.map((p, i) => (
          <Sheet key={i}>
            <SheetTrigger asChild>
              <article className="min-w-[300px] md:min-w-[400px] sci-fi-card p-6 flex flex-col gap-4 cursor-pointer snap-center group">
                <div className="flex justify-between items-start font-mono text-[10px] text-[#00FFD1]/60">
                  <span>MISSION-{(i + 1).toString().padStart(3, '0')}</span>
                  <span className="group-hover:text-[#00FFD1] transition-colors">[ DETAILS ]</span>
                </div>
                
                <div className="aspect-video bg-[#0D1B2A] relative overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border border-[#00FFD1]/10">
                      <div className="w-12 h-12 border border-[#00FFD1]/20 rounded-full animate-pulse" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-[#00FFD1] transition-colors">{p.title}</h3>
                    <ArrowUpRight className="size-4 text-[#00FFD1] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </div>
                  <div className="w-full h-[1px] bg-white/10" />
                  <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[9px] text-[#7B61FF] bg-[#7B61FF]/10 px-2 py-0.5 border border-[#7B61FF]/20">
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
            </SheetTrigger>

            <SheetContent className="bg-[#020408] border-l border-[#00FFD1]/20 text-white w-full sm:max-w-xl overflow-y-auto">
              <SheetHeader className="space-y-4 pt-10">
                <div className="font-mono text-[10px] text-[#00FFD1]/60">// MISSION_BRIEFING</div>
                <SheetTitle className="font-orbitron text-3xl text-white uppercase tracking-tight">{p.title}</SheetTitle>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-[#7B61FF] bg-[#7B61FF]/10 px-3 py-1 border border-[#7B61FF]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </SheetHeader>

              <div className="mt-12 space-y-12 pb-12">
                <div className="aspect-video bg-[#0D1B2A] border border-[#00FFD1]/20 relative overflow-hidden">
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
                      className="flex items-center justify-center gap-2 font-mono text-xs bg-[#00FFD1] text-[#020408] py-4 hover:bg-[#00FFD1]/90 transition-all"
                    >
                      ACCESS_LIVE_NODE <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 font-mono text-xs border border-white/20 text-white py-4 hover:bg-white/5 transition-all"
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
