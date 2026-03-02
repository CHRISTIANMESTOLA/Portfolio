import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  as?: ElementType;
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export default function SectionCard({
  as: Tag = "section",
  title,
  description,
  className,
  children,
}: SectionCardProps) {
  return (
    <Tag className={cn("surface-card p-4 sm:p-5", "hover:-translate-y-0.5 hover:shadow-md", className)}>
      {(title || description) && (
        <header className="mb-3 space-y-1">
          {title ? <h2 className="text-lg font-semibold tracking-tight">{title}</h2> : null}
          {description ? <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p> : null}
        </header>
      )}
      {children}
    </Tag>
  );
}
