import Image from "next/image";
import type { Image as CatalogImage } from "@/lib/catalog";

// Mobile: swipeable row with a peek of the next image. Desktop: images stacked full width.
export function ProductGallery({ images }: { images: CatalogImage[] }) {
  return (
    <ul
      aria-label="Product images"
      className="flex snap-x snap-mandatory gap-px overflow-x-auto bg-line-subtle [scrollbar-width:none] lg:flex-col lg:overflow-visible"
    >
      {images.map((image, index) => (
        <li key={image.src} className="w-[88%] shrink-0 snap-start sm:w-[70%] lg:w-full">
          <div className="media-cover aspect-[4/5] bg-surface">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, (min-width: 640px) 70vw, 88vw"
              preload={index === 0}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
