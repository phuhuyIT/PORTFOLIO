import { Shield, Code2 } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";

export const Experience = () => (
  <section id="experience" className="container mx-auto px-4 py-24 md:py-32">
    <SectionHeader index="03" title="Experience" kicker="Code & duty" />
    <ol className="relative border-l border-foreground/20 ml-3 md:ml-6 space-y-12">
      {portfolio.experience.map((e, i) => {
        const Icon = e.type === "military" ? Shield : Code2;
        return (
          <li key={i} className="pl-8 md:pl-12 relative">
            <span
              className={`absolute -left-[17px] top-1 grid place-items-center size-8 rounded-full border ${
                e.type === "military"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground/40"
              }`}
            >
              <Icon className="size-4" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
              <span className="font-mono text-sm text-accent">{e.period}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {e.type === "military" ? "Service" : "Engineering"}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl">{e.role}</h3>
            <p className="text-muted-foreground mt-1 mb-2">{e.org}</p>
            <p className="text-base leading-relaxed max-w-2xl">{e.description}</p>
          </li>
        );
      })}
    </ol>
  </section>
);