import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductSection } from "@/components/home/product-section";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { StockStatus } from "@/components/product/stock-status";
import { formatPrice, getStockStatus } from "@/lib/catalog";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/lib/db/queries/catalog";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = product.categoryName;
  const soldOut = getStockStatus(product.stock) === "sold-out";
  const related = await getRelatedProducts({ slug: product.slug, category: product.category });

  return (
    <main id="main">
      <div className="container-bleed grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ProductGallery images={product.images} />

        <div className="px-gutter py-8 lg:px-12 lg:py-12 xl:px-16">
          <div className="stack-loose lg:sticky lg:top-[calc(var(--header)+3rem)] lg:max-w-md">
            <nav aria-label="Breadcrumb">
              <ol className="cluster gap-x-2 type-caption text-muted">
                <li>
                  <Link href="/" className="link-muted">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/${product.category}`} className="link-muted">{category}</Link>
                </li>
              </ol>
            </nav>

            <header className="stack-tight">
              {product.badge && <p className="type-label">{product.badge}</p>}
              <h1 className="text-xl font-medium md:text-2xl">{product.name}</h1>
              <p className="type-body font-medium">{formatPrice(product.price)}</p>
              <p className="type-caption text-muted">Style {product.sku}</p>
            </header>

            <div className="stack-tight rule-subtle pt-6">
              <p className="type-caption">
                <span className="text-muted">Colour: </span>
                {product.color}
              </p>
              <StockStatus stock={product.stock} />
            </div>

            <ProductPurchase sizes={product.sizes} soldOut={soldOut} />

            <ul className="stack-tight type-caption text-muted">
              <li>Complimentary express shipping and returns</li>
              <li>Signature packaging on every order</li>
            </ul>

            <div className="border-b border-line-subtle">
              <ProductAccordion title="Product details" defaultOpen>
                <p className="text-ink">{product.description}</p>
                <ul className="list-disc stack-tight pl-4">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </ProductAccordion>
              {product.sizes && product.sizes.length > 1 && (
                <ProductAccordion title="Size & fit">
                  <p>
                    Available in {product.sizes.join(", ")}. If you are between sizes, a client advisor can help you
                    choose the best fit.
                  </p>
                </ProductAccordion>
              )}
              <ProductAccordion title="Shipping & returns">
                <p>Complimentary express delivery in 2–4 business days, with signature on arrival.</p>
                <p>Return or exchange within 30 days. We collect from your door at no cost.</p>
              </ProductAccordion>
            </div>
          </div>
        </div>
      </div>

      <ProductSection
        title="You may also like"
        href={`/${product.category}`}
        linkLabel={`Shop ${category}`}
        products={related}
      />
    </main>
  );
}
