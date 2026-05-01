import { portfolio } from "@/content/portfolio";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export const Nav = () => {
  return (
    <nav className="fixed top-6 inset-x-0 z-50 px-6">
      <div className="container max-w-5xl mx-auto liquid-glass rounded-full px-6 py-3 flex items-center justify-between">
        <a href="/" className="font-mono font-bold text-lg tracking-tight hover:text-accent transition-colors">
          {portfolio.initials}
          <sup className="text-[0.55em] ml-0.5 align-super opacity-50">SYS</sup>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-block transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="pill text-xs !py-2 !px-4"
        >
          {portfolio.heroCta}
        </a>
      </div>
    </nav>
  );
};