import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";

type Props = {
  title: string;
  href: string;
  linkLabel?: string;
  products: Product[];
};

export function ProductSection({ title, href, linkLabel, products }: Props) {
  // The grid is 3 columns on tablet; hide any partial last row there.
  const tabletCount = Math.floor(products.length / 3) * 3 || products.length;

  return (
    <section className="section bg-paper">
      <SectionHeading title={title} href={href} linkLabel={linkLabel} />
      <ul className="container-bleed product-grid bg-line-subtle">
        {products.map((product, index) => (
          <li key={product.slug} className={index >= tabletCount ? "flex md:max-lg:hidden" : "flex"}>
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
