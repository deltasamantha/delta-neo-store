// Storefront types, helpers and marketing content. Catalog data (products, categories, stock)
// lives in the database: see lib/db/schema/catalog.ts and lib/db/queries/catalog.ts.

export type Image = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  price: number; // minor units (cents)
  category: string; // category slug
  categoryName: string;
  color: string;
  images: Image[]; // first image is used on product cards
  badge?: string;
  stock: number;
  sizes?: string[];
  description: string;
  details: string[];
};

export type Category = {
  slug: string;
  name: string;
  image: Image;
};

export type Story = {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  image: Image;
};

export function unsplash(id: string, alt: string): Image {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`,
    alt,
  };
}

// Close-up crop of the same photo, centred on a focal point (0–1) and zoomed in.
export function detail(id: string, alt: string, x = 0.5, y = 0.5, zoom = 2.2): Image {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1600&h=2000&q=80`,
    alt,
  };
}

export const heroStories: Story[] = [
  {
    eyebrow: "Autumn–Winter 2026",
    title: "Women",
    cta: "Shop the collection",
    href: "/women",
    image: unsplash("1617019114583-affb34d1b3cd", "Woman in an ivory shirt dress and sunglasses in warm evening light"),
  },
  {
    eyebrow: "Autumn–Winter 2026",
    title: "Men",
    cta: "Shop the collection",
    href: "/men",
    image: unsplash("1520975954732-35dd22299614", "Man in a black leather jacket and sunglasses against a brick wall"),
  },
];

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "sold-out";
  if (stock <= 5) return "low-stock";
  return "in-stock";
}

// Hand-picked product slugs for the home page, resolved against the database.
export const newArrivalSlugs = [
  "chevron-leather-shoulder-bag",
  "woven-leather-tote",
  "technical-bomber-jacket",
  "double-faced-wool-coat",
  "single-breasted-wool-blazer",
  "fringed-knit-poncho",
  "striped-wide-leg-trousers",
  "fluid-pull-on-trousers",
];

export const featuredCollection = {
  eyebrow: "Jewellery & Accessories",
  title: "The finishing touch",
  description:
    "Sculptural gold, fine stones and sharp frames. A considered edit of pieces made to be layered, gifted and kept.",
  href: "/accessories",
  image: unsplash("1469334031218-e382a71b716b", "Woman adjusting oversized sunglasses against a yellow wall"),
  productSlugs: [
    "diamond-halo-ring",
    "rose-gold-link-bracelet",
    "sculpted-gold-earrings",
    "round-metal-sunglasses",
  ],
};

export const editorialStories: Story[] = [
  {
    eyebrow: "Campaign",
    title: "Soft romance",
    cta: "Discover",
    href: "/stories/soft-romance",
    image: unsplash("1581044777550-4cfa60707c03", "Woman in a ruffled pink blouse in a golden wheat field"),
  },
  {
    eyebrow: "Evening",
    title: "After dark",
    cta: "Discover",
    href: "/stories/after-dark",
    image: unsplash("1566174053879-31528523f8ae", "Woman in a plum off-shoulder evening dress"),
  },
];

export const campaign: Story = {
  eyebrow: "In store",
  title: "The house boutique",
  cta: "Book an appointment",
  href: "/appointments",
  image: unsplash("1445205170230-053b83016050", "Rails of neutral knitwear in a warmly lit boutique window"),
};

export const services = [
  {
    title: "Complimentary shipping",
    description: "Free express delivery on every order, with signature on arrival.",
    href: "/help/shipping",
  },
  {
    title: "Easy returns",
    description: "Return or exchange within 30 days, collected from your door.",
    href: "/help/returns",
  },
  {
    title: "Signature packaging",
    description: "Every piece arrives wrapped and boxed, ready to give.",
    href: "/help/packaging",
  },
  {
    title: "Personal appointments",
    description: "Shop one-to-one with a client advisor, in store or by video.",
    href: "/appointments",
  },
];

export const navigation = [
  { label: "New In", href: "/new-in" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Handbags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "Stories", href: "/stories" },
];

export const footerLinks = [
  {
    title: "Client services",
    links: ["Contact us", "Shipping", "Returns", "FAQ"],
  },
  {
    title: "The house",
    links: ["About", "Sustainability", "Careers", "Stores"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Cookies", "Accessibility"],
  },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}
