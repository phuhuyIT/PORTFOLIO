// ============================================================
//  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
//  Everything on the site reads from this single config.
// ============================================================

export type Project = {
  title: string;
  summary: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string; // optional path or URL
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  type: "engineering" | "military";
  description: string;
};

export const portfolio = {
  // --- Identity ---
  name: "Your Name",
  initials: "YN",
  role: "Software Engineer",
  status: "Currently Serving in the Military",
  email: "you@example.com",

  // --- Hero ---
  heroHeadline: ["Bold Code.", "Disciplined Mind."],
  heroSubtitle:
    "Software engineer by craft, soldier by service. I build resilient systems and ship ideas that matter.",
  heroCta: "Get In Touch",

  // --- About ---
  aboutTitle: "About",
  aboutBody: [
    "I'm a software engineer currently serving in the military. By day I write code, by duty I serve. The discipline of one feeds the other.",
    "I love systems thinking — backends that don't break, interfaces that disappear, and tools that respect the people who use them.",
  ],

  // --- Tech strip (logos as text — bold display font) ---
  techStrip: [
    "React", "TypeScript", "Node.js", "Python", "Go",
    "Docker", "PostgreSQL", "AWS", "Linux", "Kubernetes",
  ],

  // --- Projects ---
  projects: [
    {
      title: "Project One",
      summary: "A real-time collaborative tool that handles 10k concurrent users with sub-100ms latency.",
      tech: ["React", "WebSocket", "Redis", "Node"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      title: "Project Two",
      summary: "Open-source CLI for automating deployment pipelines. 1.2k stars on GitHub.",
      tech: ["Go", "Docker", "CI/CD"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
    },
    {
      title: "Project Three",
      summary: "Computer-vision app for field logistics built during service. Runs offline on rugged hardware.",
      tech: ["Python", "OpenCV", "ONNX", "Rust"],
      liveUrl: "https://example.com",
    },
    {
      title: "Project Four",
      summary: "Personal finance dashboard with end-to-end encryption and zero third-party tracking.",
      tech: ["Next.js", "Postgres", "WebCrypto"],
      repoUrl: "https://github.com",
    },
  ] satisfies Project[],

  // --- Experience timeline (newest first) ---
  experience: [
    {
      period: "2024 — Now",
      role: "Software Engineer (Reservist) ",
      org: "Armed Forces · Tech Unit",
      type: "military",
      description:
        "Building mission-critical internal tools. Operate under classified scope.",
    },
    {
      period: "2022 — 2024",
      role: "Senior Full-Stack Engineer",
      org: "Tech Company",
      type: "engineering",
      description:
        "Led front-end platform team of 4. Shipped a design system used across 12 products.",
    },
    {
      period: "2020 — 2022",
      role: "Active Duty — Communications & Systems",
      org: "Armed Forces",
      type: "military",
      description:
        "Maintained mission-critical comms infrastructure. Earned commendation for reliability work.",
    },
    {
      period: "2018 — 2020",
      role: "Software Engineer",
      org: "Startup",
      type: "engineering",
      description:
        "Founding engineer. Built the MVP, scaled it to first paying customers.",
    },
  ] satisfies ExperienceItem[],

  // --- Skills ---
  skills: {
    Languages: ["TypeScript", "Python", "Go", "Rust", "C", "SQL"],
    Frameworks: ["React", "Next.js", "Node.js", "FastAPI", "Express"],
    Tools: ["Docker", "Git", "Linux", "Vim", "Figma"],
    Platforms: ["AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis"],
  } as Record<string, string[]>,

  // --- Socials ---
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};