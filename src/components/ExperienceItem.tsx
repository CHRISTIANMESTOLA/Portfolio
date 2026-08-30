import type { Experience } from "@/lib/data";

interface ExperienceItemProps {
  item: Experience;
  isFirst?: boolean;
}

export default function ExperienceItem({ item, isFirst }: ExperienceItemProps) {
  return (
    <li className="relative md:grid md:grid-cols-[9rem_1fr] md:gap-10">
      <span
        aria-hidden="true"
        className={`absolute -left-6 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-200 md:left-[10.25rem] md:top-5 ${
          isFirst
            ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100 ring-4 ring-zinc-100 dark:ring-zinc-800"
            : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900"
        }`}
      />

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 md:mb-0 md:pt-5 md:text-right">
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
