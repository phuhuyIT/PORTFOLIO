import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";

export const Skills = () => (
  <section id="skills" className="container mx-auto px-4 py-24 md:py-32">
    <SectionHeader index="04" title="Skills" kicker="Tools of the trade" />
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
      {Object.entries(portfolio.skills).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">
            {cat}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((s) => (
              <span
                key={s}
                className="px-4 py-2 border border-foreground/20 rounded-full text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);