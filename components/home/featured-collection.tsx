import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import type { Image as CatalogImage, Product } from "@/lib/catalog";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: CatalogImage;
  products: Product[];
};

export function FeaturedCollection({ eyebrow, title, description, href, image, products }: Props) {
  return (
    <section className="section">
      <div className="container-bleed grid gap-px bg-line-subtle lg:grid-cols-2">
        <div className="relative bg-paper">
          <div className="media-cover aspect-[4/5] bg-surface lg:sticky lg:top-header lg:aspect-auto lg:h-[calc(100svh-var(--header))]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="scrim" />
            <div className="absolute inset-x-0 bottom-0 stack items-start px-gutter pb-10 text-paper md:pb-14">
              <p className="type-label">{eyebrow}</p>
              <h2 className="max-w-md text-2xl font-medium md:text-3xl">{title}</h2>
              <p className="max-w-sm type-body text-paper/85">{description}</p>
              <Link href={href} className="btn btn-secondary mt-2">
                Explore the edit
              </Link>
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-px">
          {products.map((product) => (
            <li key={product.slug} className="flex">
              <ProductCard product={product} sizes="(min-width: 1024px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
