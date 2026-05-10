

import { Project, ExperienceItem } from "./portfolio.types";

/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * This file handles the loading of portfolio data. It prioritizes private data
 * from 'portfolio.private.ts' if it exists locally, but falls back to public
 * data for deployment (e.g., on Vercel) where the private file is ignored by Git.
 */

// Helper to parse JSON from env or fallback
const parseEnvJson = <T>(key: string, fallback: T): T => {
  const val = import.meta.env[key];
  if (!val) return fallback;
  try {
    return JSON.parse(val) as T;
  } catch (e) {
    console.warn(`Failed to parse env var ${key}. Using fallback.`);
    return fallback;
  }
};

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
  heroHeadline: parseEnvJson('VITE_HERO_HEADLINE', ["Building the Future.", "One Line at a Time."]),
  heroSubtitle: import.meta.env.VITE_HERO_SUBTITLE || "Generic software engineer with a passion for clean code and scalable architecture.",
  heroCta: import.meta.env.VITE_HERO_CTA || "Contact Me",

  // --- About ---
  aboutTitle: import.meta.env.VITE_ABOUT_TITLE || "About Me",
  aboutBody: parseEnvJson('VITE_ABOUT_BODY', [
    "I am a software engineer with experience in building web applications.",
    "I love solving complex problems and learning new technologies.",
  ]),

  // --- Tech strip ---
  techStrip: parseEnvJson('VITE_TECH_STRIP', ["React", "TypeScript", "Node.js", "Python", "Docker", "AWS"]),

  // --- Projects ---
  projects: parseEnvJson('VITE_PROJECTS', [
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
  ]) as Project[],

  // --- Experience ---
  experience: parseEnvJson('VITE_EXPERIENCE', [
    {
      period: "2023 — Present",
      role: "Software Engineer",
      org: "Example Corp",
      type: "engineering",
      description: "Worked on various projects involving modern web technologies.",
    },
  ]) as ExperienceItem[],

  // --- Skills ---
  skills: parseEnvJson('VITE_SKILLS', {
    Languages: ["JavaScript", "Python"],
    Frameworks: ["React", "Express"],
    Tools: ["Git", "Docker"],
  }),

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
