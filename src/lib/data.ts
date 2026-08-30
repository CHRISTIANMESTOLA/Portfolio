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

export type SocialPlatform = "github" | "linkedin" | "instagram" | "facebook" | "whatsapp" | "telegram";

export interface SocialLink {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export const profile: Profile = {
  name: "Christian Faith Mestola",
  roles: ["Fullstack Web Developer", "Frontend Developer", "UI/UX Designer"],
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
  title: "Shepherd",
  description:
    "A modern Bible companion app that makes Scripture study more personal through verse-based notes, Bible search, daily verses, devotionals, and personalized study tools.",
  tags: ["React Native", "Expo", "Bible API", "Sqlite"],
  type: "Mobile",
  github: "https://github.com/yourusername/shepherd",
  live: "https://shepherd-web-psi.vercel.app/",
},
  {
    id: 2,
    title: "Dentatrack",
    description:
      "A smart recovery system that transforms dental post-operative care with automation and predictive analytics.",
    tags: ["Bootstrap", "Django", "PostgreSQL"],
    type: "Web",
    github: "https://example.com/nimbus-board-code",
    live: "https://jimenezdentalclinic.com",
  },
  {
    id: 3,
    title: "LMS-leave Monitoring",
    description:
      "A digital leave monitoring system designed to streamline employee leave requests and improve record management for Tagum City Hall.",
    tags: ["Quasar","Vue","Laravel", "MSsql"],
    type: "Web",
    github: "https://example.com/pocket-planner-code",
    live: "http://lms.tagum/login",
  },
  {
  id: 4,
  title: "Tagum Youth Information System",
  description:
    "A centralized youth management platform designed to streamline youth registration, validation, events, announcements, scholarships, facility bookings, and youth participation tracking.",
  tags: ["Vue.js", "Quasar", "Laravel", "MSsql"],
  type: "Web",
  github: "https://github.com/yourusername/tagum-youth-information-system",
  live: "",
},
  {
    id: 5,
    title: "Zapchat",
    description:
      "ZapChat is your go-to instant messaging platform that makes conversations quick, easy, and fun. With lightning-fast responses and a clean interface, staying connected has never been simpler.",
    tags: ["vue", "Qusar", "Laravel" , "PostgreSQL"],
    type: "Web",
    github: "https://example.com/insight-stream-code",
    live: "",
  },

];

export const experience: Experience[] = [
    {
    company: "City Goverment of Tagum",
    role: "Fullstack Developer",
    year: "2026 - Present",
    location: "Tagum Davao del Norte",
    details:
      "Leading design system adoption, performance budgets, and interaction quality across multiple product surfaces.",
  },
  {
    company: "City Goverment of Tagum",
    role: "Web Developer Intern ",
    year: "2026",
    location: "Tagum Davao del Norte",
    details:
      "Leading design system adoption, performance budgets, and interaction quality across multiple product surfaces.",
  },
  {
  company: "Orlando Sublimation",
  role: "Graphic Designer",
  year: "2023 - 2026",
  location: "Tagum, Davao Del Norte",
  details:
    "Created custom graphics, branding materials, promotional designs, and motocross graphics while working closely with clients to deliver visually engaging and production-ready designs.",
},
{
  company: "Freelance",
  role: "Graphic Designer",
  year: "2023 - 2026",
  location: "Remote",
  details:
    "Created custom graphics, branding materials, promotional designs, and motocross graphics while working closely with clients to deliver visually engaging and production-ready designs.",
},
  {
    company: "Davao Del Norte State College.",
    role: "Bachelor of Science in Information Technology",
    year: "2022 - present",
    location: "Panabo City, Davao Del Norte",
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

export const socialLinks: SocialLink[] = [
    {
    label: "Telegram",
    href: "https://t.me/chrischan10",
    platform: "telegram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/639120509416",
    platform: "whatsapp",
  },
  {
    label: "GitHub",
    href: "https://github.com/channy051022",
    platform: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-faith-mestola",
    platform: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/christianfaithmestola",
    platform: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/christianfaithmestola",
    platform: "facebook",
  }
];

export const currentlyLearning = [
  "Django REST Framework",
  "Next.js Performance Optimization",
  "TypeScript Best Practices",
  "UI Motion and Micro-interactions",
];
