// ============================================================
//  PUBLIC PORTFOLIO CONFIG (Generic Version)
//  This version is visible on GitHub. 
//  To use your private data locally, see the instructions below.
// ============================================================

export type Project = {
  title: string;
  summary: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  type: "engineering" | "military";
  description: string;
};

// 1. To use your private data locally:
//    Uncomment the import below and the 'portfolio' export at the bottom.
// import { privatePortfolioData } from "./portfolio.private";

export const portfolio = {
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

// 2. Uncomment this to use private data:
// export const portfolio = privatePortfolioData;
