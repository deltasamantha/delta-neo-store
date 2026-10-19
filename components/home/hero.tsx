import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/catalog";

export function Hero({ stories }: { stories: Story[] }) {
  return (
    <section aria-label="Featured collections" className="grid gap-px md:grid-cols-2">
      {stories.map((story, index) => (
        <Link
          key={story.href}
          href={story.href}
          className="group media-cover h-[85svh] bg-surface-strong md:h-[calc(100svh-var(--header))] md:min-h-[36rem]"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            preload={index === 0}
            className="transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="scrim" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-gutter pb-12 text-center text-paper md:pb-16">
            <p className="type-label">{story.eyebrow}</p>
            <h2 className="type-display">{story.title}</h2>
            <span className="btn btn-secondary mt-2">{story.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
