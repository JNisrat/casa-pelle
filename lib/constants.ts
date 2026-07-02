import type { Advantage, NavLink, Product, Review } from "./types";

export const SITE_NAME = "Casa Pelle";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/#footer" },
];

export const FOOTER_MENU_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/#contact" },
];

export const CONTACT = {
  email: "luxora@gmail.com",
  phone: "+61 493166737",
};

export const PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "Emily bag",
    price: "$ 200",
    image: "/images/product-1.jpg",
  },
  {
    id: "product-2",
    name: "Sophia tote",
    price: "$ 200",
    image: "/images/product-2.jpg",
  },
  {
    id: "product-3",
    name: "Olivia crossbody",
    price: "$ 200",
    image: "/images/product-3.jpg",
  },
  {
    id: "product-4",
    name: "Isla handbag",
    price: "$ 200",
    image: "/images/product-4.jpg",
  },
  {
    id: "product-featured",
    name: "Weekend traveller",
    price: "$ 200",
    image: "/images/product-featured.jpg",
    featured: true,
  },
];

const DEFAULT_PRODUCT_DETAILS = {
  description:
    "A handcrafted leather handbag made to order with meticulous attention to detail. Personalisation options are available on request.",
  material: "Premium full-grain leather",
  dimensions: "W 30cm × H 25cm × D 12cm",
  lining: "Soft suede interior",
};

function catalogProduct(
  id: string,
  name: string,
  price: string,
  image: string,
  overrides: Partial<Pick<Product, "description" | "material" | "dimensions" | "lining">> = {},
): Product {
  return {
    id,
    name,
    price,
    image,
    ...DEFAULT_PRODUCT_DETAILS,
    ...overrides,
  };
}

export const CATALOG_PRODUCTS: Product[] = [
  catalogProduct("catalog-1", "Emily bag", "$ 200", "/images/product-featured.jpg"),
  catalogProduct("catalog-2", "Sophia tote", "$ 200", "/images/product-2.jpg"),
  catalogProduct("catalog-3", "Olivia crossbody", "$ 200", "/images/product-3.jpg"),
  catalogProduct("catalog-4", "Isla handbag", "$ 200", "/images/product-4.jpg"),
  catalogProduct("catalog-5", "Chocolate shoulder bag", "$ 200", "/images/product-emily.png"),
];

export const ADVANTAGES: Advantage[] = [
  {
    id: "quality",
    title: "High quality",
    description: "Handmade, trendy and stylish leather bag",
    image: "/images/advantage-quality.jpg",
  },
  {
    id: "gift-box",
    title: "Gift Box",
    description: "Comes with a beautiful gift box",
    image: "/images/advantage-gift.jpg",
  },
  {
    id: "customisation",
    title: "Customisation",
    description: "Personalised design options for unique, handcrafted leather bags",
    image: "/images/advantage-custom.jpg",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    name: "Sophia",
    title: "Ordered a handmade and stylish bag",
    date: "12/02/2025",
    quote:
      "I am absolutely in love with my handmade bag! The craftsmanship is exceptional, with every stitch showing the care and skill put into making it. The leather feels premium, soft yet durable, and the design is both stylish and practical. I also appreciated the option to customise it, making it truly one-of-a-kind. It's not just a bag—it's a piece of art I can carry every day!",
    image: "/images/review-left.jpg",
  },
  {
    id: "review-2",
    name: "Emma",
    title: "Ordered a personalised leather tote",
    date: "03/01/2025",
    quote:
      "The customisation options made this bag feel truly mine. Beautiful leather and impeccable finishing.",
    image: "/images/review-right.jpg",
  },
  {
    id: "review-3",
    name: "Olivia",
    title: "Ordered a gift box set",
    date: "18/12/2024",
    quote:
      "Arrived in a stunning gift box. Perfect present for my sister who loves handcrafted accessories.",
    image: "/images/review-left.jpg",
  },
  {
    id: "review-4",
    name: "Ava",
    title: "Ordered a crossbody bag",
    date: "05/11/2024",
    quote:
      "Elegant design and practical size. I use it every day and still get compliments.",
    image: "/images/review-right.jpg",
  },
  {
    id: "review-5",
    name: "Isabella",
    title: "Ordered a bespoke clutch",
    date: "22/10/2024",
    quote:
      "The team captured my vision perfectly. The burgundy accent stitching is gorgeous.",
    image: "/images/review-left.jpg",
  },
  {
    id: "review-6",
    name: "Mia",
    title: "Ordered a weekend bag",
    date: "14/09/2024",
    quote:
      "Spacious, sturdy, and beautifully made. Worth every dollar for the quality.",
    image: "/images/review-right.jpg",
  },
  {
    id: "review-7",
    name: "Charlotte",
    title: "Ordered a mini handbag",
    date: "30/08/2024",
    quote:
      "Compact but fits everything I need. The leather has aged beautifully.",
    image: "/images/review-left.jpg",
  },
  {
    id: "review-8",
    name: "Amelia",
    title: "Ordered a work tote",
    date: "12/07/2024",
    quote:
      "Professional look with artisan character. My favourite bag in the collection.",
    image: "/images/review-right.jpg",
  },
  {
    id: "review-9",
    name: "Harper",
    title: "Ordered a travel bag",
    date: "25/06/2024",
    quote:
      "Held up perfectly on a long trip. Craftsmanship you can feel immediately.",
    image: "/images/review-left.jpg",
  },
  {
    id: "review-10",
    name: "Evelyn",
    title: "Ordered a limited edition piece",
    date: "08/05/2024",
    quote:
      "A true statement piece. Casa Pelle exceeded my expectations on every detail.",
    image: "/images/review-right.jpg",
  },
];
