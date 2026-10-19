import { CampaignBanner } from "@/components/home/campaign-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { EditorialSplit } from "@/components/home/editorial-split";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { Hero } from "@/components/home/hero";
import { ProductSection } from "@/components/home/product-section";
import { Services } from "@/components/home/services";
import {
  campaign,
  categories,
  editorialStories,
  featuredCollection,
  heroStories,
  newArrivals,
  services,
} from "@/lib/catalog";

export default function Home() {
  return (
    <main id="main">
      <Hero stories={heroStories} />
      <ProductSection title="New arrivals" href="/new-in" products={newArrivals} />
      <EditorialSplit stories={editorialStories} />
      <CategoryGrid categories={categories} />
      <FeaturedCollection {...featuredCollection} />
      <CampaignBanner story={campaign} />
      <Services services={services} />
    </main>
  );
}
