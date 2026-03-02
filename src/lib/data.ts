export type ProjectType = "Web" | "Mobile" | "Data";

export interface Profile {
  name: string;
  roles: string[];
  location: string;
  summary: string;
}

export interface TechGroup {
  title: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: ProjectType;
  github: string;
  live: string;
}

export interface Experience {
  company: string;
  role: string;
  year: string;
  location: string;
  details: string;
}

export interface Recommendation {
  quote: string;
  person: string;
  title: string;
}

export const profile: Profile = {
  name: "Christian Faith Mestola",
  roles: ["Web Developer", "Frontend Developer", "UI/UX Designer"],
  location: "Tagum Davao Del Norte, Philippines",
  summary:
    "I design and build fast, accessible interfaces for product teams that care about clarity and craft.",
};

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "Vue", "Tailwind CSS", "Quasar", "Bootsrap"],
  },
  {
    title: "Backend",
    items: ["Python", "Django", "PostgreSQL", "REST APIs", "Laravel", "PHP"],
  },
  {
    title: "Tools",
    items: ["GitHub Actions", "Vercel", "Docker", "Figma", "Azure"],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Dentatrack",
    description:
      "A smart recovery system that transforms dental post-operative care with automation and predictive analytics.",
    tags: ["Bootstrap", "Django", "PostgreSQL"],
    type: "Web",
    github: "https://example.com/nimbus-board-code",
    live: "https://jimenezdentalclinic.com",
  },
  {
    id: 2,
    title: "LMS-leave Monitoring",
    description:
      "A digital leave monitoring system designed to streamline employee leave requests and improve record management for Tagum City Hall.",
    tags: ["Quasar","Vue","Laravel", "Msql"],
    type: "Web",
    github: "https://example.com/pocket-planner-code",
    live: "",
  },
  {
    id: 3,
    title: "Zapchat",
    description:
      "A data storytelling surface that turns weekly metrics into digestible trend summaries.",
    tags: ["vue", "Qusar", "Laravel" , "PostgreSQL"],
    type: "Web",
    github: "https://example.com/insight-stream-code",
    live: "",
  },

];

export const experience: Experience[] = [
  {
    company: "City Goverment of Tagum",
    role: "Web Developer Intern ",
    year: "Present",
    location: "onsite",
    details:
      "Leading design system adoption, performance budgets, and interaction quality across multiple product surfaces.",
  },
  {
    company: "Northgrid Labs",
    role: "Frontend Engineer",
    year: "2021 - 2024",
    location: "Placeholder City",
    details:
      "Built and maintained customer-facing dashboards, reusable form workflows, and accessibility-first component patterns.",
  },
  {
    company: "Davao Del Norte State College.",
    role: "Bachelor of Science in Information Technology",
    year: "2022 - present",
    location: "Panbo City, Davao del Norte",
    details:
      "Delivered marketing pages, analytics integration, and CMS-driven sections with a strong focus on consistency.",
  },
];

export const recommendations: Recommendation[] = [
  {
    quote:
      "Jordan has a rare ability to simplify complex product ideas into interfaces people understand instantly.",
    person: "Riley Chen",
    title: "Product Lead, Placeholder Inc.",
  },
  {
    quote:
      "Their frontend execution is reliable, detail-oriented, and consistently ahead of timeline estimates.",
    person: "Taylor Moss",
    title: "Engineering Manager, Sample Labs",
  },
  {
    quote:
      "From concept to shipped features, Jordan keeps quality high without slowing momentum.",
    person: "Avery Quinn",
    title: "Founder, Demo Ventures",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/CHRISTIANMESTOLA",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-faith-mestola",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/christianfaithmestola",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/christianfaithmestola",
  }
];

export const currentlyLearning = [
  "Advanced React Patterns",
  "Next.js Performance Optimization",
  "TypeScript Best Practices",
  "UI Motion and Micro-interactions",
];
