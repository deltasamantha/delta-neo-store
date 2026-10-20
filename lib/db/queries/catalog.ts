"use cache";

import "server-only";
import { and, asc, desc, eq, inArray, isNotNull, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { categories, products, stocks } from "@/lib/db/schema";
import type { Category, Product } from "@/lib/catalog";

// Every catalog read shares this tag; call revalidateTag("catalog") after changing products or stock.
const CATALOG_TAG = "catalog";

function cacheCatalog() {
  cacheTag(CATALOG_TAG);
  cacheLife("hours");
}

// Products with their category and stock, mapped to the storefront `Product` shape.
function selectProducts() {
  return db
    .select({
      product: products,
      categorySlug: categories.slug,
      categoryName: categories.name,
      stock: stocks.quantity,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(stocks, eq(stocks.productId, products.id))
    .$dynamic();
}

type ProductQueryRow = Awaited<ReturnType<typeof selectProducts>>[number];

function toProduct({ product, categorySlug, categoryName, stock }: ProductQueryRow): Product {
  return {
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    price: product.price,
    category: categorySlug,
    categoryName,
    color: product.color,
    images: product.images,
    badge: product.badge ?? undefined,
    stock: stock ?? 0,
    sizes: product.sizes ?? undefined,
    description: product.description,
    details: product.details,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  cacheCatalog();
  const [row] = await selectProducts()
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);
  return row ? toProduct(row) : null;
}

// Returns products in the order of `slugs`, skipping any that are missing or inactive.
export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  cacheCatalog();
  if (slugs.length === 0) return [];

  const rows = await selectProducts().where(
    and(inArray(products.slug, slugs), eq(products.isActive, true)),
  );
  const bySlug = new Map(rows.map((row) => [row.product.slug, toProduct(row)]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

// Same category first, then fill with the newest pieces from elsewhere.
export async function getRelatedProducts(
  product: Pick<Product, "slug" | "category">,
  limit = 4,
): Promise<Product[]> {
  cacheCatalog();
  const rows = await selectProducts()
    .where(and(ne(products.slug, product.slug), eq(products.isActive, true)))
    .orderBy(
      desc(sql`${categories.slug} = ${product.category}`),
      desc(products.createdAt),
      asc(products.name),
    )
    .limit(limit);
  return rows.map(toProduct);
}

export async function getAllProductSlugs(): Promise<string[]> {
  cacheCatalog();
  const rows = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true));
  return rows.map((row) => row.slug);
}

// Categories shown in the home page grid: only those with an image.
export async function getHomeCategories(): Promise<Category[]> {
  cacheCatalog();
  const rows = await db
    .select()
    .from(categories)
    .where(isNotNull(categories.imageSrc))
    .orderBy(asc(categories.sortOrder), asc(categories.name));

  return rows.map((category) => ({
    slug: category.slug,
    name: category.name,
    image: { src: category.imageSrc ?? "", alt: category.imageAlt ?? "" },
  }));
}
