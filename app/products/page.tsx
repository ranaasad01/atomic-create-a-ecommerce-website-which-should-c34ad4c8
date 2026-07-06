"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Search, Star, ChevronDown, ChevronRight, SlidersHorizontal, X, Heart, ShoppingCart, Eye, Check, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { CATEGORIES, SORT_OPTIONS, type Product } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Inline variants ────────────────────────────────────────────────────────
const cardHover: Variants = {
  rest: { scale: 1, y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: {
    scale: 1.018,
    y: -3,
    boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const sidebarVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const drawerVariant: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: 0.32, ease: "easeOut" } },
  exit: { x: "-100%", transition: { duration: 0.25, ease: "easeIn" } },
};

// ─── Mock product data ───────────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 279.99,
    description: "Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling.",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    rating: { rate: 4.8, count: 3241 },
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation)",
    price: 199.99,
    description: "Active noise cancellation, adaptive transparency, and personalized spatial audio.",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    rating: { rate: 4.7, count: 5812 },
  },
  {
    id: 3,
    title: "Samsung 65-Inch QLED 4K Smart TV",
    price: 899.99,
    description: "Quantum Dot technology delivers brilliant color and contrast for an immersive viewing experience.",
    category: "electronics",
    image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65qef1afxza/gallery/us-qled-qef1-548500-qn65qef1afxza-547033865?$product-details-jpg$",
    rating: { rate: 4.6, count: 1987 },
  },
  {
    id: 4,
    title: "Logitech MX Master 3S Wireless Mouse",
    price: 99.99,
    description: "Ultra-fast scrolling, ergonomic design, and 8K DPI sensor for precision on any surface.",
    category: "electronics",
    image: "https://resource.logitech.com/c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-black-new-1.png",
    rating: { rate: 4.9, count: 4102 },
  },
  {
    id: 5,
    title: "Nike Air Max 270 Running Shoes",
    price: 129.99,
    description: "Max Air unit in the heel delivers all-day comfort with a bold, modern silhouette.",
    category: "clothing",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
    rating: { rate: 4.5, count: 2876 },
  },
  {
    id: 6,
    title: "Levi's 501 Original Fit Jeans",
    price: 59.99,
    description: "The original straight-leg jean with a button fly, made from 100% cotton denim.",
    category: "clothing",
    image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
    rating: { rate: 4.4, count: 6543 },
  },
  {
    id: 7,
    title: "Patagonia Better Sweater Fleece Jacket",
    price: 149.99,
    description: "Classic fleece jacket made from recycled polyester with a full-zip design.",
    category: "clothing",
    image: "/images/patagonia-better-sweater-fleece-jacket.jpg",
    rating: { rate: 4.7, count: 1234 },
  },
  {
    id: 8,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 79.99,
    description: "Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, and more.",
    category: "home",
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    rating: { rate: 4.8, count: 9821 },
  },
  {
    id: 9,
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 649.99,
    description: "Laser reveals microscopic dust. Automatically adapts suction to the task.",
    category: "home",
    image: "/images/dyson-v15-detect-cordless-vacuum.jpg",
    rating: { rate: 4.6, count: 2341 },
  },
  {
    id: 10,
    title: "KitchenAid Artisan Stand Mixer 5-Qt",
    price: 449.99,
    description: "10 speeds and a tilt-head design make this the ultimate baking companion.",
    category: "home",
    image: "/images/kitchenaid-artisan-stand-mixer.jpg",
    rating: { rate: 4.9, count: 7654 },
  },
  {
    id: 11,
    title: "Pandora Moments Heart Clasp Snake Chain Bracelet",
    price: 89.99,
    description: "Sterling silver snake chain bracelet with a heart-shaped clasp, compatible with all Pandora charms.",
    category: "jewelry",
    image: "/images/pandora-heart-clasp-snake-chain-bracelet.jpg",
    rating: { rate: 4.5, count: 3421 },
  },
  {
    id: 12,
    title: "Swarovski Crystal Tennis Necklace",
    price: 199.99,
    description: "Elegant tennis necklace featuring brilliant-cut Swarovski crystals in a rhodium-plated setting.",
    category: "jewelry",
    image: "/images/swarovski-crystal-tennis-necklace.jpg",
    rating: { rate: 4.6, count: 876 },
  },
  {
    id: 13,
    title: "Atomic Habits by James Clear",
    price: 16.99,
    description: "The #1 New York Times bestseller on building good habits and breaking bad ones.",
    category: "books",
    image: "/images/atomic-habits-james-clear-book.jpg",
    rating: { rate: 4.9, count: 45231 },
  },
  {
    id: 14,
    title: "The Psychology of Money by Morgan Housel",
    price: 14.99,
    description: "Timeless lessons on wealth, greed, and happiness through 19 short stories.",
    category: "books",
    image: "/images/psychology-of-money-morgan-housel-book.jpg",
    rating: { rate: 4.8, count: 23456 },
  },
  {
    id: 15,
    title: "Bowflex SelectTech 552 Adjustable Dumbbells",
    price: 399.99,
    description: "Replaces 15 sets of weights. Adjusts from 5 to 52.5 lbs in 2.5-lb increments.",
    category: "sports",
    image: "/images/bowflex-selecttech-552-adjustable-dumbbells.jpg",
    rating: { rate: 4.7, count: 5678 },
  },
  {
    id: 16,
    title: "Peloton Bike+ Indoor Exercise Bike",
    price: 2495.00,
    description: "Auto-follow resistance, rotating 24-inch HD touchscreen, and live classes.",
    category: "sports",
    image: "/images/peloton-bike-plus-indoor-exercise.jpg",
    rating: { rate: 4.5, count: 3210 },
  },
  {
    id: 17,
    title: "LEGO Technic Bugatti Chiron 42083",
    price: 349.99,
    description: "1:8 scale model with 3,599 pieces, working W16 engine, and aerodynamic spoiler.",
    category: "toys",
    image: "/images/lego-technic-bugatti-chiron-42083.jpg",
    rating: { rate: 4.9, count: 4321 },
  },
  {
    id: 18,
    title: "Nintendo Switch OLED Model",
    price: 349.99,
    description: "7-inch OLED screen, enhanced audio, 64GB internal storage, and a wide adjustable stand.",
    category: "toys",
    image: "/images/nintendo-switch-oled-model.jpg",
    rating: { rate: 4.8, count: 12345 },
  },
  {
    id: 19,
    title: "Charlotte Tilbury Pillow Talk Lipstick",
    price: 34.99,
    description: "The iconic nude-pink shade loved by makeup artists worldwide. Long-lasting formula.",
    category: "beauty",
    image: "/images/charlotte-tilbury-pillow-talk-lipstick.jpg",
    rating: { rate: 4.7, count: 8765 },
  },
  {
    id: 20,
    title: "Dyson Airwrap Multi-Styler Complete",
    price: 599.99,
    description: "Styles, waves, curls, and dries with no extreme heat. Includes 6 attachments.",
    category: "beauty",
    image: "/images/dyson-airwrap-multi-styler-complete.jpg",
    rating: { rate: 4.6, count: 6543 },
  },
  {
    id: 21,
    title: "iPad Pro 12.9-inch M2 Chip",
    price: 1099.99,
    description: "Superfast M2 chip, Liquid Retina XDR display, and Apple Pencil hover support.",
    category: "electronics",
    image: "/images/ipad-pro-12-9-inch-m2-chip.jpg",
    rating: { rate: 4.8, count: 4567 },
  },
  {
    id: 22,
    title: "Adidas Ultraboost 23 Running Shoes",
    price: 189.99,
    description: "Responsive BOOST midsole and Primeknit+ upper for an incredible running experience.",
    category: "clothing",
    image: "/images/adidas-ultraboost-23-running-shoes.jpg",
    rating: { rate: 4.6, count: 3456 },
  },
  {
    id: 23,
    title: "Nespresso Vertuo Next Coffee Machine",
    price: 159.99,
    description: "Brews 5 cup sizes with Centrifusion technology. Includes 12 complimentary capsules.",
    category: "home",
    image: "/images/nespresso-vertuo-next-coffee-machine.jpg",
    rating: { rate: 4.5, count: 5432 },
  },
  {
    id: 24,
    title: "The 48 Laws of Power by Robert Greene",
    price: 18.99,
    description: "A fascinating study of power dynamics with 48 laws distilled from history's greatest minds.",
    category: "books",
    image: "/images/48-laws-of-power-robert-greene-book.jpg",
    rating: { rate: 4.7, count: 34567 },
  },
];

