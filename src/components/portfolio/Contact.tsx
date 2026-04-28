import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { portfolio } from "@/content/portfolio";

export const Contact = () => (
  <section
    id="contact"
    className="relative halftone-bg overflow-hidden border-t border-foreground/15"
  >
    <div className="grain absolute inset-0" aria-hidden />
    <div className="container mx-auto px-4 py-24 md:py-40 relative z-10 text-center">
      <p className="text-accent font-mono text-sm mb-4">05 — Contact</p>
      <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95]">
        Let's build <br />
        <span className="text-accent">something.</span>
      </h2>
      <a
        href={`mailto:${portfolio.email}`}
        className="inline-flex items-center gap-2 mt-10 pill bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
      >
        {portfolio.email} <ArrowUpRight className="size-4" />
      </a>

      <div className="flex items-center justify-center gap-4 mt-12">
        {portfolio.socials.github && (
          <a
            href={portfolio.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="size-11 grid place-items-center rounded-full border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
          >
            <Github className="size-5" />
          </a>
        )}
        {portfolio.socials.linkedin && (
          <a
            href={portfolio.socials.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="size-11 grid place-items-center rounded-full border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
          >
            <Linkedin className="size-5" />
          </a>
        )}
        {portfolio.socials.twitter && (
          <a
            href={portfolio.socials.twitter}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Twitter"
            className="size-11 grid place-items-center rounded-full border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
          >
            <Twitter className="size-5" />
          </a>
        )}
      </div>

      <footer className="mt-20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {portfolio.name}
        </span>
        <span>{portfolio.status}</span>
      </footer>
    </div>
  </section>
);