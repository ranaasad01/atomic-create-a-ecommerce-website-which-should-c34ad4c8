"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Star, ShoppingCart, Heart, X, Check, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  brand: string;
  category: string;
  prime: boolean;
  inStock: boolean;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "newest";
type ViewMode = "grid" | "list";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 18432,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    badge: "Best Seller",
    brand: "Sony",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 2,
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    originalPrice: 249.0,
    rating: 4.9,
    reviewCount: 34521,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    badge: "Deal of the Day",
    brand: "Apple",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 3,
    title: "Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones",
    price: 229.0,
    originalPrice: 329.0,
    rating: 4.6,
    reviewCount: 9871,
    image: "https://m.media-amazon.com/images/I/51JTqRmRJAL._AC_UF894,1000_QL80_.jpg",
    badge: "30% Off",
    brand: "Bose",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 4,
    title: "Jabra Evolve2 85 Wireless PC Headset",
    price: 349.0,
    originalPrice: 449.0,
    rating: 4.5,
    reviewCount: 4320,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    brand: "Jabra",
    category: "Electronics",
    prime: false,
    inStock: true,
  },
  {
    id: 5,
    title: "Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Headphones",
    price: 55.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 28934,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    badge: "Budget Pick",
    brand: "Anker",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 6,
    title: "Sennheiser Momentum 4 Wireless Headphones",
    price: 279.95,
    originalPrice: 349.95,
    rating: 4.7,
    reviewCount: 6543,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    brand: "Sennheiser",
    category: "Electronics",
    prime: true,
    inStock: false,
  },
  {
    id: 7,
    title: "JBL Tune 760NC Wireless Over-Ear Headphones",
    price: 79.95,
    originalPrice: 129.95,
    rating: 4.3,
    reviewCount: 12087,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    brand: "JBL",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 8,
    title: "Beats Studio Pro Wireless Headphones",
    price: 199.95,
    originalPrice: 349.95,
    rating: 4.5,
    reviewCount: 8765,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    badge: "New",
    brand: "Beats",
    category: "Electronics",
    prime: false,
    inStock: true,
  },
  {
    id: 9,
    title: "Audio-Technica ATH-M50xBT2 Wireless Over-Ear Headphones",
    price: 149.0,
    originalPrice: 199.0,
    rating: 4.6,
    reviewCount: 5432,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    brand: "Audio-Technica",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 10,
    title: "Skullcandy Crusher ANC 2 Over-Ear Wireless Headphones",
    price: 119.99,
    originalPrice: 199.99,
    rating: 4.2,
    reviewCount: 3210,
    image: "https://m.media-amazon.com/images/I/61sRKTAfrhL._AC_UF350,350_QL80_.jpg",
    brand: "Skullcandy",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
  {
    id: 11,
    title: "Plantronics Voyager Focus 2 UC Bluetooth Headset",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.4,
    reviewCount: 2876,
    image: "https://m.media-amazon.com/images/I/511c23mDjoL._AC_UF894,1000_QL80_.jpg",
    brand: "Plantronics",
    category: "Electronics",
    prime: false,
    inStock: true,
  },
  {
    id: 12,
    title: "Microsoft Surface Headphones 2+ with Microsoft Teams Button",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.3,
    reviewCount: 1987,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    brand: "Microsoft",
    category: "Electronics",
    prime: true,
    inStock: true,
  },
];

const BRANDS = ["Sony", "Apple", "Bose", "Jabra", "Anker", "Sennheiser", "JBL", "Beats", "Audio-Technica", "Skullcandy", "Plantronics", "Microsoft"];

const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "$300 & Above", min: 300, max: Infinity },
];

