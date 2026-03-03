import Link from "next/link";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

import StatChips from "@/components/StatChips";
import darkModeHoverImage from "@/images/darmode_houver.jpg";
import darkModeImage from "@/images/darkmode_image.jpg";
import normalHoverImage from "@/images/normal image houver.jpg";
import normalImage from "@/images/normal_image.jpg";

interface HeroCardProps {
  name: string;
  roles: string[];
  location: string;
  summary: string;
}

export default function HeroCard({ name, roles, location, summary }: HeroCardProps) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>{location}</span>
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            <span className="inline-flex items-center gap-1.5">
              <span>{name}</span>
              <span
                className="inline-flex h-5 w-5 items-center justify-center"
                aria-label="Verified profile"
                title="Verified"
              >
                <CheckBadgeIcon aria-hidden="true" className="h-5 w-5 text-sky-500 dark:text-sky-400" />
              </span>
            </span>
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-300">{summary}</p>
          <StatChips items={roles} />
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div
            role="img"
            aria-label="Profile image placeholder"
            className="group w-full max-w-[15rem] overflow-hidden rounded-sm transition duration-200 hover:-translate-y-0.5 sm:max-w-[16rem]"
          >
            <div className="dark:hidden">
              <Image
                src={normalImage}
                alt=""
                aria-hidden="true"
                priority
                className="h-auto w-full transition duration-200 group-hover:hidden"
              />
              <Image
                src={normalHoverImage}
                alt=""
                aria-hidden="true"
                className="hidden h-auto w-full transition duration-200 group-hover:block"
              />
            </div>

            <div className="hidden dark:block">
              <Image
                src={darkModeImage}
                alt=""
                aria-hidden="true"
                className="h-auto w-full transition duration-200 group-hover:hidden"
              />
              <Image
                src={darkModeHoverImage}
                alt=""
                aria-hidden="true"
                className="hidden h-auto w-full transition duration-200 group-hover:block"
              />
            </div>
          </div>

          <div className="grid w-full max-w-[15rem] grid-cols-2 gap-3 sm:max-w-[16rem]">
            <Link
              href="https://calendly.com/christianfaithmestola-github/30min"
              className="btn-primary w-full gap-1.5"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              <span>Schedule</span>
            </Link>
            <Link href="mailto:christianfaithmestola.github@gmail.com" className="btn-secondary w-full gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <span>Email</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
