"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Star, ChevronDown, ChevronRight, X, Check, Heart, ShoppingCart, ArrowUp, ArrowDown, Grid, List, Filter, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { CATEGORIES, SORT_OPTIONS, APP_ACCENT } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import { type Variants } from "framer-motion";

// ─── Mock product data ────────────────────────────────────────────────────────

interface MockProduct {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  isPrime: boolean;
  brand: string;
  inStock: boolean;
}

const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 279.99,
    originalPrice: 399.99,
    description: "Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling.",
    category: "electronics",
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    rating: 4.8,
    reviewCount: 12847,
    badge: "Best Seller",
    isPrime: true,
    brand: "Sony",
    inStock: true,
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    price: 189.99,
    originalPrice: 249.00,
    description: "Active noise cancellation, transparency mode, and adaptive audio for immersive sound.",
    category: "electronics",
    image: "/images/apple-airpods-pro-second-gen.jpg",
    rating: 4.7,
    reviewCount: 34521,
    badge: "Amazon's Choice",
    isPrime: true,
    brand: "Apple",
    inStock: true,
  },
  {
    id: 3,
    title: "Samsung 65-Inch QLED 4K Smart TV",
    price: 897.99,
    originalPrice: 1299.99,
    description: "Quantum Dot technology delivers brilliant color and contrast with Alexa built-in.",
    category: "electronics",
    image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65qef1afxza/gallery/us-qled-qef1-548500-qn65qef1afxza-547033865?$product-details-jpg$",
    rating: 4.6,
    reviewCount: 8923,
    badge: "Deal of the Day",
    isPrime: true,
    brand: "Samsung",
    inStock: true,
  },
  {
    id: 4,
    title: "Levi's Men's 511 Slim Fit Jeans",
    price: 39.99,
    originalPrice: 59.50,
    description: "Classic slim fit with a modern feel. Made with stretch denim for all-day comfort.",
    category: "clothing",
    image: "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b1/Levi_Ackermann_%28Anime%29_character_image.png/revision/latest?cb=20231105181307",
    rating: 4.5,
    reviewCount: 22104,
    isPrime: true,
    brand: "Levi's",
    inStock: true,
  },
  {
    id: 5,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 59.95,
    originalPrice: 99.95,
    description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer in one.",
    category: "home",
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    rating: 4.7,
    reviewCount: 89432,
    badge: "Best Seller",
    isPrime: true,
    brand: "Instant Pot",
    inStock: true,
  },
  {
    id: 6,
    title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display",
    price: 99.99,
    originalPrice: 139.99,
    description: "The thinnest, lightest Kindle Paperwhite yet with a flush-front design and 300 ppi glare-free display.",
    category: "electronics",
    image: "/images/kindle-paperwhite-ereader.jpg",
    rating: 4.6,
    reviewCount: 45678,
    badge: "Amazon's Choice",
    isPrime: true,
    brand: "Amazon",
    inStock: true,
  },
  {
    id: 7,
    title: "Nike Air Max 270 Men's Running Shoes",
    price: 89.97,
    originalPrice: 150.00,
    description: "Max Air unit in the heel delivers all-day comfort. Lightweight mesh upper for breathability.",
    category: "sports",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
    rating: 4.4,
    reviewCount: 15632,
    isPrime: true,
    brand: "Nike",
    inStock: true,
  },
  {
    id: 8,
    title: "LEGO Technic Bugatti Chiron Building Kit",
    price: 299.99,
    originalPrice: 349.99,
    description: "3,599 pieces. Authentic replica with working W16 engine, gearbox, and rear wing.",
    category: "toys",
    image: "/images/lego-technic-bugatti-chiron.jpg",
    rating: 4.9,
    reviewCount: 6721,
    badge: "Top Rated",
    isPrime: false,
    brand: "LEGO",
    inStock: true,
  },
  {
    id: 9,
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    price: 549.99,
    originalPrice: 749.99,
    description: "Laser detects invisible dust. Automatically adapts suction to the task. Up to 60 minutes of run time.",
    category: "home",
    image: "/images/dyson-v15-cordless-vacuum.jpg",
    rating: 4.7,
    reviewCount: 9834,
    isPrime: true,
    brand: "Dyson",
    inStock: true,
  },
  {
    id: 10,
    title: "Pandora Moments Heart Clasp Snake Chain Bracelet",
    price: 65.00,
    originalPrice: 85.00,
    description: "Sterling silver snake chain bracelet with a heart-shaped clasp. Compatible with all Pandora charms.",
    category: "jewelry",
    image: "/images/pandora-heart-clasp-bracelet.jpg",
    rating: 4.8,
    reviewCount: 31204,
    badge: "Best Seller",
    isPrime: true,
    brand: "Pandora",
    inStock: true,
  },
  {
    id: 11,
    title: "CeraVe Moisturizing Cream 19 oz",
    price: 16.08,
    originalPrice: 22.00,
    description: "Daily face and body moisturizer for dry skin with hyaluronic acid and ceramides.",
    category: "beauty",
    image: "/images/cerave-moisturizing-cream-large.jpg",
    rating: 4.8,
    reviewCount: 127453,
    badge: "Amazon's Choice",
    isPrime: true,
    brand: "CeraVe",
    inStock: true,
  },
  {
    id: 12,
    title: "Atomic Habits by James Clear — Hardcover",
    price: 14.99,
    originalPrice: 27.00,
    description: "An easy and proven way to build good habits and break bad ones. #1 New York Times bestseller.",
    category: "books",
    image: "/images/atomic-habits-james-clear-book.jpg",
    rating: 4.8,
    reviewCount: 203847,
    badge: "Best Seller",
    isPrime: true,
    brand: "Avery",
    inStock: true,
  },
  {
    id: 13,
    title: "Logitech MX Master 3S Wireless Mouse",
    price: 79.99,
    originalPrice: 99.99,
    description: "Ultra-fast MagSpeed scrolling, 8K DPI sensor, and quiet clicks for precision work.",
    category: "electronics",
    image: "https://resource.logitech.com/c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-black-new-1.png",
    rating: 4.7,
    reviewCount: 18923,
    isPrime: true,
    brand: "Logitech",
    inStock: true,
  },
  {
    id: 14,
    title: "Adidas Ultraboost 22 Women's Running Shoes",
    price: 119.95,
    originalPrice: 190.00,
    description: "Responsive BOOST midsole and Primeknit upper for a sock-like fit and energy return.",
    category: "sports",
    image: "/images/adidas-ultraboost-22-womens-shoes.jpg",
    rating: 4.5,
    reviewCount: 11287,
    isPrime: true,
    brand: "Adidas",
    inStock: false,
  },
  {
    id: 15,
    title: "Nespresso Vertuo Next Coffee and Espresso Machine",
    price: 119.00,
    originalPrice: 179.00,
    description: "Brews five cup sizes from espresso to alto. One-touch brewing with automatic capsule ejection.",
    category: "home",
    image: "/images/nespresso-vertuo-next-coffee-machine.jpg",
    rating: 4.6,
    reviewCount: 24561,
    badge: "Deal",
    isPrime: true,
    brand: "Nespresso",
    inStock: true,
  },
  {
    id: 16,
    title: "The North Face Men's Thermoball Eco Jacket",
    price: 149.00,
    originalPrice: 220.00,
    description: "Lightweight, packable insulation made from 100% recycled materials. Warm even when wet.",
    category: "clothing",
    image: "/images/north-face-thermoball-eco-jacket.jpg",
    rating: 4.6,
    reviewCount: 7832,
    isPrime: true,
    brand: "The North Face",
    inStock: true,
  },
];

