import { ArrowUpRight, Github } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";

export const Projects = () => (
  <section id="work" className="container mx-auto px-4 py-24 md:py-32">
    <SectionHeader index="02" title="Selected Work" kicker="Things I've shipped" />
    <div className="grid md:grid-cols-2 gap-6">
      {portfolio.projects.map((p, i) => (
        <article
          key={i}
          className="group relative liquid-glass p-8 rounded-[2rem] hover:border-accent/40 transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-display text-3xl md:text-4xl group-hover:text-accent transition-colors">
              {p.title}
            </h3>
            <span className="font-mono text-xs text-muted-foreground pt-2">
              0{i + 1}
            </span>
          </div>
          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
            {p.summary}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-xs uppercase tracking-wider px-3 py-1 border border-foreground/20 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors"
              >
                Live Demo <ArrowUpRight className="size-4" />
              </a>
            )}
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="size-4" /> Code
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
);