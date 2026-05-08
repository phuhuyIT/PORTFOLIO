

import { Project, ExperienceItem } from "./portfolio.types";

/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * This file handles the loading of portfolio data. It prioritizes private data
 * from 'portfolio.private.ts' if it exists locally, but falls back to public
 * data for deployment (e.g., on Vercel) where the private file is ignored by Git.
 */

// 1. Define Public Data (Generic Version for GitHub/Public)
const publicPortfolioData = {
  // --- Identity ---
  name: import.meta.env.VITE_NAME || "John Doe",
  initials: import.meta.env.VITE_INITIALS || "JD",
  role: import.meta.env.VITE_ROLE || "Software Engineer",
  status: import.meta.env.VITE_STATUS || "Available for Work",
  email: import.meta.env.VITE_EMAIL || "hello@example.com",
  phone: import.meta.env.VITE_PHONE || "000-000-0000",
  location: import.meta.env.VITE_LOCATION || "City, Country",

  // --- Hero ---
  heroHeadline: [
    import.meta.env.VITE_HERO_HEADLINE_1 || "Building the Future.", 
    import.meta.env.VITE_HERO_HEADLINE_2 || "One Line at a Time."
  ],
  heroSubtitle: import.meta.env.VITE_HERO_SUBTITLE || "Generic software engineer with a passion for clean code and scalable architecture.",
  heroCta: import.meta.env.VITE_HERO_CTA || "Contact Me",

  // --- About ---
  aboutTitle: import.meta.env.VITE_ABOUT_TITLE || "About Me",
  aboutBody: [
    import.meta.env.VITE_ABOUT_BODY_1 || "I am a software engineer with experience in building web applications.",
    import.meta.env.VITE_ABOUT_BODY_2 || "I love solving complex problems and learning new technologies.",
  ],

  // --- Tech strip ---
  techStrip: ["React", "TypeScript", "Node.js", "Python", "Docker", "AWS"],

  // --- Projects ---
  projects: [
    {
      title: "Sample Project One",
      summary: "A brief description of a sample project to showcase your work.",
      tech: ["Tech A", "Tech B"],
      repoUrl: "https://github.com",
    },
    {
      title: "Sample Project Two",
      summary: "Another sample project showing different skills.",
      tech: ["Tech C", "Tech D"],
      repoUrl: "https://github.com",
    },
  ] satisfies Project[],

  // --- Experience ---
  experience: [
    {
      period: "2023 — Present",
      role: "Software Engineer",
      org: "Example Corp",
      type: "engineering",
      description: "Worked on various projects involving modern web technologies.",
    },
  ] satisfies ExperienceItem[],

  // --- Skills ---
  skills: {
    Languages: ["JavaScript", "Python"],
    Frameworks: ["React", "Express"],
    Tools: ["Git", "Docker"],
  },

  // --- Socials ---
  socials: {
    github: import.meta.env.VITE_GITHUB || "https://github.com",
    linkedin: import.meta.env.VITE_LINKEDIN || "https://linkedin.com",
    twitter: import.meta.env.VITE_TWITTER || "https://twitter.com",
  },
};

// 2. Safe Data Export
// import.meta.glob to optionally load private data without failing the build if it's missing.
const privateModules = import.meta.glob("./portfolio.private.ts", { eager: true });
const privatePortfolioData = (Object.values(privateModules)[0] as { privatePortfolioData?: typeof publicPortfolioData })?.privatePortfolioData;

export const portfolio = privatePortfolioData || publicPortfolioData;