const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 & Above", min: 300, max: Infinity },
];

const RATING_OPTIONS = [4, 3, 2, 1];

const BRANDS = ["Sony", "Apple", "Samsung", "Nike", "Adidas", "Levi's", "Dyson", "LEGO", "Logitech", "Pandora", "CeraVe", "Nespresso", "Instant Pot", "Amazon", "The North Face", "Avery"];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating, count, size = "sm" }: { rating: number; count: number; size?: "sm" | "md" }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const starSize = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <span key={i} className="relative inline-block">
            <Star
              className={`${starSize} ${star.filled ? "fill-[#FF9900] text-[#FF9900]" : "fill-gray-200 text-gray-200"}`}
            />
            {star.partial && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }}
              >
                <Star className={`${starSize} fill-[#FF9900] text-[#FF9900]`} />
              </span>
            )}
          </span>
        ))}
      </div>
      <span className="text-[#007185] text-xs hover:text-[#C7511F] cursor-pointer">
        {(count ?? 0).toLocaleString("en-US")}
      </span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function ProductCard({ product, viewMode }: { product: MockProduct; viewMode: "grid" | "list" }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? JSON.parse(stored) : [];
      const existing = cart.find((i: { id: number }) => i.id === product.id);
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
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex gap-4 p-4 group"
      >
        <Link href={`/products/${product.id}`} className="flex-shrink-0">
          <div className="w-40 h-40 rounded-lg overflow-hidden bg-gray-50 relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {product.badge}
              </span>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-[#0F1111] font-medium text-sm leading-snug hover:text-[#C7511F] transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <button
              onClick={() => setWishlisted((w) => !w)}
              className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>
          <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
          <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mt-auto flex-wrap">
            <span className="text-[#B12704] font-bold text-lg">
              ${(product.price ?? 0).toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-gray-400 line-through text-sm">
                  ${(product.originalPrice ?? 0).toFixed(2)}
                </span>
                <span className="text-[#CC0C39] text-xs font-semibold bg-red-50 px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            )}
            {product.isPrime && (
              <span className="text-[#00A8E1] font-bold text-xs border border-[#00A8E1] px-1.5 py-0.5 rounded">
                prime
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-red-600 text-xs font-medium">Out of Stock</span>
          )}
          {product.inStock && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`mt-1 self-start flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                addedToCart
                  ? "bg-green-500 text-white"
                  : "bg-[#FF9900] hover:bg-[#e68900] text-[#131921]"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-4 h-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </>
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col group"
    >
      <Link href={`/products/${product.id}`} className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
              Out of Stock
            </span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((w) => !w);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[#0F1111] font-medium text-sm leading-snug hover:text-[#C7511F] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span className="text-[#B12704] font-bold text-base">
            ${(product.price ?? 0).toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-xs">
              ${(product.originalPrice ?? 0).toFixed(2)}
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="text-[#CC0C39] text-xs font-semibold">
            Save {discount}%
          </span>
        )}
        {product.isPrime && (
          <span className="text-[#00A8E1] font-bold text-xs">
            FREE Prime Delivery
          </span>
        )}
        {product.inStock && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`mt-1 w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              addedToCart
                ? "bg-green-500 text-white"
                : "bg-[#FF9900] hover:bg-[#e68900] text-[#131921]"
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface Filters {
  categories: string[];
  priceRange: { min: number; max: number } | null;
  minRating: number | null;
  brands: string[];
  primeOnly: boolean;
  inStockOnly: boolean;
}

function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);

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
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    filters.brands.length +
    (filters.primeOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[#0F1111] text-base flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-[#FF9900] text-[#131921] text-xs font-bold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[#007185] text-xs hover:text-[#C7511F] hover:underline transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Prime & Stock */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer mb-2 group">
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              filters.primeOnly ? "bg-[#00A8E1] border-[#00A8E1]" : "border-gray-300 group-hover:border-[#FF9900]"
            }`}
            onClick={() => onChange({ ...filters, primeOnly: !filters.primeOnly })}
          >
            {filters.primeOnly && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <span className="text-sm text-[#0F1111]">
            <span className="text-[#00A8E1] font-bold">prime</span> Eligible
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              filters.inStockOnly ? "bg-[#FF9900] border-[#FF9900]" : "border-gray-300 group-hover:border-[#FF9900]"
            }`}
            onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          >
            {filters.inStockOnly && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <span className="text-sm text-[#0F1111]">In Stock Only</span>
        </label>
      </div>

      {/* Categories */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <button
          onClick={() => setCatOpen((o) => !o)}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <span className="font-bold text-[#0F1111] text-sm">Department</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
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
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        filters.categories.includes(cat.slug)
                          ? "bg-[#FF9900] border-[#FF9900]"
                          : "border-gray-300 group-hover:border-[#FF9900]"
                      }`}
                      onClick={() => toggleCategory(cat.slug)}
                    >
                      {filters.categories.includes(cat.slug) && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-[#0F1111] hover:text-[#C7511F] transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <button
          onClick={() => setPriceOpen((o) => !o)}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-[#0F1111] text-sm">Price</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${priceOpen ? "rotate-180" : ""}`}
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
              <div className="space-y-1.5">
                {PRICE_RANGES.map((range) => {
                  const isActive =
                    filters.priceRange?.min === range.min &&
                    filters.priceRange?.max === range.max;
                  return (
                    <button
                      key={range.label}
                      onClick={() =>
                        onChange({
                          ...filters,
                          priceRange: isActive ? null : { min: range.min, max: range.max },
                        })
                      }
                      className={`flex items-center gap-2 text-sm w-full text-left transition-colors ${
                        isActive ? "text-[#C7511F] font-semibold" : "text-[#007185] hover:text-[#C7511F]"
                      }`}
                    >
                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <button
          onClick={() => setRatingOpen((o) => !o)}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-[#0F1111] text-sm">Avg. Customer Review</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${ratingOpen ? "rotate-180" : ""}`}
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
              <div className="space-y-1.5">
                {RATING_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() =>
                      onChange({
                        ...filters,
                        minRating: filters.minRating === r ? null : r,
                      })
                    }
                    className={`flex items-center gap-2 w-full text-left transition-colors ${
                      filters.minRating === r ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < r ? "fill-[#FF9900] text-[#FF9900]" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#007185] text-xs hover:text-[#C7511F] transition-colors">
                      & Up
                    </span>
                    {filters.minRating === r && (
                      <Check className="w-3 h-3 text-[#FF9900] ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="mb-5">
        <button
          onClick={() => setBrandOpen((o) => !o)}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-[#0F1111] text-sm">Brand</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${brandOpen ? "rotate-180" : ""}`}
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
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        filters.brands.includes(brand)
                          ? "bg-[#FF9900] border-[#FF9900]"
                          : "border-gray-300 group-hover:border-[#FF9900]"
                      }`}
                      onClick={() => toggleBrand(brand)}
                    >
                      {filters.brands.includes(brand) && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-[#0F1111] hover:text-[#C7511F] transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: Filters = {
  categories: [],
  priceRange: null,
  minRating: null,
  brands: [],
  primeOnly: false,
  inStockOnly: false,
};

export default function ProductListingSearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("electronics");
  const [inputValue, setInputValue] = useState("electronics");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim() || "all");
    setCurrentPage(1);
  };

  const filteredProducts = useCallback(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchQuery && searchQuery !== "all") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange!.min &&
          p.price <= filters.priceRange!.max
      );
    }

    if (filters.minRating !== null) {
      result = result.filter((p) => p.rating >= (filters.minRating ?? 0));
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.primeOnly) {
      result = result.filter((p) => p.isPrime);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const allFiltered = filteredProducts();
  const totalPages = Math.ceil(allFiltered.length / ITEMS_PER_PAGE);
  const paginatedProducts = allFiltered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    filters.brands.length +
    (filters.primeOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Search bar strip */}
      <div className="bg-[#232F3E] py-3 px-4">
        <div className="max-w-[1500px] mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden border-2 border-[#FF9900] focus-within:border-[#FF9900]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search ShopNow..."
                className="flex-1 px-4 py-2.5 text-sm text-[#0F1111] outline-none bg-transparent"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="px-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="bg-[#FF9900] hover:bg-[#e68900] text-[#131921] px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search
            </motion.button>
          </form>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#C7511F] hover:underline transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-[#C7511F] hover:underline transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0F1111] font-medium capitalize">{searchQuery}</span>
        </nav>

        {/* Page heading */}
        <h1 className="text-xl font-bold text-[#0F1111] mb-1">
          {allFiltered.length > 0
            ? `${allFiltered.length.toLocaleString("en-US")} results for "${searchQuery}"`
            : `No results for "${searchQuery}"`}
        </h1>
        <p className="text-xs text-gray-500 mb-4">
          Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, allFiltered.length)}-
          {Math.min(currentPage * ITEMS_PER_PAGE, allFiltered.length)} of{" "}
          {allFiltered.length.toLocaleString("en-US")} results
        </p>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {filters.categories.map((slug) => {
              const cat = CATEGORIES.find((c) => c.slug === slug);
              return (
                <span
                  key={slug}
                  className="flex items-center gap-1.5 bg-white border border-[#FF9900] text-[#0F1111] text-xs px-2.5 py-1 rounded-full"
                >
                  {cat?.name ?? slug}
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        categories: f.categories.filter((c) => c !== slug),
                      }))
                    }
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {filters.priceRange && (
              <span className="flex items-center gap-1.5 bg-white border border-[#FF9900] text-[#0F1111] text-xs px-2.5 py-1 rounded-full">
                {PRICE_RANGES.find(
                  (r) =>
                    r.min === filters.priceRange?.min &&
                    r.max === filters.priceRange?.max
                )?.label ?? "Price"}
                <button
                  onClick={() => setFilters((f) => ({ ...f, priceRange: null }))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.minRating !== null && (
              <span className="flex items-center gap-1.5 bg-white border border-[#FF9900] text-[#0F1111] text-xs px-2.5 py-1 rounded-full">
                {filters.minRating}+ Stars
                <button
                  onClick={() => setFilters((f) => ({ ...f, minRating: null }))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.primeOnly && (
              <span className="flex items-center gap-1.5 bg-white border border-[#00A8E1] text-[#0F1111] text-xs px-2.5 py-1 rounded-full">
                Prime Only
                <button
                  onClick={() => setFilters((f) => ({ ...f, primeOnly: false }))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.inStockOnly && (
              <span className="flex items-center gap-1.5 bg-white border border-gray-300 text-[#0F1111] text-xs px-2.5 py-1 rounded-full">
                In Stock
                <button
                  onClick={() => setFilters((f) => ({ ...f, inStockOnly: false }))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-[#007185] text-xs hover:text-[#C7511F] hover:underline transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        <div className="flex gap-5">
          {/* Sidebar — desktop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hidden lg:block w-56 flex-shrink-0"
          >
            <div className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] p-4 sticky top-20">
              <FilterSidebar
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                  setCurrentPage(1);
                }}
                onClear={clearFilters}
              />
            </div>
          </motion.div>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 overflow-y-auto p-4 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-[#0F1111]">Filters</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onChange={(f) => {
                      setFilters(f);
                      setCurrentPage(1);
                    }}
                    onClear={clearFilters}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] px-4 py-3 mb-4 flex items-center gap-3 flex-wrap">
              {/* Mobile filter button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#0F1111] border border-gray-200 rounded-lg px-3 py-1.5 hover:border-[#FF9900] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#FF9900] text-[#131921] text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-[#0F1111] focus:outline-none focus:border-[#FF9900] cursor-pointer"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* View mode */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#FF9900] text-[#131921]"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#FF9900] text-[#131921]"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sponsored banner */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-[#131921] to-[#232F3E] rounded-xl p-4 mb-4 flex items-center gap-4 overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9900] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              </div>
              <Sparkles className="w-5 h-5 text-[#FF9900] flex-shrink-0 relative z-10" />
              <div className="relative z-10">
                <p className="text-white text-sm font-semibold">
                  Prime members save up to 30% on thousands of items
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Free same-day delivery on eligible orders over $35
                </p>
              </div>
              <Link
                href="/products"
                className="ml-auto flex-shrink-0 bg-[#FF9900] hover:bg-[#e68900] text-[#131921] text-xs font-bold px-4 py-2 rounded-full transition-colors relative z-10"
              >
                Try Prime
              </Link>
            </motion.div>

            {/* Products grid/list */}
            {paginatedProducts.length === 0 ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-black/5 p-12 text-center"
              >
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-[#0F1111] mb-2">
                  No results found
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#FF9900] hover:bg-[#e68900] text-[#131921] font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${searchQuery}-${sortBy}-${currentPage}-${viewMode}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
                    : "flex flex-col gap-3"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 flex items-center justify-center gap-2 flex-wrap"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#0F1111] hover:border-[#FF9900] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isNear =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;
                  if (!isNear) {
                    if (page === 2 || page === totalPages - 1) {
                      return (
                        <span key={page} className="text-gray-400 text-sm px-1">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === page
                          ? "bg-[#FF9900] text-[#131921] font-bold shadow-sm"
                          : "border border-gray-200 text-[#0F1111] hover:border-[#FF9900]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-[#0F1111] hover:border-[#FF9900] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                </button>
              </motion.div>
            )}

            {/* Related categories */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-10"
            >
              <h2 className="text-base font-bold text-[#0F1111] mb-4">
                Browse by Department
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <motion.div
                    key={cat.slug}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        setFilters((f) => ({
                          ...f,
                          categories: f.categories.includes(cat.slug)
                            ? f.categories.filter((c) => c !== cat.slug)
                            : [...f.categories, cat.slug],
                        }));
                        setCurrentPage(1);
                      }}
                      className={`w-full bg-white rounded-xl border overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-all duration-200 text-left ${
                        filters.categories.includes(cat.slug)
                          ? "border-[#FF9900] ring-1 ring-[#FF9900]"
                          : "border-black/5 hover:border-[#FF9900]/50"
                      }`}
                    >
                      <div className="aspect-video overflow-hidden bg-gray-50">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0F1111]">
                          {cat.name}
                        </span>
                        {filters.categories.includes(cat.slug) && (
                          <Check className="w-3.5 h-3.5 text-[#FF9900]" />
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}