const BRANDS = [
  "Apple", "Samsung", "Sony", "Nike", "Adidas", "Levi's",
  "Dyson", "KitchenAid", "Logitech", "LEGO", "Nintendo", "Nespresso",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarRating({ rate, count, size = "sm" }: { rate: number; count: number; size?: "sm" | "xs" }) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const sz = size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} className={`${sz} fill-[#FF9900] text-[#FF9900]`} />
        ))}
        {half && (
          <span className="relative inline-block">
            <Star className={`${sz} text-gray-300`} />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${sz} fill-[#FF9900] text-[#FF9900]`} />
            </span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} className={`${sz} text-gray-300`} />
        ))}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">
        ({(count ?? 0).toLocaleString("en-US")})
      </span>
    </div>
  );
}

function PriceDisplay({ price }: { price: number }) {
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100).toString().padStart(2, "0");
  return (
    <div className="flex items-start gap-0.5">
      <span className="text-sm text-[#B12704] font-medium mt-0.5">$</span>
      <span className="text-2xl font-bold text-[#B12704] leading-none">{dollars}</span>
      <span className="text-sm text-[#B12704] font-medium mt-0.5">{cents}</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart: Array<Product & { quantity: number }> = stored ? JSON.parse(stored) : [];
      const existing = cart.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity ?? 0) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("shopnow-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1800);
    } catch {
      // silent
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  const originalPrice = (product.price * 1.25).toFixed(2);
  const discount = 20;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover="hover"
    >
      <motion.div variants={cardHover} initial="rest" whileHover="hover" className="group">
        <Link
          href={`/products/${product.id}`}
          className="block bg-white rounded-xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
        >
          {/* Image */}
          <div className="relative bg-gray-50 aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
              }}
            />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <span className="bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
              {product.rating.count > 5000 && (
                <span className="bg-[#FF9900] text-[#131921] text-[10px] font-bold px-1.5 py-0.5 rounded">
                  BESTSELLER
                </span>
              )}
            </div>
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs text-[#007185] font-medium mb-0.5 capitalize">
              {product.category}
            </p>
            <h3 className="text-sm text-[#0F1111] font-medium leading-snug line-clamp-2 mb-1.5 group-hover:text-[#C7511F] transition-colors">
              {product.title}
            </h3>
            <StarRating rate={product.rating.rate} count={product.rating.count} />
            <div className="mt-2 flex items-end justify-between">
              <div>
                <PriceDisplay price={product.price} />
                <p className="text-xs text-gray-400 line-through mt-0.5">${originalPrice}</p>
              </div>
              <span className="text-xs text-[#007600] font-medium">In Stock</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`mt-2.5 w-full py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                addedToCart
                  ? "bg-[#007600] text-white"
                  : "bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111]"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
interface FilterState {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
}

function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}) {
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 3000 ? 1 : 0);

  return (
    <motion.aside
      variants={sidebarVariant}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[#0F1111] text-base flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#FF9900]" />
          Filters
          {activeCount > 0 && (
            <span className="bg-[#FF9900] text-[#131921] text-xs font-bold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-0 divide-y divide-gray-100">
        {/* Category */}
        <div className="py-3">
          <button
            onClick={() => setCatOpen((o) => !o)}
            className="flex items-center justify-between w-full text-sm font-semibold text-[#0F1111] hover:text-[#C7511F] transition-colors"
          >
            Category
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {catOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat.slug}
                      className="flex items-center gap-2 cursor-pointer group/check"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          filters.categories.includes(cat.slug)
                            ? "bg-[#FF9900] border-[#FF9900]"
                            : "border-gray-300 group-hover/check:border-[#FF9900]"
                        }`}
                        onClick={() => toggleCategory(cat.slug)}
                      >
                        {filters.categories.includes(cat.slug) && (
                          <Check className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-[#0F1111] group-hover/check:text-[#C7511F] transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="py-3">
          <button
            onClick={() => setPriceOpen((o) => !o)}
            className="flex items-center justify-between w-full text-sm font-semibold text-[#0F1111] hover:text-[#C7511F] transition-colors"
          >
            Price Range
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${priceOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {priceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>${filters.minPrice}</span>
                    <span>${filters.maxPrice === 3000 ? "3000+" : filters.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3000}
                    step={10}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      onChange({ ...filters, maxPrice: Number(e.target.value) })
                    }
                    className="w-full h-1.5 rounded-full appearance-none bg-gray-200 accent-[#FF9900] cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {[50, 100, 500, 1000].map((p) => (
                      <button
                        key={p}
                        onClick={() => onChange({ ...filters, maxPrice: p })}
                        className={`flex-1 text-xs py-1 rounded border transition-colors ${
                          filters.maxPrice === p
                            ? "border-[#FF9900] bg-[#FFF3CD] text-[#0F1111]"
                            : "border-gray-200 text-gray-500 hover:border-[#FF9900]"
                        }`}
                      >
                        ${p}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating */}
        <div className="py-3">
          <button
            onClick={() => setRatingOpen((o) => !o)}
            className="flex items-center justify-between w-full text-sm font-semibold text-[#0F1111] hover:text-[#C7511F] transition-colors"
          >
            Avg. Customer Review
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${ratingOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {ratingOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1.5">
                  {[4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      onClick={() =>
                        onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })
                      }
                      className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-colors ${
                        filters.minRating === r
                          ? "bg-[#FFF3CD]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < r ? "fill-[#FF9900] text-[#FF9900]" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#007185]">& Up</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand */}
        <div className="py-3">
          <button
            onClick={() => setBrandOpen((o) => !o)}
            className="flex items-center justify-between w-full text-sm font-semibold text-[#0F1111] hover:text-[#C7511F] transition-colors"
          >
            Brand
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${brandOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {brandOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1.5">
                  {BRANDS.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer group/check"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          filters.brands.includes(brand)
                            ? "bg-[#FF9900] border-[#FF9900]"
                            : "border-gray-300 group-hover/check:border-[#FF9900]"
                        }`}
                        onClick={() => toggleBrand(brand)}
                      >
                        {filters.brands.includes(brand) && (
                          <Check className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-[#0F1111] group-hover/check:text-[#C7511F] transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* In Stock */}
        <div className="py-3">
          <label className="flex items-center gap-2 cursor-pointer group/check">
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                filters.inStock
                  ? "bg-[#FF9900] border-[#FF9900]"
                  : "border-gray-300 group-hover/check:border-[#FF9900]"
              }`}
              onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
            >
              {filters.inStock && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-sm font-semibold text-[#0F1111] group-hover/check:text-[#C7511F] transition-colors">
              In Stock Only
            </span>
          </label>
        </div>
      </div>
    </motion.aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const DEFAULT_FILTERS: FilterState = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 3000,
  minRating: 0,
  inStock: false,
};

export default function ProductsPage() {
  const t = useTranslations();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const cat = params.get("category");
    const sort = params.get("sort");
    if (q) setSearchQuery(q);
    if (cat) setFilters((f) => ({ ...f, categories: [cat] }));
    if (sort) setSortBy(sort);
  }, []);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.categories.length === 1) params.set("category", filters.categories[0]);
    if (sortBy !== "featured") params.set("sort", sortBy);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, filters.categories, sortBy]);

  const filtered = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.some((b) => p.title.toLowerCase().includes(b.toLowerCase()))
      );
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating.rate >= filters.minRating);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        result.sort((a, b) => b.rating.count - a.rating.count);
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilters(f);
    setPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
    setPage(1);
  }, []);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.maxPrice < 3000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-2.5">
          <nav className="flex items-center gap-1.5 text-xs text-[#007185]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#C7511F] hover:underline transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#0F1111] font-medium">
              {filters.categories.length === 1
                ? CATEGORIES.find((c) => c.slug === filters.categories[0])?.name ?? "Products"
                : "All Products"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-4">
        {/* Search bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
            }}
            className="flex gap-0 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products, brands, categories..."
              className="flex-1 px-4 py-2.5 text-sm text-[#0F1111] placeholder-gray-400 outline-none bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setPage(1);
                }}
                className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="bg-[#FF9900] hover:bg-[#F7CA00] px-5 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 text-[#131921]" />
            </button>
          </form>
        </motion.div>

        <div className="flex gap-5">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4 sticky top-20">
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl border border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-[#0F1111] border border-gray-300 rounded-lg px-3 py-1.5 hover:border-[#FF9900] transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-[#FF9900] text-[#131921] text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Results count */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold text-[#0F1111]">
                      {filtered.length.toLocaleString("en-US")}
                    </span>{" "}
                    result{filtered.length !== 1 ? "s" : ""}
                    {searchQuery && (
                      <span className="text-[#007185]"> for &ldquo;{searchQuery}&rdquo;</span>
                    )}
                  </span>
                </div>

                {/* Active filter chips */}
                <div className="flex flex-wrap gap-1.5">
                  {filters.categories.map((slug) => {
                    const cat = CATEGORIES.find((c) => c.slug === slug);
                    return (
                      <span
                        key={slug}
                        className="flex items-center gap-1 bg-[#FFF3CD] border border-[#FF9900]/30 text-[#0F1111] text-xs px-2 py-0.5 rounded-full"
                      >
                        {cat?.name ?? slug}
                        <button
                          onClick={() =>
                            handleFilterChange({
                              ...filters,
                              categories: filters.categories.filter((c) => c !== slug),
                            })
                          }
                          className="hover:text-red-500 transition-colors"
                          aria-label={`Remove ${cat?.name} filter`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                  {filters.minRating > 0 && (
                    <span className="flex items-center gap-1 bg-[#FFF3CD] border border-[#FF9900]/30 text-[#0F1111] text-xs px-2 py-0.5 rounded-full">
                      {filters.minRating}+ Stars
                      <button
                        onClick={() => handleFilterChange({ ...filters, minRating: 0 })}
                        className="hover:text-red-500 transition-colors"
                        aria-label="Remove rating filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.maxPrice < 3000 && (
                    <span className="flex items-center gap-1 bg-[#FFF3CD] border border-[#FF9900]/30 text-[#0F1111] text-xs px-2 py-0.5 rounded-full">
                      Under ${filters.maxPrice}
                      <button
                        onClick={() => handleFilterChange({ ...filters, maxPrice: 3000 })}
                        className="hover:text-red-500 transition-colors"
                        aria-label="Remove price filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Sort + View */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 whitespace-nowrap">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(1);
                    }}
                    className="text-sm text-[#0F1111] border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:border-[#FF9900] transition-colors cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View mode toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2.5 py-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#FF9900] text-[#131921]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="9" y="1" width="6" height="6" rx="1" />
                      <rect x="1" y="9" width="6" height="6" rx="1" />
                      <rect x="9" y="9" width="6" height="6" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-2.5 py-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#FF9900] text-[#131921]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <rect x="1" y="2" width="14" height="2.5" rx="1" />
                      <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
                      <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Product Grid / List */}
            {paginated.length === 0 ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-black/5 p-12 text-center"
              >
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0F1111] mb-2">No results found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your filters or search terms to find what you are looking for.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-semibold px-6 py-2 rounded-full text-sm transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {paginated.map((product, i) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex gap-4 bg-white rounded-xl border border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
                    >
                      <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/product-placeholder.jpg";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#007185] font-medium capitalize mb-0.5">
                          {product.category}
                        </p>
                        <h3 className="text-sm font-medium text-[#0F1111] group-hover:text-[#C7511F] transition-colors line-clamp-2 mb-1">
                          {product.title}
                        </h3>
                        <StarRating rate={product.rating.rate} count={product.rating.count} />
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <PriceDisplay price={product.price} />
                          <span className="text-xs text-[#007600] font-medium">In Stock</span>
                          <span className="text-xs text-gray-400 line-through">
                            ${(product.price * 1.25).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col gap-2 justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            try {
                              const stored = localStorage.getItem("shopnow-cart");
                              const cart: Array<Product & { quantity: number }> = stored
                                ? JSON.parse(stored)
                                : [];
                              const existing = cart.find((item) => item.id === product.id);
                              if (existing) {
                                existing.quantity = (existing.quantity ?? 0) + 1;
                              } else {
                                cart.push({ ...product, quantity: 1 });
                              }
                              localStorage.setItem("shopnow-cart", JSON.stringify(cart));
                              window.dispatchEvent(new Event("cart-updated"));
                            } catch {
                              // silent
                            }
                          }}
                          className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-semibold px-4 py-1.5 rounded-full text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                        <button className="border border-gray-200 hover:border-[#FF9900] text-gray-500 hover:text-[#C7511F] px-4 py-1.5 rounded-full text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap">
                          <Eye className="w-3.5 h-3.5" />
                          Quick View
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 flex items-center justify-center gap-1.5"
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-[#0F1111] hover:border-[#FF9900] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pg = i + 1;
                  if (
                    pg === 1 ||
                    pg === totalPages ||
                    (pg >= page - 1 && pg <= page + 1)
                  ) {
                    return (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          pg === page
                            ? "bg-[#FF9900] text-[#131921]"
                            : "border border-gray-200 text-[#0F1111] hover:border-[#FF9900]"
                        }`}
                      >
                        {pg}
                      </button>
                    );
                  }
                  if (pg === page - 2 || pg === page + 2) {
                    return (
                      <span key={pg} className="text-gray-400 text-sm px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-[#0F1111] hover:border-[#FF9900] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </motion.div>
            )}

            {/* Page info */}
            {filtered.length > 0 && (
              <p className="text-center text-xs text-gray-400 mt-3">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
                {filtered.length.toLocaleString("en-US")} products
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              variants={drawerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 overflow-y-auto shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-bold text-[#0F1111] text-base">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <FilterPanel
                  filters={filters}
                  onChange={(f) => {
                    handleFilterChange(f);
                  }}
                  onReset={() => {
                    handleReset();
                    setMobileFiltersOpen(false);
                  }}
                />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-semibold py-2.5 rounded-full text-sm transition-colors"
                >
                  Show {filtered.length.toLocaleString("en-US")} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}