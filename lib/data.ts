export const APP_NAME = "ShopNow";
export const APP_TAGLINE = "Everything You Need, Delivered Fast";
export const APP_ACCENT = "#FF9900";
export const APP_DARK = "#131921";
export const APP_NAV = "#232F3E";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
  highlight?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Products", href: "/products", type: "route" },
  { label: "Deals", href: "#deals", type: "anchor" },
  { label: "Cart", href: "/cart", type: "route" },
  { label: "Account", href: "/account", type: "route" },
  { label: "Orders", href: "/orders", type: "route" },
];

export const footerLinks = {
  "Get to Know Us": [
    { label: "About ShopNow", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Releases", href: "/press" },
    { label: "Investor Relations", href: "/investors" },
  ],
  "Make Money with Us": [
    { label: "Sell on ShopNow", href: "/sell" },
    { label: "Become an Affiliate", href: "/affiliate" },
    { label: "Advertise Your Products", href: "/advertise" },
    { label: "Self-Publish with Us", href: "/publish" },
  ],
  "Payment Products": [
    { label: "ShopNow Business Card", href: "/business-card" },
    { label: "Shop with Points", href: "/points" },
    { label: "Reload Your Balance", href: "/reload" },
    { label: "Currency Converter", href: "/currency" },
  ],
  "Let Us Help You": [
    { label: "Your Account", href: "/account" },
    { label: "Your Orders", href: "/orders" },
    { label: "Shipping Rates", href: "/shipping" },
    { label: "Returns & Replacements", href: "/returns" },
    { label: "Help Center", href: "/help" },
  ],
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export const CATEGORIES = [
  { name: "Electronics", slug: "electronics", image: "/images/category-electronics.jpg" },
  { name: "Clothing", slug: "clothing", image: "/images/category-clothing.jpg" },
  { name: "Jewelry", slug: "jewelry", image: "/images/category-jewelry.jpg" },
  { name: "Home & Kitchen", slug: "home", image: "/images/category-home-kitchen.jpg" },
  { name: "Books", slug: "books", image: "/images/category-books.jpg" },
  { name: "Sports", slug: "sports", image: "/images/category-sports-outdoors.jpg" },
  { name: "Toys", slug: "toys", image: "/images/category-toys-games.jpg" },
  { name: "Beauty", slug: "beauty", image: "/images/category-beauty-products.jpg" },
];

export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Avg. Customer Review", value: "rating-desc" },
  { label: "Newest Arrivals", value: "newest" },
];