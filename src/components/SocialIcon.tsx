import type { SocialPlatform } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export default function SocialIcon({ platform, className }: SocialIconProps) {
  const iconClassName = cn("h-4 w-4 shrink-0", className);

  switch (platform) {
    case "github":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={iconClassName}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.28-.36 6.73-1.6 6.73-7.1a5.53 5.53 0 0 0-1.5-3.8 5.07 5.07 0 0 0-.09-3.77s-1.18-.36-3.86 1.5a13.38 13.38 0 0 0-7 0C5.6 0 4.42.36 4.42.36a5.07 5.07 0 0 0-.09 3.77 5.53 5.53 0 0 0-1.5 3.8c0 5.5 3.45 6.74 6.73 7.1a4.8 4.8 0 0 0-1 3.2v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={iconClassName}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={iconClassName}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={iconClassName}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
        </svg>
      );
    default:
      return null;
  }
}
