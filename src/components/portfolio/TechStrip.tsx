import { portfolio } from "@/content/portfolio";

export const TechStrip = () => {
  const items = [...portfolio.techStrip, ...portfolio.techStrip];
  return (
    <section className="border-y border-foreground/10 py-8 overflow-hidden bg-background">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
        Built with
      </p>
      <div className="relative">
        <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform">
          {items.map((t, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-4xl text-foreground/80 hover:text-accent transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};