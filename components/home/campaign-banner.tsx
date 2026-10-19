import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/catalog";

export function CampaignBanner({ story }: { story: Story }) {
  return (
    <section className="media-cover h-[70svh] min-h-[28rem] bg-ink">
      <Image src={story.image.src} alt={story.image.alt} fill sizes="100vw" />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-gutter text-center text-paper">
        <p className="type-label">{story.eyebrow}</p>
        <h2 className="type-display">{story.title}</h2>
        <p className="max-w-md type-body text-paper/85">
          Visit a client advisor for a private fitting, alterations and early access to new collections.
        </p>
        <Link href={story.href} className="btn btn-secondary mt-2">
          {story.cta}
        </Link>
      </div>
    </section>
  );
}
