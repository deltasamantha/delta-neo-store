import { CampaignBanner } from "@/components/home/campaign-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { EditorialSplit } from "@/components/home/editorial-split";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { Hero } from "@/components/home/hero";
import { ProductSection } from "@/components/home/product-section";
import { Services } from "@/components/home/services";
import { campaign, editorialStories, featuredCollection, heroStories, newArrivalSlugs, services } from "@/lib/catalog";
import { getHomeCategories, getProductsBySlugs } from "@/lib/db/queries/catalog";

export default async function Home() {
  const { productSlugs, ...featured } = featuredCollection;
  const [newArrivals, featuredProducts, categories] = await Promise.all([
    getProductsBySlugs(newArrivalSlugs),
    getProductsBySlugs(productSlugs),
    getHomeCategories(),
  ]);

  return (
    <main id="main">
      <Hero stories={heroStories} />
      <ProductSection title="New arrivals" href="/new-in" products={newArrivals} />
      <EditorialSplit stories={editorialStories} />
      <CategoryGrid categories={categories} />
      <FeaturedCollection {...featured} products={featuredProducts} />
      <CampaignBanner story={campaign} />
      <Services services={services} />
    </main>
  );
}
