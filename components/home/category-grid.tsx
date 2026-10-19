import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="section">
      <SectionHeading title="Shop by category" />
      <ul className="container-page grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-4 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/${category.slug}`} className="group stack-tight">
              <div className="media-cover aspect-[3/4] bg-surface">
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="type-title pt-1 text-sm group-hover:underline md:text-base">{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