const RATING_OPTIONS = [4, 3, 2, 1];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Avg. Customer Review", value: "rating-desc" },
  { label: "Newest Arrivals", value: "newest" },
];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating, count, size = "sm" }: { rating: number; count?: number; size?: "sm" | "md" }) {
  const starSize = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={starSize} viewBox="0 0 20 20" fill="none">
            {i < full ? (
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                fill="#10B981"
              />
            ) : i === full && half ? (
              <>
                <defs>
                  <linearGradient id={`half-sr-${i}`}>
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
                  fill={`url(#half-sr-${i})`}
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
      {count !== undefined && (
        <span className="text-xs text-[#10B981] hover:underline cursor-pointer">
          {count.toLocaleString("en-US")}
        </span>
      )}
    </div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

interface FilterState {
  brands: string[];
  priceRange: { min: number; max: number } | null;
  minRating: number | null;
  primeOnly: boolean;
  inStockOnly: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-2 group"
      >
        <span className="font-semibold text-[#0F2027] text-sm group-hover:text-[#10B981] transition-colors">
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClear: () => void;
}) {
  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.priceRange !== null ||
    filters.minRating !== null ||
    filters.primeOnly ||
    filters.inStockOnly;

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[#0F2027] text-base">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-[#10B981] hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Prime */}
      <FilterSection title="Prime & Delivery">
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={filters.primeOnly}
            onChange={(e) => onChange({ ...filters, primeOnly: e.target.checked })}
            className="accent-[#10B981] w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            <span className="text-[#10B981] font-bold">prime</span> Eligible
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="accent-[#10B981] w-4 h-4"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => {
            const active =
              filters.priceRange?.min === range.min &&
              filters.priceRange?.max === range.max;
            return (
              <button
                key={range.label}
                onClick={() =>
                  onChange({
                    ...filters,
                    priceRange: active ? null : { min: range.min, max: range.max },
                  })
                }
                className={`flex items-center gap-2 w-full text-left py-1 px-2 rounded text-sm transition-colors ${
                  active
                    ? "bg-[#10B981]/10 text-[#10B981] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                {range.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Avg. Customer Review">
        <div className="space-y-1">
          {RATING_OPTIONS.map((r) => {
            const active = filters.minRating === r;
            return (
              <button
                key={r}
                onClick={() =>
                  onChange({ ...filters, minRating: active ? null : r })
                }
                className={`flex items-center gap-2 w-full text-left py-1 px-2 rounded text-sm transition-colors ${
                  active
                    ? "bg-[#10B981]/10 text-[#10B981] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                <StarRating rating={r} />
                <span className="text-xs text-gray-500">& Up</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const active = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-gray-100 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleBrand(brand)}
                  className="accent-[#10B981] w-4 h-4"
                />
                <span className={`text-sm ${active ? "text-[#10B981] font-medium" : "text-gray-700"}`}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </aside>
  );
}

// ─── Product Card (Grid) ──────────────────────────────────────────────────────

function ProductCardGrid({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col group overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Link href={`/product-detail?id=${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=Product";
            }}
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.badge}
            </span>
          )}
          {discount >= 10 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <Link
          href={`/product-detail?id=${product.id}`}
          className="text-sm font-medium text-[#0F2027] hover:text-[#10B981] line-clamp-2 leading-snug transition-colors"
        >
          {product.title}
        </Link>

        <span className="text-xs text-gray-500">{product.brand}</span>

        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-lg font-bold text-[#0F2027]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.prime && (
          <span className="text-xs font-bold text-[#10B981]">
            ✓ prime FREE delivery
          </span>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`mt-2 w-full py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            !product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : addedToCart
              ? "bg-[#059669] text-white"
              : "bg-[#10B981] hover:bg-[#059669] text-white"
          }`}
        >
          {addedToCart ? (
            <><Check className="w-4 h-4" /> Added!</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Product Card (List) ──────────────────────────────────────────────────────

function ProductCardList({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 flex gap-4 p-4 group"
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-36 h-36 bg-gray-50 rounded-lg overflow-hidden">
        <Link href={`/product-detail?id=${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=Product";
            }}
          />
        </Link>
        {product.badge && (
          <span className="absolute top-1 left-1 bg-[#10B981] text-white text-xs font-bold px-1.5 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <Link
          href={`/product-detail?id=${product.id}`}
          className="text-base font-semibold text-[#0F2027] hover:text-[#10B981] line-clamp-2 leading-snug transition-colors mb-1"
        >
          {product.title}
        </Link>

        <span className="text-xs text-gray-500 mb-1">{product.brand}</span>

        <StarRating rating={product.rating} count={product.reviewCount} size="md" />

        {product.prime && (
          <span className="text-xs font-bold text-[#10B981] mt-1">
            ✓ prime FREE delivery
          </span>
        )}

        {!product.inStock && (
          <span className="text-xs text-red-500 font-medium mt-1">Out of Stock</span>
        )}
      </div>

      {/* Price + Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[140px]">
        <div className="text-right">
          <div className="text-xl font-bold text-[#0F2027]">${product.price.toFixed(2)}</div>
          {product.originalPrice && (
            <div className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </div>
          )}
          {discount >= 10 && (
            <div className="text-xs text-red-500 font-semibold">Save {discount}%</div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            !product.inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : addedToCart
              ? "bg-[#059669] text-white"
              : "bg-[#10B981] hover:bg-[#059669] text-white"
          }`}
        >
          {addedToCart ? (
            <><Check className="w-4 h-4" /> Added!</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>

        <button
          onClick={() => setWishlisted((w) => !w)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              wishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
          {wishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: FilterState = {
  brands: [],
  priceRange: null,
  minRating: null,
  primeOnly: false,
  inStockOnly: false,
};

export default function ProductListingSearchResultsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const SEARCH_QUERY = "wireless headphones";

  const filteredAndSorted = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange!.min &&
          p.price <= filters.priceRange!.max
      );
    }
    if (filters.minRating !== null) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }
    if (filters.primeOnly) {
      result = result.filter((p) => p.prime);
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
  }, [filters, sortBy]);

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount =
    filters.brands.length +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.primeOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Search header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            Showing results for{" "}
            <span className="font-semibold text-[#0F2027]">&ldquo;{SEARCH_QUERY}&rdquo;</span>
            <span className="ml-2 text-gray-400">({filteredAndSorted.length} results)</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters — desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4 bg-white rounded-lg border border-gray-200 px-4 py-2.5">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#0F2027] hover:text-[#10B981] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#10B981] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setSortDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-medium text-[#0F2027] hover:text-[#10B981] transition-colors border border-gray-200 rounded px-3 py-1.5"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px] py-1"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortDropdownOpen(false);
                          }}
                          className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === opt.value
                              ? "bg-[#10B981]/10 text-[#10B981] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {sortBy === opt.value && <Check className="w-3.5 h-3.5" />}
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View mode */}
              <div className="flex items-center gap-1 border border-gray-200 rounded p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#10B981] text-white"
                      : "text-gray-400 hover:text-[#0F2027]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-[#10B981] text-white"
                      : "text-gray-400 hover:text-[#0F2027]"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        brands: f.brands.filter((b) => b !== brand),
                      }))
                    }
                    className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-full hover:bg-[#10B981]/20 transition-colors"
                  >
                    {brand} <X className="w-3 h-3" />
                  </button>
                ))}
                {filters.priceRange && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, priceRange: null }))}
                    className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-full hover:bg-[#10B981]/20 transition-colors"
                  >
                    {PRICE_RANGES.find(
                      (r) =>
                        r.min === filters.priceRange?.min &&
                        r.max === filters.priceRange?.max
                    )?.label ?? "Price"}{" "}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {filters.minRating && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, minRating: null }))}
                    className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-full hover:bg-[#10B981]/20 transition-colors"
                  >
                    {filters.minRating}★ & Up <X className="w-3 h-3" />
                  </button>
                )}
                {filters.primeOnly && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, primeOnly: false }))}
                    className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-full hover:bg-[#10B981]/20 transition-colors"
                  >
                    Prime <X className="w-3 h-3" />
                  </button>
                )}
                {filters.inStockOnly && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, inStockOnly: false }))}
                    className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-medium px-2.5 py-1 rounded-full hover:bg-[#10B981]/20 transition-colors"
                  >
                    In Stock <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-red-500 underline transition-colors px-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results */}
            {filteredAndSorted.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0F2027] mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters or search for something else.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredAndSorted.map((product) => (
                  <ProductCardGrid key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                {filteredAndSorted.map((product) => (
                  <ProductCardList key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 overflow-y-auto p-4 lg:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#0F2027] text-lg">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
              />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-full font-semibold text-sm transition-colors mt-4"
              >
                Show {filteredAndSorted.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
