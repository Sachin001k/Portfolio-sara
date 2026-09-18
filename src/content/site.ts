// Placeholder content for Sara's portfolio. Edit the values below —
// nothing else in the codebase needs to change to update the site's text.

export const siteConfig = {
  name: "Sara",
  pronouns: "she/her",
  tags: ["storyteller", "changemaker", "creative visionary"],
  heroIntro:
    "I'm Sara — a [add a one-line description of what you do, e.g. student, designer, organizer] passionate about [add your focus area].",
  location: "City, Country",
  resumeUrl: "#",
  email: "hello@example.com",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    youtube: "https://youtube.com/",
  },
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "Add a few sentences here introducing yourself — where you're from, what you're currently doing (school, work, projects), and what drives you.",
    "Add a second paragraph about the causes, crafts, or communities you care about most, and what you're hoping to create or change.",
  ],
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Role Title",
    org: "Organization Name",
    period: "2024 — Present",
    description:
      "Add a short description of what you did in this role and what you achieved.",
  },
  {
    role: "Role Title",
    org: "Organization Name",
    period: "2023 — 2024",
    description:
      "Add a short description of what you did in this role and what you achieved.",
  },
  {
    role: "Role Title",
    org: "Organization Name",
    period: "2022 — 2023",
    description:
      "Add a short description of what you did in this role and what you achieved.",
  },
];

export type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  link?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Project or Initiative Name",
    tag: "Community",
    description:
      "Add a short description of this project — what it is, who it's for, and the impact it had.",
    link: "#",
  },
  {
    title: "Project or Initiative Name",
    tag: "Creative",
    description:
      "Add a short description of this project — what it is, who it's for, and the impact it had.",
    link: "#",
  },
  {
    title: "Project or Initiative Name",
    tag: "Research",
    description:
      "Add a short description of this project — what it is, who it's for, and the impact it had.",
    link: "#",
  },
];

export type MediaItem = {
  outlet: string;
  title: string;
  url: string;
};

export const media: MediaItem[] = [
  {
    outlet: "Publication Name",
    title: "Add the title of the feature or interview",
    url: "#",
  },
  {
    outlet: "Publication Name",
    title: "Add the title of the feature or interview",
    url: "#",
  },
  {
    outlet: "Publication Name",
    title: "Add the title of the feature or interview",
    url: "#",
  },
];
