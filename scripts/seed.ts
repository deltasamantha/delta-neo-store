// Loads the initial catalog: `pnpm db:seed`. Safe to re-run: categories and products are
// upserted by slug, and existing stock levels are left untouched.
import "dotenv/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { seedCategories, seedProducts } from "@/lib/db/seed-data";
import * as schema from "@/lib/db/schema";

// lib/db is server-only (it can't be imported outside Next), so the script builds its own client.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(process.env.DATABASE_URL, { schema });
const { categories, products, stocks } = schema;

// Upsert helper: on conflict, overwrite every column we insert.
const excluded = (column: string) => sql.raw(`excluded.${column}`);

async function main() {
  const categoryRows = await db
    .insert(categories)
    .values(
      seedCategories.map((category, index) => ({
        slug: category.slug,
        name: category.name,
        imageSrc: category.image?.src ?? null,
        imageAlt: category.image?.alt ?? null,
        sortOrder: index,
      })),
    )
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: excluded("name"),
        imageSrc: excluded("image_src"),
        imageAlt: excluded("image_alt"),
        sortOrder: excluded("sort_order"),
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product) => {
        const categoryId = categoryIds.get(product.category);
        if (!categoryId) throw new Error(`Unknown category "${product.category}" for ${product.slug}`);

        return {
          categoryId,
          slug: product.slug,
          sku: product.sku,
          name: product.name,
          price: product.price,
          color: product.color,
          badge: product.badge ?? null,
          images: product.images,
          description: product.description,
          details: product.details,
          sizes: product.sizes ?? null,
        };
      }),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        categoryId: excluded("category_id"),
        sku: excluded("sku"),
        name: excluded("name"),
        price: excluded("price"),
        color: excluded("color"),
        badge: excluded("badge"),
        images: excluded("images"),
        description: excluded("description"),
        details: excluded("details"),
        sizes: excluded("sizes"),
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });

  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(stocks)
    .values(
      seedProducts.map((product) => ({
        productId: productIds.get(product.slug)!,
        quantity: product.stock,
      })),
    )
    .onConflictDoNothing({ target: stocks.productId });

  console.log(`Seeded ${categoryRows.length} categories and ${productRows.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
