"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, ChevronUp, Star, ShoppingCart, Heart, X, Check, Filter, Grid3X3, List, Search } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/data";
import { useTranslations } from "next-intl";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category: string;
  brand: string;
  prime: boolean;
  inStock: boolean;
}

interface Filters {
  categories: string[];
  brands: string[];
  minPrice: string;
  maxPrice: string;
  minRating: number;
  prime: boolean;
  inStock: boolean;
}

// ─── Mock Products ────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 18432,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    badge: "Best Seller",
    category: "Electronics",
    brand: "Sony",
    prime: true,
    inStock: true,
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation)",
    price: 189.99,
    originalPrice: 249.0,
    rating: 4.9,
    reviewCount: 34521,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    badge: "Deal of the Day",
    category: "Electronics",
    brand: "Apple",
    prime: true,
    inStock: true,
  },
  {
    id: 3,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 89234,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    badge: "40% Off",
    category: "Home & Kitchen",
    brand: "Instant Pot",
    prime: true,
    inStock: true,
  },
  {
    id: 4,
    title: "Kindle Paperwhite (16 GB) — Waterproof",
    price: 99.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviewCount: 56789,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    badge: "Prime Deal",
    category: "Electronics",
    brand: "Amazon",
    prime: true,
    inStock: true,
  },
  {
    id: 5,
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 39.99,
    originalPrice: 69.5,
    rating: 4.5,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    badge: "Top Pick",
    category: "Clothing",
    brand: "Levi's",
    prime: false,
    inStock: true,
  },
  {
    id: 6,
    title: "Ninja AF101 Air Fryer 4 Quart",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 41230,
    image: "https://m.media-amazon.com/images/I/71+8uTMDRFL.jpg",
    badge: "Lightning Deal",
    category: "Home & Kitchen",
    brand: "Ninja",
    prime: true,
    inStock: true,
  },
  {
    id: 7,
    title: 'Samsung 65" 4K QLED Smart TV',
    price: 699.99,
    originalPrice: 999.99,
    rating: 4.6,
    reviewCount: 15678,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80",
    badge: "30% Off",
    category: "Electronics",
    brand: "Samsung",
    prime: true,
    inStock: true,
  },
  {
    id: 8,
    title: "Dyson V15 Detect Cordless Vacuum",
    price: 549.99,
    originalPrice: 749.99,
    rating: 4.8,
    reviewCount: 9823,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "Editor's Choice",
    category: "Home & Kitchen",
    brand: "Dyson",
    prime: true,
    inStock: true,
  },
  {
    id: 9,
    title: "Nike Air Max 270 Running Shoes",
    price: 89.99,
    originalPrice: 150.0,
    rating: 4.4,
    reviewCount: 31200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "40% Off",
    category: "Clothing",
    brand: "Nike",
    prime: true,
    inStock: true,
  },
  {
    id: 10,
    title: "Atomic Habits by James Clear",
    price: 11.99,
    originalPrice: 27.0,
    rating: 4.9,
    reviewCount: 112000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    badge: "#1 Best Seller",
    category: "Books",
    brand: "Penguin",
    prime: true,
    inStock: true,
  },
  {
    id: 11,
    title: "LEGO Technic Bugatti Chiron 42083",
    price: 189.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 7654,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
    badge: "45% Off",
    category: "Toys",
    brand: "LEGO",
    prime: true,
    inStock: true,
  },
  {
    id: 12,
    title: "Anker 65W USB-C Charging Station (4-Port)",
    price: 45.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 22100,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
    badge: "Best Value",
    category: "Electronics",
    brand: "Anker",
    prime: true,
    inStock: true,
  },
  {
    id: 13,
    title: "CeraVe Moisturizing Cream 19 oz",
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviewCount: 67890,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
    badge: "Dermatologist Recommended",
    category: "Beauty",
    brand: "CeraVe",
    prime: true,
    inStock: true,
  },
  {
    id: 14,
    title: "Adidas Ultraboost 22 Running Shoes",
    price: 119.99,
    originalPrice: 190.0,
    rating: 4.5,
    reviewCount: 18900,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
    badge: "37% Off",
    category: "Clothing",
    brand: "Adidas",
    prime: false,
    inStock: false,
  },
  {
    id: 15,
    title: "Moleskine Classic Hardcover Notebook, Large",
    price: 22.49,
    originalPrice: 29.99,
    rating: 4.6,
    reviewCount: 14320,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
    badge: undefined,
    category: "Books",
    brand: "Moleskine",
    prime: true,
    inStock: true,
  },
  {
    id: 16,
    title: "Fitbit Charge 5 Advanced Fitness Tracker",
    price: 99.95,
    originalPrice: 179.95,
    rating: 4.3,
    reviewCount: 28760,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80",
    badge: "44% Off",
    category: "Electronics",
    brand: "Fitbit",
    prime: true,
    inStock: true,
  },
];

