import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/catalog";

export function EditorialSplit({ stories }: { stories: Story[] }) {
  return (
    <section aria-label="Stories" className="grid gap-px md:grid-cols-2">
      {stories.map((story) => (
        <Link key={story.href} href={story.href} className="group media-cover aspect-[4/5] bg-surface-strong">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="scrim" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-gutter pb-10 text-center text-paper md:pb-14">
            <p className="type-label">{story.eyebrow}</p>
            <h2 className="text-2xl font-medium">{story.title}</h2>
            <span className="link type-label">{story.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
