"use client";

import Image from "next/image";
import { useRef } from "react";

import galleryImage1 from "@/images/gallary images/639921560_1464268135484340_212040985904536992_n.jpg";
import galleryImage2 from "@/images/gallary images/641529449_1662118298463923_8845300517578233305_n.jpg";
import galleryImage3 from "@/images/gallary images/638844219_2010532973213220_2541580365359164253_n.jpg";
import galleryImage4 from "@/images/gallary images/641537336_1464347515039890_4250766961854542058_n.jpg";
import galleryImage5 from "@/images/gallary images/645669229_787643867258528_2677625128829414090_n.jpg";
import galleryImage6 from "@/images/gallary images/645102952_1866067144063872_3785170551633941711_n.jpg";
import galleryImage7 from "@/images/gallary images/643757122_3217932771929021_6565469074110561732_n.jpg";

const galleryImages = [
  { src: galleryImage1, alt: "Gallery image 1" },
  { src: galleryImage2, alt: "Gallery image 2" },
  { src: galleryImage3, alt: "Gallery image 3" },
  { src: galleryImage4, alt: "Gallery image 4" },
  { src: galleryImage5, alt: "Gallery image 5" },
  { src: galleryImage6, alt: "Gallery image 6" },
  { src: galleryImage7, alt: "Gallery image 7" },
];

export default function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-gallery-card]");
    const step = (firstCard?.offsetWidth ?? 160) + 12;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Previous gallery images"
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xl leading-none text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 sm:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
      >
        {"<"}
      </button>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 sm:mx-10 sm:px-1"
      >
        {galleryImages.map((item) => (
          <article
            key={item.alt}
            data-gallery-card
            className="w-[68vw] max-w-[11rem] min-w-[9.5rem] shrink-0 snap-start sm:w-40 sm:max-w-none sm:min-w-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 68vw, 160px"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Next gallery images"
        className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xl leading-none text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900 sm:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
      >
        {">"}
      </button>
    </div>
  );
}