const BRANDS = [...new Set(ALL_PRODUCTS.map((p) => p.brand))].sort();
const CATEGORY_NAMES = [...new Set(ALL_PRODUCTS.map((p) => p.category))].sort();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
            {i < full ? (
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill="#10B981"
              />
            ) : i === full && half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill={`url(#half-${i})`}
                />
              </>
            ) : (
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill="#D1D5DB"
              />
            )}
          </svg>
        ))}
      </div>
      <span className="text-xs text-[#0E7490] hover:underline cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose?: () => void;
}

function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const Section = ({
    label,
    open,
    toggle,
    children,
  }: {
    label: string;
    open: boolean;
    toggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-sm font-semibold text-[#0F2027] mb-1"
      >
        {label}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="mt-2 space-y-1.5">{children}</div>}
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-[#0F2027] text-base flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
          Filters
        </span>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category */}
      <Section label="Category" open={catOpen} toggle={() => setCatOpen((v) => !v)}>
        {CATEGORY_NAMES.map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer group">
            <div
              onClick={() => toggleCategory(cat)}
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                filters.categories.includes(cat)
                  ? "bg-[#10B981] border-[#10B981]"
                  : "border-gray-300 group-hover:border-[#10B981]"
              }`}
            >
              {filters.categories.includes(cat) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-[#0F2027]">{cat}</span>
          </label>
        ))}
      </Section>

      {/* Brand */}
      <Section label="Brand" open={brandOpen} toggle={() => setBrandOpen((v) => !v)}>
        {BRANDS.map((brand) => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer group">
            <div
              onClick={() => toggleBrand(brand)}
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                filters.brands.includes(brand)
                  ? "bg-[#10B981] border-[#10B981]"
                  : "border-gray-300 group-hover:border-[#10B981]"
              }`}
            >
              {filters.brands.includes(brand) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-[#0F2027]">{brand}</span>
          </label>
        ))}
      </Section>

      {/* Price */}
      <Section label="Price Range" open={priceOpen} toggle={() => setPriceOpen((v) => !v)}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>
      </Section>

      {/* Rating */}
      <Section label="Avg. Customer Review" open={ratingOpen} toggle={() => setRatingOpen((v) => !v)}>
        {[4, 3, 2, 1].map((r) => (
          <button
            key={r}
            onClick={() =>
              onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })
            }
            className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded-lg transition-colors ${
              filters.minRating === r
                ? "bg-[#ECFDF5] text-[#10B981] font-semibold"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                  <polygon
                    points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                    fill={i < r ? "#10B981" : "#D1D5DB"}
                  />
                </svg>
              ))}
            </div>
            <span className="text-xs">& Up</span>
          </button>
        ))}
      </Section>

      {/* Toggles */}
      <div className="py-4 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Prime Only</span>
          <button
            onClick={() => onChange({ ...filters, prime: !filters.prime })}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              filters.prime ? "bg-[#10B981]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                filters.prime ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          <button
            onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              filters.inStock ? "bg-[#10B981]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                filters.inStock ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>
      </div>

      <button
        onClick={() =>
          onChange({
            categories: [],
            brands: [],
            minPrice: "",
            maxPrice: "",
            minRating: 0,
            prime: false,
            inStock: false,
          })
        }
        className="w-full text-sm text-[#10B981] hover:text-[#059669] font-medium py-1 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, view }: { product: Product; view: "grid" | "list" }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("shopnow-cart");
      const cart = stored ? (JSON.parse(stored) as Array<Product & { quantity: number }>) : [];
      const existing = cart.find((i) => i.id === product.id);
      const updated = existing
        ? cart.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...cart, { ...product, quantity: 1 }];
      localStorage.setItem("shopnow-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch {
      // silently fail
    }
  };

  const discount = calcDiscount(product.originalPrice, product.price);

  if (view === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex gap-4 p-4"
      >
        <Link href={`/product-detail?id=${product.id}`} className="flex-shrink-0">
          <div className="w-36 h-36 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/144x144?text=Product";
              }}
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {product.badge && (
                <span className="inline-block bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded mb-1">
                  {product.badge}
                </span>
              )}
              <Link href={`/product-detail?id=${product.id}`}>
                <h3 className="text-sm font-medium text-[#0F2027] hover:text-[#10B981] line-clamp-2 transition-colors">
                  {product.title}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
            </div>
            <button
              onClick={() => setWishlisted((v) => !v)}
              className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          <div className="mt-1.5">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#0F2027]">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-[#10B981]">{discount}% off</span>
              </>
            )}
          </div>

          {product.prime && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs font-bold text-[#0E7490] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                ✓ Prime
              </span>
              <span className="text-xs text-gray-500">FREE delivery</span>
            </div>
          )}

          {!product.inStock && (
            <p className="text-xs text-red-500 font-medium mt-1">Out of Stock</p>
          )}

          <div className="mt-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                addedToCart
                  ? "bg-[#059669] text-white"
                  : product.inStock
                  ? "bg-[#10B981] hover:bg-[#059669] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {addedToCart ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Added!
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden group"
    >
      <Link href={`/product-detail?id=${product.id}`} className="relative block">
        <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=Product";
            }}
          />
        </div>
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
        <Link href={`/product-detail?id=${product.id}`}>
          <h3 className="text-sm font-medium text-[#0F2027] hover:text-[#10B981] line-clamp-2 transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1.5">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base font-bold text-[#0F2027]">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-[#10B981]">{discount}% off</span>
            </>
          )}
        </div>

        {product.prime && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs font-bold text-[#0E7490] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
              ✓ Prime
            </span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              addedToCart
                ? "bg-[#059669] text-white"
                : product.inStock
                ? "bg-[#10B981] hover:bg-[#059669] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function ProductsPageInner() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const [filters, setFilters] = useState<Filters>({
    categories: categoryParam ? [categoryParam] : [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    minRating: 0,
    prime: false,
    inStock: false,
  });
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryParam);

  // Sync category param
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const filteredProducts = useCallback(() => {
    let result = [...ALL_PRODUCTS];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Brand
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price
    if (filters.minPrice !== "") {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice !== "") {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Prime
    if (filters.prime) {
      result = result.filter((p) => p.prime);
    }

    // In Stock
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
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
  }, [filters, sortBy, searchQuery]);

  const products = filteredProducts();

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.prime ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Page Header */}
      <div className="bg-[#0F2027] text-white py-8">
        <div className="max-w-[1500px] mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
              </h1>
              <p className="text-[#93C5FD] text-sm mt-1">
                {products.length.toLocaleString("en-US")} results
              </p>
            </div>

            {/* Search bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setSearchQuery((fd.get("q") as string) ?? "");
              }}
              className="flex items-center gap-2 bg-white rounded-lg overflow-hidden max-w-sm w-full"
            >
              <input
                name="q"
                defaultValue={searchQuery}
                placeholder="Search products…"
                className="flex-1 px-3 py-2 text-sm text-[#0F2027] outline-none"
              />
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#059669] px-3 py-2 transition-colors"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-[#0F2027] hover:border-[#10B981] transition-colors"
          >
            <Filter className="w-4 h-4 text-[#10B981]" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[#10B981] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0F2027] bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${
                  view === "grid"
                    ? "bg-[#10B981] text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${
                  view === "list"
                    ? "bg-[#10B981] text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel filters={filters} onChange={setFilters} />
          </aside>

          {/* Product Grid / List */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-[#0F2027] mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      brands: [],
                      minPrice: "",
                      maxPrice: "",
                      minRating: 0,
                      prime: false,
                      inStock: false,
                    })
                  }
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={
                  view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </motion.div>
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 overflow-y-auto p-4 lg:hidden"
            >
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
