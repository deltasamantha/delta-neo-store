import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/catalog";
import { SectionHeading } from "./section-heading";

type Props = {
  title: string;
  href: string;
  products: Product[];
};

export function ProductSection({ title, href, products }: Props) {
  return (
    <section className="section bg-paper">
      <SectionHeading title={title} href={href} />
      <ul className="container-bleed product-grid bg-line-subtle md:max-lg:[&>li:nth-child(n+7)]:hidden">
        {products.map((product) => (
          <li key={product.slug} className="flex">
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
