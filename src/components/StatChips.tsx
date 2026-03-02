import { cn } from "@/lib/utils";

interface StatChipsProps {
  items: string[];
  className?: string;
}

export default function StatChips({ items, className }: StatChipsProps) {
  return (
    <ul className={cn("min-w-0 flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="max-w-full rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 break-words transition duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
