import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  as?: ElementType;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function SectionCard({
  as: Tag = "section",
  title,
  description,
  headerAction,
  className,
  children,
}: SectionCardProps) {
  return (
    <Tag className={cn("surface-card min-w-0 p-4 sm:p-5", "hover:-translate-y-0.5 hover:shadow-md", className)}>
      {(title || description) && (
        <header className="mb-3 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              {title ? <h2 className="text-lg font-semibold tracking-tight break-words">{title}</h2> : null}
              {description ? <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">{description}</p> : null}
            </div>
            {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
          </div>
        </header>
      )}
      {children}
    </Tag>
  );
}
