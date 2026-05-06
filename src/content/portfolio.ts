

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
  name: "John Doe",
  initials: "JD",
  role: "Software Engineer",
  status: "Available for Work",
  email: "hello@example.com",
  phone: "000-000-0000",
  location: "City, Country",

  // --- Hero ---
  heroHeadline: ["Building the Future.", "One Line at a Time."],
  heroSubtitle: "Generic software engineer with a passion for clean code and scalable architecture.",
  heroCta: "Contact Me",

  // --- About ---
  aboutTitle: "About Me",
  aboutBody: [
    "I am a software engineer with experience in building web applications.",
    "I love solving complex problems and learning new technologies.",
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
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

// 2. Safe Data Export
// import.meta.glob to optionally load private data without failing the build if it's missing.
const privateModules = import.meta.glob("./portfolio.private.ts", { eager: true });
const privatePortfolioData = (Object.values(privateModules)[0] as any)?.privatePortfolioData;

export const portfolio = privatePortfolioData || publicPortfolioData;
