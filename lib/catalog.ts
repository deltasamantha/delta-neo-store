// Sample storefront data. Replace with database queries once the catalog schema exists.

export type Image = {
  src: string;
  alt: string;
};

export type CategorySlug = "women" | "men" | "bags" | "shoes" | "jewellery" | "accessories";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  price: number; // minor units (cents)
  category: CategorySlug;
  color: string;
  images: Image[]; // first image is used on product cards
  badge?: string;
  stock: number;
  sizes?: string[];
  description: string;
  details: string[];
};

export const categoryNames: Record<CategorySlug, string> = {
  women: "Women's Ready-to-Wear",
  men: "Men's Ready-to-Wear",
  bags: "Handbags",
  shoes: "Shoes",
  jewellery: "Fine Jewellery",
  accessories: "Accessories",
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

function unsplash(id: string, alt: string): Image {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`,
    alt,
  };
}

// Close-up crop of the same photo, centred on a focal point (0–1) and zoomed in.
function detail(id: string, alt: string, x = 0.5, y = 0.5, zoom = 2.2): Image {
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

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women's Ready-to-Wear",
    image: unsplash("1485968579580-b6d095142e6e", "Woman in a tailored check coat on a city street"),
  },
  {
    slug: "men",
    name: "Men's Tailoring",
    image: unsplash("1507679799987-c73779587ccf", "Man fastening the button of a navy suit jacket"),
  },
  {
    slug: "bags",
    name: "Handbags",
    image: unsplash("1622560480605-d83c853bc5c3", "Burgundy grained leather backpack"),
  },
  {
    slug: "shoes",
    name: "Shoes",
    image: unsplash("1543163521-1bf539c55dd2", "Pair of floral print stiletto pumps on a white plinth"),
  },
];

const clothingSizes = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "chevron-leather-shoulder-bag",
    sku: "NEO-B1042",
    name: "Chevron leather shoulder bag",
    price: 245000,
    category: "bags",
    color: "Blush / Butter",
    badge: "New in",
    stock: 12,
    images: [
      unsplash("1566150905458-1bf1fc113f0d", "Blush pink leather shoulder bag with a chevron panel and chain strap"),
      detail("1566150905458-1bf1fc113f0d", "Close-up of the chevron inlay and stitched edges", 0.42, 0.42, 1.6),
    ],
    description:
      "A compact shoulder bag cut from smooth calfskin, finished with a hand-inlaid chevron panel and a sliding chain strap that converts from shoulder to crossbody.",
    details: [
      "Smooth calfskin with contrast inlay",
      "Sliding chain strap, 55 cm drop",
      "Magnetic flap closure",
      "Interior slip pocket",
      "W 22 × H 14 × D 6 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "woven-leather-tote",
    sku: "NEO-B1057",
    name: "Woven leather tote",
    price: 289000,
    category: "bags",
    color: "Cognac",
    badge: "New in",
    stock: 3,
    images: [
      unsplash("1598532163257-ae3c6b2524b6", "Cognac woven leather tote with a gold chain"),
      detail("1598532163257-ae3c6b2524b6", "Close-up of the hand-woven leather strips", 0.5, 0.6, 2.2),
    ],
    description:
      "An oversized tote hand-woven from wide strips of supple nappa leather, softened with a slouchy silhouette and a polished chain detail.",
    details: [
      "Hand-woven nappa leather",
      "Polished gold-tone chain",
      "Unlined interior with removable pouch",
      "W 40 × H 32 × D 14 cm",
      "Made in Italy",
    ],
  },
  {
    slug: "technical-bomber-jacket",
    sku: "NEO-M2210",
    name: "Technical bomber jacket",
    price: 210000,
    category: "men",
    color: "Rust",
    stock: 18,
    sizes: clothingSizes,
    images: [
      unsplash("1591047139829-d91aecb6caea", "Rust bomber jacket on a hanger"),
      detail("1591047139829-d91aecb6caea", "Close-up of the zip front and satin twill", 0.5, 0.62, 2.2),
    ],
    description:
      "A lightweight bomber in water-repellent technical twill with a satin sheen, ribbed trims and a clean two-way zip.",
    details: [
      "100% recycled polyamide",
      "Water-repellent finish",
      "Two-way zip, ribbed collar and cuffs",
      "Regular fit; true to size",
      "Machine wash cold",
    ],
  },
  {
    slug: "single-breasted-wool-blazer",
    sku: "NEO-M2234",
    name: "Single-breasted wool blazer",
    price: 395000,
    category: "men",
    color: "Black",
    badge: "Exclusive",
    stock: 0,
    sizes: ["46", "48", "50", "52", "54"],
    images: [
      unsplash("1617127365659-c47fa864d8bc", "Man in a black single-breasted blazer and sunglasses"),
      detail("1617127365659-c47fa864d8bc", "Close-up of the peak lapel and pocket square", 0.45, 0.62, 2),
    ],
    description:
      "A sharply tailored blazer in fine Italian wool, with a softly structured shoulder, peak lapels and a single-button front.",
    details: [
      "100% virgin wool, Bemberg lining",
      "Half-canvas construction",
      "Peak lapels, single-button closure",
      "Slim fit; take your usual size",
      "Dry clean only",
    ],
  },
  {
    slug: "double-faced-wool-coat",
    sku: "NEO-W3105",
    name: "Double-faced wool coat",
    price: 360000,
    category: "women",
    color: "Bordeaux",
    stock: 7,
    sizes: clothingSizes,
    images: [
      unsplash("1483985988355-763728e1935b", "Woman in a burgundy wool coat carrying shopping bags"),
      detail("1483985988355-763728e1935b", "Close-up of the funnel collar and zip front", 0.6, 0.62, 2.6),
    ],
    description:
      "An unlined coat in double-faced wool and cashmere, hand-finished at every seam for a light, fluid drape with a generous funnel collar.",
    details: [
      "90% wool, 10% cashmere",
      "Hand-finished double-faced seams",
      "Concealed button closure",
      "Relaxed fit; size down for a closer fit",
      "Dry clean only",
    ],
  },
  {
    slug: "belted-camel-coat",
    sku: "NEO-W3118",
    name: "Belted camel wrap coat",
    price: 410000,
    category: "women",
    color: "Camel",
    badge: "New in",
    stock: 9,
    sizes: clothingSizes,
    images: [
      unsplash("1539533018447-63fcce2678e3", "Woman in a belted camel wrap coat on stone steps"),
      detail("1539533018447-63fcce2678e3", "Close-up of the tie belt and wrap front", 0.5, 0.45, 2.2),
    ],
    description:
      "A timeless wrap coat in brushed camel hair, cut long with dropped shoulders and a self-tie belt that cinches the waist.",
    details: [
      "100% camel hair",
      "Self-tie belt and wrap front",
      "Two welt pockets",
      "Oversized fit",
      "Dry clean only",
    ],
  },
  {
    slug: "fringed-knit-poncho",
    sku: "NEO-W3140",
    name: "Fringed knit poncho",
    price: 135000,
    category: "women",
    color: "Ivory",
    stock: 4,
    sizes: ["One size"],
    images: [
      unsplash("1434389677669-e08b4cac3105", "Cream knitted poncho with fringe on a hanger"),
      detail("1434389677669-e08b4cac3105", "Close-up of the open-weave knit", 0.5, 0.5, 2.4),
    ],
    description:
      "An airy open-weave poncho knitted from cotton and silk, finished with a hand-knotted fringe hem.",
    details: [
      "70% cotton, 30% silk",
      "Hand-knotted fringe",
      "V-neck, relaxed drape",
      "One size",
      "Hand wash cold",
    ],
  },
  {
    slug: "striped-wide-leg-trousers",
    sku: "NEO-W3162",
    name: "Striped wide-leg trousers",
    price: 128000,
    category: "women",
    color: "Black / White",
    stock: 15,
    sizes: clothingSizes,
    images: [
      unsplash("1509631179647-0177331693ae", "Woman in black and white striped wide-leg trousers against a teal wall"),
      detail("1509631179647-0177331693ae", "Close-up of the striped fabric", 0.5, 0.7, 2.2),
    ],
    description:
      "High-rise trousers with a fluid wide leg, cut from crisp striped crepe with pressed front creases.",
    details: [
      "Triacetate and polyester crepe",
      "High rise, wide leg",
      "Side zip with hook closure",
      "True to size",
      "Dry clean only",
    ],
  },
  {
    slug: "fluid-pull-on-trousers",
    sku: "NEO-W3177",
    name: "Fluid pull-on trousers",
    price: 115000,
    category: "women",
    color: "Blush",
    stock: 2,
    sizes: clothingSizes,
    images: [
      unsplash("1594633312681-425c7b97ccd1", "Blush pink fluid trousers"),
      detail("1594633312681-425c7b97ccd1", "Close-up of the fluid fabric and cuffed hem", 0.5, 0.75, 2),
    ],
    description:
      "Easy pull-on trousers in washed silk satin, with an elasticated waist, patch pockets and gathered cuffs.",
    details: [
      "100% silk satin",
      "Elasticated waist",
      "Patch pockets",
      "Relaxed fit",
      "Hand wash cold",
    ],
  },
  {
    slug: "diamond-halo-ring",
    sku: "NEO-J5011",
    name: "Diamond halo ring",
    price: 640000,
    category: "jewellery",
    color: "18k rose gold",
    stock: 2,
    sizes: ["48", "50", "52", "54", "56"],
    images: [
      unsplash("1605100804763-247f67b3557e", "Rose gold diamond halo ring on black stone"),
      detail("1605100804763-247f67b3557e", "Close-up of the centre stone and pavé halo", 0.45, 0.45, 2.2),
    ],
    description:
      "A round brilliant-cut centre stone encircled by a pavé halo, set on a split shank of 18k rose gold.",
    details: [
      "18k rose gold",
      "0.5 ct centre diamond, 0.3 ct pavé",
      "Split pavé shank",
      "Complimentary resizing within 30 days",
      "Presented in a signature box",
    ],
  },
  {
    slug: "rose-gold-link-bracelet",
    sku: "NEO-J5024",
    name: "Rose gold link bracelet",
    price: 380000,
    category: "jewellery",
    color: "18k rose gold",
    stock: 6,
    images: [
      unsplash("1611591437281-460bfbe1220a", "Rose gold link bracelet on a pink background"),
      detail("1611591437281-460bfbe1220a", "Close-up of the scrolling links", 0.5, 0.5, 2.4),
    ],
    description:
      "Scrolling infinity links in 18k rose gold, each set with a line of brilliant-cut stones.",
    details: [
      "18k rose gold",
      "Brilliant-cut stones",
      "Box clasp with safety catch",
      "Length 17 cm",
      "Presented in a signature box",
    ],
  },
  {
    slug: "sculpted-gold-earrings",
    sku: "NEO-J5038",
    name: "Sculpted gold earrings",
    price: 155000,
    category: "jewellery",
    color: "Yellow gold",
    badge: "New in",
    stock: 11,
    images: [
      unsplash("1617038220319-276d3cfab638", "Sculptural gold earrings resting on a pale shell"),
      detail("1617038220319-276d3cfab638", "Close-up of the twisted gold hoops", 0.55, 0.6, 2.2),
    ],
    description:
      "Chunky twisted hoops in polished gold vermeil, light enough to wear from morning to night.",
    details: [
      "Gold vermeil on sterling silver",
      "Hinged hoop closure",
      "Diameter 2.5 cm",
      "Presented in a signature box",
    ],
  },
  {
    slug: "round-metal-sunglasses",
    sku: "NEO-A6002",
    name: "Round metal sunglasses",
    price: 52000,
    category: "accessories",
    color: "Gold / Green",
    stock: 24,
    images: [
      unsplash("1511499767150-a48a237f0083", "Round gold-frame sunglasses on a white surface"),
      detail("1511499767150-a48a237f0083", "Close-up of the gold bridge and green lenses", 0.5, 0.5, 2),
    ],
    description:
      "Slim round frames in lightweight gold-tone metal with mineral-glass green lenses and adjustable nose pads.",
    details: [
      "Gold-tone metal frame",
      "Mineral-glass lenses, 100% UV protection",
      "Adjustable nose pads",
      "Includes leather case and cloth",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

function pick(slugs: string[]) {
  return slugs.map((slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    return product;
  });
}

// Same category first, then fill with the newest pieces from elsewhere.
export function getRelatedProducts(product: Product, limit = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "sold-out";
  if (stock <= 5) return "low-stock";
  return "in-stock";
}

export const newArrivals = pick([
  "chevron-leather-shoulder-bag",
  "woven-leather-tote",
  "technical-bomber-jacket",
  "double-faced-wool-coat",
  "single-breasted-wool-blazer",
  "fringed-knit-poncho",
  "striped-wide-leg-trousers",
  "fluid-pull-on-trousers",
]);

export const featuredCollection = {
  eyebrow: "Jewellery & Accessories",
  title: "The finishing touch",
  description:
    "Sculptural gold, fine stones and sharp frames. A considered edit of pieces made to be layered, gifted and kept.",
  href: "/accessories",
  image: unsplash("1469334031218-e382a71b716b", "Woman adjusting oversized sunglasses against a yellow wall"),
  products: pick([
    "diamond-halo-ring",
    "rose-gold-link-bracelet",
    "sculpted-gold-earrings",
    "round-metal-sunglasses",
  ]),
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
