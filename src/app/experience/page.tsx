import Container from "@/components/Container";
import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <section className="py-7 sm:py-8">
      <Container>
        <header className="mb-5 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Experience</h1>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Placeholder timeline with year markers on one side and role details on the other.
          </p>
        </header>

        <ol className="relative space-y-5 border-l border-zinc-200 pl-6 dark:border-zinc-800 md:space-y-6 md:border-l-0 md:pl-0 md:before:absolute md:before:left-[8rem] md:before:top-0 md:before:h-full md:before:w-px md:before:bg-zinc-200 dark:md:before:bg-zinc-800">
          {experience.map((item) => (
            <ExperienceItem key={`${item.company}-${item.year}`} item={item} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
