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
