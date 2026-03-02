import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import GalleryCarousel from "@/components/GalleryCarousel";
import HeroCard from "@/components/HeroCard";
import ProjectCard from "@/components/ProjectCard";
import SectionCard from "@/components/SectionCard";
import StatChips from "@/components/StatChips";
import { currentlyLearning, profile, projects, recommendations, socialLinks, techGroups } from "@/lib/data";

const certificates = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  image: "/file.svg",
}));

const showCertificates = false;
const showRecommendations = false;

const experienceTimeline = [
  {
    role: "Web Developer Intern",
    organization: "City Goverment of Tagum",
    year: "present",
  },
  {
    role: "Bachelor of Science in Information Technology",
    organization: "Davao Del Norte State College",
    year: "2022",
  },
  {
    role: "Hello World! 👋",
    organization: "First line of code",
    year: "2022",
  },
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Container className="py-7 sm:py-8">
        <HeroCard {...profile} />

        <section className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-3" aria-label="Home sections">
          <SectionCard
            title="About Me"
            description="Short placeholder intro"
            className="lg:col-span-2"
          >
            <p className="text-sm text-justify leading-6 text-zinc-600 break-words dark:text-zinc-400">
I’m a passionate Web Developer and UI/UX Designer who loves turning ideas into clean, functional, and user-centered digital experiences. I enjoy building modern web applications that are not only visually appealing but also practical and intuitive to use.
            </p>
            <p className="mt-2 text-sm text-justify leading-6 text-zinc-600 break-words dark:text-zinc-400">
With a background in design, I pay close attention to details from layout and typography to user flow and overall experience. For me, good design is not just about how it looks, but how it works.           </p>
            <p className="text-sm text-justify leading-6 text-zinc-600 break-words dark:text-zinc-400" >I’m continuously learning and improving my skills to become a better and more effective developer. Every project I build is part of my growth journey refining my fundamentals, exploring new technologies, and pushing myself to write better, cleaner code.</p>
            <p className="mt-2 text-sm text-justify leading-6 text-zinc-600 break-words dark:text-zinc-400" >I believe growth never stops. I’m building myself one line of code at a time.</p>
         
          </SectionCard>

          <SectionCard title="Featured Tech" description="Current stack at a glance">
            <div className="space-y-3">
              {techGroups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{group.title}</h3>
                  <StatChips items={group.items} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/stack" className="btn-secondary">
                View All
              </Link>
            </div>
          </SectionCard>

          <SectionCard
            title="Featured Projects"
            description="My  recent project builds"
            className="lg:col-span-2"
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/projects" className="btn-secondary">
                See All Projects
              </Link>
            </div>
          </SectionCard>

          <SectionCard title="Experiences" description="Quick view of recent roles">
            <div className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-2 top-1 w-px bg-zinc-200 dark:bg-zinc-700"
              />

              <ul className="space-y-5">
                {experienceTimeline.map((item, index) => (
                  <li
                    key={`${item.role}-${item.year}`}
                    className="relative flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-4 top-2 h-3.5 w-3.5 -translate-x-1/2 cursor-pointer rounded-[2px] border-2 transition-all duration-200 hover:scale-110 hover:shadow-sm ${
                        index === 0
                          ? "border-zinc-900 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:hover:border-zinc-300 dark:hover:bg-zinc-300"
                          : "border-zinc-300 bg-white hover:border-zinc-500 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                    />
                    <div className="min-w-0 sm:max-w-[75%]">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-700 break-words dark:text-zinc-300">
                        {item.organization}
                      </p>
                    </div>
                    <span className="w-fit shrink-0 rounded-sm border border-zinc-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      {item.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          <SectionCard
            title="Currently Learning"
            description="What I am focusing on right now"
            className="lg:col-span-2 h-full"
          >
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {currentlyLearning.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 break-words dark:border-zinc-700 dark:bg-zinc-800/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title="Social Connect"
            description="Let us connect on these platforms"
            className="h-full"
          >
            <div className="grid gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  <span className="break-words">{item.label}</span>
                  <span aria-hidden="true" className="shrink-0">
                    -&gt;
                  </span>
                </a>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Gallery"
            description="My gallery"
            className="lg:col-span-3"
          >
            <GalleryCarousel />
          </SectionCard>

          {showCertificates && (
            <SectionCard
              title="Certificates"
              description="Awards and certificates placeholder"
              className="lg:col-span-3"
            >
              <div className="flex gap-4 overflow-x-auto pb-1">
                {certificates.map((item) => (
                  <div key={item.id} className="w-56 shrink-0">
                    <Image
                      src={item.image}
                      alt={`Certificate placeholder ${item.id}`}
                      width={896}
                      height={672}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </section>
      </Container>

      {showRecommendations && (
        <section
          aria-label="Recommendations"
          className="mt-8 border-y border-zinc-200 bg-white/80 py-8 dark:border-zinc-800 dark:bg-zinc-900/70"
        >
          <Container>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Recommendations</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Placeholder testimonials for layout preview</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((entry) => (
                <blockquote
                  key={entry.person}
                  className="surface-card p-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                >
                  <p className="mb-4">
                    &ldquo;{entry.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{entry.person}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{entry.title}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
