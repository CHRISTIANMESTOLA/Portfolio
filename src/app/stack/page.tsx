import Link from "next/link";

import Container from "@/components/Container";
import { techGroups } from "@/lib/data";

export default function StackPage() {
  return (
    <section className="py-7 sm:py-8">
      <Container>
        <header className="mb-8 flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Tech Stack</h1>
        </header>

        <div className="space-y-8">
          {techGroups.map((group) => (
            <section key={group.title} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{group.title}</h2>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
