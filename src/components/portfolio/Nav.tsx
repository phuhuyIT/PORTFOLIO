import { portfolio } from "@/content/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-5">
        <a href="#top" className="font-display text-xl tracking-tight">
          {portfolio.initials}
          <sup className="text-[0.55em] ml-0.5 align-super">®</sup>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-block transition-colors hover:text-accent
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                  after:w-full after:scale-x-0 after:origin-right after:bg-accent
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100 hover:after:origin-left"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="pill bg-primary text-primary-foreground text-sm hover:bg-accent hover:text-accent-foreground"
        >
          Get In Touch
        </a>
      </div>
    </nav>
  );
};