"use client";

import { useMemo, useState } from "react";

import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { projects, type ProjectType } from "@/lib/data";
import { cn } from "@/lib/utils";

type ProjectFilter = "All" | ProjectType;

const filters: ProjectFilter[] = ["All", "Web", "Mobile", "Data"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="py-7 sm:py-8">
      <Container>
        <header className="mb-5 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Projects</h1>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Browse placeholder projects by category. Filter buttons work client-side for quick preview behavior.
          </p>
        </header>

        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Project filters">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition duration-200",
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 bg-white text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
