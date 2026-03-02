import type { Project } from "@/lib/data";

import StatChips from "@/components/StatChips";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLiveDemo = Boolean(project.live?.trim());

  return (
    <article className="surface-card min-w-0 flex h-full flex-col p-4 sm:p-5 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 text-base font-semibold tracking-tight text-zinc-900 break-words dark:text-zinc-100">
          {project.title}
        </h3>
        <span className="shrink-0 rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          {project.type}
        </span>
      </div>

      <p className="mb-4 text-sm leading-6 text-zinc-600 break-words dark:text-zinc-400">{project.description}</p>

      <StatChips items={project.tags} className="mb-5" />

      <div className="mt-auto flex flex-wrap gap-2">
        {hasLiveDemo ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            aria-label={`Open live project for ${project.title}`}
          >
            Live Demo
          </a>
        ) : (
          <span className="btn-secondary cursor-default opacity-80">Ongoing</span>
        )}
      </div>
    </article>
  );
}
