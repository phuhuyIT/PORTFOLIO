import React from 'react';

type Props = {
  index: string;
  label: string;
  title: string;
};

export const SectionHeader = ({ index, label, title }: Props) => (
  <div className="mb-12 space-y-2">
    <div className="font-mono text-[#00FFD1]/60 text-[10px] tracking-[0.3em]">
      // {index} · {label}
    </div>
    <h2 className="font-orbitron text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
      {title}
    </h2>
    <div className="w-12 h-1 bg-[#00FFD1]" />
  </div>
);
