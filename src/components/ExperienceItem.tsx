import type { Experience } from "@/lib/data";

interface ExperienceItemProps {
  item: Experience;
}

export default function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <li className="relative md:grid md:grid-cols-[8rem_1fr] md:gap-8">
      <span className="absolute -left-[1.72rem] top-5 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900 md:left-[7.62rem]" />

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 md:mb-0 md:pt-4 md:text-right">
        {item.year}
      </p>

      <article className="surface-card p-4 sm:p-6 hover:-translate-y-0.5 hover:shadow-md">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{item.role}</h3>
        <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {item.company} · {item.location}
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.details}</p>
      </article>
    </li>
  );
}
