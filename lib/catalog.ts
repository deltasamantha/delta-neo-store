// Sample storefront data. Replace with database queries once the catalog schema exists.

export type Image = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number; // minor units (cents)
  image: Image;
  badge?: string;
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

export const newArrivals: Product[] = [
  {
    slug: "structured-top-handle-bag",
    name: "Structured top handle bag",
    price: 245000,
    badge: "New in",
    image: unsplash("1584917865442-de89df76afd3", "Red structured leather top-handle bag"),
  },
  {
    slug: "woven-leather-tote",
    name: "Woven leather tote",
    price: 189000,
    badge: "New in",
    image: unsplash("1590874103328-eac38a683ce7", "Orange woven tote bag with leather handles"),
  },
  {
    slug: "technical-bomber-jacket",
    name: "Technical bomber jacket",
    price: 210000,
    image: unsplash("1591047139829-d91aecb6caea", "Rust bomber jacket on a hanger"),
  },
  {
    slug: "double-faced-wool-coat",
    name: "Double-faced wool coat",
    price: 360000,
    image: unsplash("1483985988355-763728e1935b", "Woman in a burgundy wool coat carrying shopping bags"),
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather biker jacket",
    price: 420000,
    badge: "Exclusive",
    image: unsplash("1551028719-00167b16eac5", "Black leather biker jacket on a hanger"),
  },
  {
    slug: "fringed-knit-poncho",
    name: "Fringed knit poncho",
    price: 135000,
    image: unsplash("1434389677669-e08b4cac3105", "Cream knitted poncho with fringe on a hanger"),
  },
  {
    slug: "striped-wide-leg-trousers",
    name: "Striped wide-leg trousers",
    price: 128000,
    image: unsplash("1509631179647-0177331693ae", "Woman in black and white striped wide-leg trousers against a teal wall"),
  },
  {
    slug: "pull-on-trousers",
    name: "Fluid pull-on trousers",
    price: 115000,
    image: unsplash("1594633312681-425c7b97ccd1", "Blush pink fluid trousers"),
  },
];

export const featuredCollection = {
  eyebrow: "Jewellery & Accessories",
  title: "The finishing touch",
  description:
    "Sculptural gold, fine stones and sharp frames. A considered edit of pieces made to be layered, gifted and kept.",
  href: "/accessories",
  image: unsplash("1469334031218-e382a71b716b", "Woman adjusting oversized sunglasses against a yellow wall"),
  products: [
    {
      slug: "diamond-halo-ring",
      name: "Diamond halo ring",
      price: 640000,
      image: unsplash("1605100804763-247f67b3557e", "Rose gold diamond halo ring on black stone"),
    },
    {
      slug: "rose-gold-link-bracelet",
      name: "Rose gold link bracelet",
      price: 380000,
      image: unsplash("1611591437281-460bfbe1220a", "Rose gold link bracelet on a pink background"),
    },
    {
      slug: "sculpted-gold-earrings",
      name: "Sculpted gold earrings",
      price: 155000,
      badge: "New in",
      image: unsplash("1617038220319-276d3cfab638", "Sculptural gold earrings resting on a pale shell"),
    },
    {
      slug: "round-metal-sunglasses",
      name: "Round metal sunglasses",
      price: 52000,
      image: unsplash("1511499767150-a48a237f0083", "Round gold-frame sunglasses on a white surface"),
    },
  ] satisfies Product[],
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
