type Props = {
  index: string;
  title: string;
  kicker?: string;
};

export const SectionHeader = ({ index, title, kicker }: Props) => (
  <div className="flex items-end justify-between mb-12 border-b border-foreground/15 pb-4">
    <div className="flex items-baseline gap-4">
      <span className="text-accent font-mono text-sm">{index}</span>
      <h2 className="font-display text-4xl md:text-6xl">{title}</h2>
    </div>
    {kicker && (
      <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {kicker}
      </span>
    )}
  </div>
);