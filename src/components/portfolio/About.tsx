import { portfolio } from "@/content/portfolio";
import { SectionHeader } from "./SectionHeader";

export const About = () => (
  <section id="about" className="container mx-auto px-4 py-24 md:py-32">
    <SectionHeader index="01" title="About" kicker="The person behind the code" />
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-7 space-y-6">
        {portfolio.aboutBody.map((p, i) => (
          <p key={i} className="text-xl md:text-2xl leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <div className="md:col-span-5">
        <div className="aspect-[4/5] liquid-glass border border-foreground/10 relative overflow-hidden rounded-3xl">
          <div className="grain absolute inset-0" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[10rem] text-foreground/30 leading-none">
              {portfolio.initials}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs uppercase tracking-widest">
            <span>{portfolio.role}</span>
            <span className="text-accent">●</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);